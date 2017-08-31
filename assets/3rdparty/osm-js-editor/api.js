/*
 OpenBeerMap OSMAPI.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

var auth = osmAuth({
    oauth_secret: 'lpPYPdMQ9hYQ1SQSScZQaTK3b69UbJIwwewnKDbJ',
    oauth_consumer_key: 'WWlDytmah8FbawPuxl49XbuByAmMW6WR9bAOrGtE',
    landing: 'land.html',
    url: 'https://www.openstreetmap.org'
});

function basic_auth() {
    return "Basic " + btoa("OpenBeerMapContributor:OpenBeerMapContributor");
}

function get_node_or_way(id, OSM_type) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openstreetmap.org/api/0.6/" + OSM_type + "/" + id, false);
    xhr.send();

    console.log("GET " + OSM_type + "/ with status " + xhr.status);
    var xmlDocument = xhr.responseXML;

    /*
    var tags = xmlDocument.documentElement.getElementsByTagName("tag");
    for(var i in tags)
    {
        console.log(tags[i].getAttribute("k") + ": " + tags[i].getAttribute("v"));
    }
    */
    return xmlDocument;
}

function edit_tag(xml, OSM_type, key, value) {
    var tags = xml.documentElement.getElementsByTagName("tag");
    //If tag exists, modify its value
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute("k") === key) {
            //console.log(tags[i].getAttribute("v"))
            tags[i].setAttribute("v", value);
            return;
        }
    }
    //Else, create it
    var newTag = xml.createElement("tag");
    newTag.setAttribute("k", key);
    newTag.setAttribute("v", value);

    if (OSM_type === 'node') {
        var parentNode = xml.getElementsByTagName("node")[0];
    }
    if (OSM_type === 'way') {
        var parentNode = xml.getElementsByTagName("way")[0];
    }
    if (OSM_type === 'relation') {
        var parentNode = xml.getElementsByTagName("relation")[0];
    }
    parentNode.appendChild(newTag);

    /*
    for (var i in tags)
    {
        console.log(tags[i].getAttribute("k") + ": " + tags[i].getAttribute("v"));
    }*/

    return;

}

function get_tag(xml, key) {
    var tags = xml.documentElement.getElementsByTagName("tag");

    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute("k") === key) {
            //console.log(tags[i].getAttribute("v"));
            return tags[i].getAttribute("v");
        }
    }
    return "undefined"; //seriously ?
}

function del_tag(xml, key) {
    var tags = xml.documentElement.getElementsByTagName("tag");
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute("k") === key) {
            tags[i].parentNode.removeChild(tags[i]);
            return true;
        }
    }
    console.log("tag '" + key + "' does not exist");
    return false;
}

function xml_to_string(xml_node) {
    if (xml_node.xml) {
        return xml_node.xml;
    } else if (XMLSerializer) {
        var xml_serializer = new XMLSerializer();
        return xml_serializer.serializeToString(xml_node);
    } else {
        console.log("ERROR: cannot serialize XML");
        return false;
    }
}

function prepare_put_changeset(changeset_comment) {
    changeset_comment = changeset_comment || "OpenBeerMap - mise à jour de bar";
    return "<osm><changeset><tag k='created_by' v='OpenBeerMap javascript editor'/><tag k='comment' v='" + changeset_comment + "'/></changeset></osm>"
}

function prepare_put_node_or_way(xml, changeset_id, id, OSM_type) {
    if (OSM_type != "way" && OSM_type != "node" && OSM_type != "relation") {
        console.log("ERROR: wrong OSM type: " + OSM_type);
        return false;
    }

    var tags = xml.documentElement.getElementsByTagName(OSM_type);
    console.log("current changeset: " + tags[0].getAttribute('changeset') + ", changing to " + changeset_id)
    tags[0].setAttribute('changeset', changeset_id);

    /*
    var tags = xml.documentElement.getElementsByTagName("tag");
    for (var i in tags)
    {
        console.log(tags[i].getAttribute("k") + " : " + tags[i].getAttribute("v"));
    }*/


    var serialized = xml_to_string(xml);
    if (serialized !== false) {
        return serialized;
    }
}

/* generic */
function send_data_to_osm(xml, OSM_id, OSM_type, comment) {
    if (auth.authenticated()) {
        send_data_to_osm_oauth(xml, OSM_id, OSM_type, comment)
    } else {
        send_data_to_osm_basic_auth(xml, OSM_id, OSM_type)
    }
}

/* With basic_auth */
function send_data_to_osm_basic_auth(xml, OSM_id, OSM_type) {
    //ouvrir un changeset
    changeset_id = put_changeset()
    if (changeset_id != "Couldn't authenticate you") {
        //envoyer le nouveau node
        put_node_or_way(xml, changeset_id, OSM_id, OSM_type)

        //fermer le changeset
        close_changeset(changeset_id);
    } else {
        console.log("auth fail")
    }
}

function put_node_or_way(xml, changeset_id, id, OSM_type) {
    serialized = prepare_put_node_or_way(xml, changeset_id, id, OSM_type) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/" + OSM_type + "/" + id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(serialized);
        console.log("PUT " + OSM_type + "/ with status " + xhr.status);
        return true;
    }
    return false;
}

function close_changeset(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/" + id + "/close", false);
    xhr.setRequestHeader("Authorization", basic_auth());
    xhr.send();
    console.log("PUT changeset/close with status " + xhr.status);
    return xhr.responseText;
}

function put_changeset() {
    var xml = prepare_put_changeset();

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/create", false);
    xhr.setRequestHeader("Authorization", basic_auth());
    xhr.send(xml);

    console.log("PUT changeset with status " + xhr.status);
    return xhr.responseText;
}

/* With oauth */
function send_data_to_osm_oauth(xml, OSM_id, OSM_type, comment) {
    //open a changeset with oauth
    var xml_changeset = prepare_put_changeset(comment);
    auth.xhr({
            method: 'PUT',
            path: '/api/0.6/changeset/create',
            options: {
                header: {
                    'Content-Type': 'text/xml'
                }
            },
            content: xml_changeset
        },
        function(err, res) {
            if (err) {
                console.log('ERROR on put changeset: ' + err.response);
                return
            }

            //prepare put node/way
            changeset_id = res;
            data_to_send = prepare_put_node_or_way(xml, changeset_id, OSM_id, OSM_type)

            //put new node/ way
            auth.xhr({
                    method: 'PUT',
                    path: '/api/0.6/' + OSM_type + '/' + OSM_id,
                    options: {
                        header: {
                            'Content-Type': 'text/xml'
                        }
                    },
                    content: data_to_send
                },
                function(err, res) {
                    if (err) {
                        console.log('ERROR on put node/way : ' + err.response);
                        return
                    }

                    //close changeset
                    auth.xhr({
                            method: 'PUT',
                            path: '/api/0.6/changeset/' + changeset_id + '/close',
                        },
                        function(err, res) {
                            if (err) {
                                console.log('ERROR on put changeset/close : ' + err.response);
                                return
                            } else {
                                console.log("You've successfully modified an OSM object !")
                            }
                        } //end of callback - close changeset
                    );
                } //end of callback - put node/way
            );
        } //end of callback - open changeset
    );
}
