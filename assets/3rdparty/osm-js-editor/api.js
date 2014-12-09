/*
 OpenBeerMap OSMAPI.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

function basic_auth()
{
    return "Basic " + btoa("OpenBeerMapContributor:FtHwuH8w1RDjQpOr0y0gF3AWm8sRsRzncK3hHh9");
}

function get_node_or_way(id, OSM_type)
{
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openstreetmap.org/api/0.6/" + OSM_type + "/" + id, false);
    xhr.setRequestHeader("Authorization", basic_auth());
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

function edit_tag(xml, OSM_type, key, value)
{
    var tags = xml.documentElement.getElementsByTagName("tag");
    //If tag exists, modify its value
    for(var i = 0 ; i < tags.length ; i++)
    {
        if(tags[i].getAttribute("k") === key)
        {
            //console.log(tags[i].getAttribute("v"))
            tags[i].setAttribute("v", value);
            return;
        }
    }
    //Else, create it 
    var newTag = xml.createElement("tag");
    newTag.setAttribute("k",key);
    newTag.setAttribute("v", value);
    
    if(OSM_type === 'node')
    {
        var parentNode = xml.getElementsByTagName("node")[0];
    }
    if(OSM_type === 'way')
    {
        var parentNode = xml.getElementsByTagName("way")[0];
    }
    parentNode.appendChild(newTag); 
    
    /*
    for (var i in tags)
    {
        console.log(tags[i].getAttribute("k") + ": " + tags[i].getAttribute("v"));
    }
    */
    return;

}

function get_tag(xml, key)
{
    var tags = xml.documentElement.getElementsByTagName("tag");
    
    for(var i = 0 ; i < tags.length ; i++)
    {
        if(tags[i].getAttribute("k") === key)
        {
            //console.log(tags[i].getAttribute("v"));
            return tags[i].getAttribute("v");
        }
    }
    return "undefined";
}

function del_tag(xml, key)
{
    var tags = xml.documentElement.getElementsByTagName("tag");
    for(var i = 0 ; i < tags.length ; i++)
    {
        if(tags[i].getAttribute("k") === key)
        {
            tags[i].parentNode.removeChild(tags[i]); 
            return true;  
        }
    }
    console.log("tag '" + key + "' does not exist");
    return false;
}

function xml_to_string(xml_node)
{
    if(xml_node.xml)
    {
        return xml_node.xml;
    }
    else if(XMLSerializer)
    {
        var xml_serializer = new XMLSerializer();
        return xml_serializer.serializeToString(xml_node);
    }
    else
    {
        console.log("ERROR: cannot serialize XML");
        return false;
    }
}

function put_node_or_way(xml, changeset_id, id, OSM_type)
{
    if(OSM_type != "way" && OSM_type != "node")
    {
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
    }
    */
    
    var serialized = xml_to_string(xml);
    if(serialized !== false)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/" + OSM_type + "/" + id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(serialized);
        console.log("PUT " + OSM_type + "/ with status " + xhr.status);
        return true;
    }
    return false;
}

function close_changeset(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/" + id + "/close", false);
    xhr.setRequestHeader("Authorization", basic_auth());
    xhr.send();
    console.log("PUT changeset/close with status " + xhr.status);
    return xhr.responseText;
}

function put_changeset(){ 
    var xml = "<osm><changeset><tag k='created_by' v='OpenBeerMap javascript editor'/><tag k='comment' v='OpenBeerMap - Modification de bar'/></changeset></osm>";

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/create", false);
    xhr.setRequestHeader("Authorization", basic_auth());
    xhr.send(xml);

    console.log("PUT changeset with status " + xhr.status);
    return xhr.responseText ;
}