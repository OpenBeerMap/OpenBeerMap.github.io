/*
 OpenBeerMap OverPass-API layer | noemie.lehuby(at)gmail.com | MIT Licensed
 contributors : nlehuby, Maxime Corteel, Poilou (labiloute), l-vincent-l
*/

var overlayAll = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];way(BBOX)[amenity=bar];node(BBOX)[amenity=cafe]['cuisine'!='coffee_shop'];way(BBOX)[amenity=cafe]['cuisine'!='coffee_shop'];node(BBOX)[amenity=biergarten];node(BBOX)[microbrewery=yes];node(BBOX)['brewery'];way(BBOX)['brewery'];node(BBOX)[amenity=pub];way(BBOX)[amenity=pub]);out center;>;out;", "assets/img/beer/beer1.png");
var beerList = new Array();

function debug_draw_beer(url, icon)
{
    return new L.OverPassLayer({
        minzoom: 17,
        query: url,
        callback: function(data){
            for(var i = 0 ; i < data.elements.length ; i++)
            {
                e = data.elements[i];
                if(e.id in this.instance._ids)
                    return;
                this.instance._ids[e.id] = true;
                if(e.tags !== undefined)
                {
                    if(e.type === "node")
                    {//If element is a node
                        if (e.tags['amenity'])
                        {
                            var pos = new L.LatLng(e.lat, e.lon);
                        }
                    }
                    else
                    {//If element is a way or a relation, get its center
                        var pos = new L.LatLng(e.center.lat, e.center.lon);
                    }
                    var popup = this.instance._poiInfo(e.tags, e.id);
                    var icon_o = icon;
                    if (e.tags["brewery"]) {icon_o = "assets/img/beer/beer_empty.png"}
                    var myicon = L.icon({
                        iconUrl: icon_o,
                    });
                    var marker = L.marker(pos, {icon: myicon}).bindPopup(popup);
                    this.instance.addLayer(marker);
                }
            }
        }
    })
}

function draw_beer(query, icon)
{
    return new L.OverPassLayer({
        minzoom: 14,
        query: query,
        callback: function(data){
            for(var i = 0 ; i < data.elements.length ; i++)
            {
                e = data.elements[i];
                if (e.id in this.instance._ids) return;
                this.instance._ids[e.id] = true;
                if(e.tags !== undefined)
                {
                    if(e.type === "node")
                    {
                        if (e.tags['amenity'])
                        {
                            var pos = new L.LatLng(e.lat, e.lon);
                        }
                    }
                    else
                    {
                        var pos = new L.LatLng(e.center.lat, e.center.lon);
                    }
                    var content = "";
                    if(e.tags["name"])
                    {
                        content += '<h3 title="' + e.tags["name"] + '">' + e.tags["name"] + '</h3>';
                    }
                    else
                    {
                        content += "<h3><em data-l10n-id='map_popup_name_unknown'>Unknown name</em></h3>";
                    }
                    content += "<table class='table table-condensed'>";
                    if(e.tags["opening_hours"])
                    {
                        content += "<tr><th data-l10n-id='map_popup_opening_hours'>Horaires d'ouvertures</th><td><div class='map-popup-indicator map-popup-indicator-"+ parse_osm_times(e.tags["opening_hours"]) +"'></div>" + e.tags["opening_hours"] +"</td></tr>";
                    }
                    if(e.tags["happy_hours"])
                    {
                        content += "<tr><th data-l10n-id='map_popup_happy_hours'>Happy Hours</th><td><div class='map-popup-indicator map-popup-indicator-"+ parse_osm_times(e.tags["happy_hours"]) +"'></div>" + e.tags["happy_hours"] +"</td></tr>";
                    }
                    if(e.tags["brewery"])
                    {
                        content += "<tr><th data-l10n-id='map_popup_beer'>Type de bière pression</th><td class='mapPopupBeersList'>" + e.tags["brewery"].replace(/;/g, ", ") + "</td></tr>";
                    }
                    content +="</table>";
                    if(e.type == "node" || e.type == "way")
                    {
                        content += '<p class="action"><a href="#" class="btn btn-default" onClick="sidebar.show();init_form_from_OSM(\'' + e.type + '\', ' + e.id.toString() + ')"><i class="fa fa-edit"></i> <span data-l10n-id="map_popup_edit">Edit bar information</span></a></p>';
                    }

                    var myicon = L.icon({
                        iconUrl: icon,
                        iconAnchor:[10, 45],
                        popupAnchor : [4, -30]
                    });

                    var marker = L.marker(pos, {icon: myicon}).bindPopup(content);
                    this.instance.addLayer(marker);

                    marker.on('click', function(e){
                        document.l10n.localize(['map_popup_name_unknown', 'map_popup_opening_hours', 'map_popup_happy_hours', 'map_popup_beer', 'map_popup_edit'], function(l10n){
                            localize(l10n, ['map_popup_name_unknown', 'map_popup_opening_hours', 'map_popup_happy_hours', 'map_popup_beer', 'map_popup_edit']);
                        });
                    });
                }
            }
        }
    });
}
 
/* Opening Hours parsing */
function parse_osm_times(hours)
{
    try
    {
        var oh = new opening_hours(hours);
        var state = oh.getStateString();
        // console.log(state)
        return state;
    }
    catch(err)
    {
        console.log("ERROR: cannot parse hours: " + hours);
        return "unknown";
    }
}

/* Custom beers img */
function get_beer_img(beerName)
{
    switch(beerName.toLowerCase())
    {
        case "chouffe":
            return  "chouffe.png";
        case "affligem":
            return "affligem.png";
        case "guinness":
            return "guinness.png";
        case "tripel karmeliet":
            return "karmeliet.png";
        case "kwak":
            return "kwak.png";
        default:
            return "beer1.png";
    }
}