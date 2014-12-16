/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com | MIT Licensed
 contributors : nlehuby, Maxime Corteel, Poilou (labiloute), Pierre Rudloff, l-vincent-l,
*/

/* Basemap Layers */
var osm = new L.TileLayer(
    'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
    {
        opacity: 0.7,
        attribution: '<span data-l10n-id="attribution_overpass">POI via <a href="http://www.overpass-api.de/">Overpass API</a></span> | <span data-l10n-id="attribution_osm">Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors</span>'
    }
);

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(48.84702,2.37705), 17);

/*User Location*/
map.locate({setView: true, enableHighAccuracy: true, locate: true, maximumAge: 60000,timeout: 8000 })
.on('locationfound', function(e){
    console.log("User positioning successful");
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup('<h3 data-l10n-id="map_popup_location">You are here</h3>');
    map.addLayer(marker);
    marker.on('click', function (e){
        document.l10n.localize(['map_popup_location'], function(l10n){
            localize(l10n, ['map_popup_location']);
        });
    })
})
.on('locationerror', function(e){
    //console.log(e);
    console.log("ERROR: cannot get user position");
});

map.addControl(L.control.locate({
    locateOptions: {
        setView: true, enableHighAccuracy: true, locate: true, maximumAge: 60000,timeout: 8000
    }
}));

/* Leaflet sidebar */
var sidebar = L.control.sidebar("sidebar", {
    closeButton: false,
    position: "left"
}).addTo(map);

$("#sidebar .close, #sidebar .discard").click(function(){
   sidebar.hide();
});

/* Function to refresh controler */
init_local_storage();

var layersList;

/* Function to refresh topright controler */
function refresh_layers_list()
{
    if(layersList != undefined)
    {
        layersList.removeFrom(map);
    }
        
    var overlayMaps = {
        "<span class='image'><img src='assets/img/beer1.png'></span><span data-l10n-id='layers_overlays_all'>All beers</span>": overlayAll
    };
    
    var favoriteBeers = get_favorites();
    for(var i = 0 ; i < favoriteBeers.length ; i++)
    {
        img = get_beer_img(favoriteBeers[i])
		overlayMaps["<span class='image'><img src='assets/img/beers/"+img+"'></span><span>" + favoriteBeers[i] + "</span>"] = beerList[favoriteBeers[i]];
        
    }

    layersList = L.control.layers({"OpenStreetMap": osm}, overlayMaps, {collapsed: document.body.clientWidth < 768});

    layersList.addTo(map);

    var button = $("<button>")
    .addClass("btn btn-default btn-block")
    .attr({"data-toggle": "collapse", "data-target": ".navbar-collapse.in", "type": "button"})
    .html('<i class="fa fa-cogs"></i> <span data-l10n-id="layers_setup"></span>')
    .click(function(){
        $('#modalSetup').modal('show');
    });
    
    $(layersList['_separator']).html(button)
                         .insertAfter($(layersList['_separator']).next());

    document.l10n.localize(['layers_overlays_all','layers_setup'], function(l10n){
        localize(l10n, ['layers_overlays_all','layers_setup']);
    });
}

/* Refresh controler on page load */
refresh_layers_list();
map.addLayer(overlayAll);

/* Indicate when zoom level is to low to display bars */
map.zoomIndicator._container.innerHTML = "<span data-l10n-id='overpass_err'>Zoom zoom zoom ! </span>";
   
/* Search layer */
map.addControl(new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    markerLocation: true,
    autoType: false,
    autoCollapse: true,
    minLength: 2,
    zoom:16
}));

/* Hash map (coordinates in the URL to make them reusable) */
var hash = new L.Hash(map);

/* Delete progress bar when all JS has been parsed */
$(document).one("ajaxStop", function(){
    $("#loading").hide();
});

$(document).ready(function(){
    //FIXME: nasty hack because bootstraps radio buttons don't work
    $("[name=editWifi]").on("change", function(){
        $("[name=editWifi]").parent().removeClass("active");
        if($(this).prop("checked"))
        {
            $(this).parent().addClass("active");
        }
        else
        {
            $(this).parent().removeClass("active");
        }
    });
    
    $(".modal-about-toggle").click(function(e){
        e.preventDefault();
        $("#modalAbout").modal("show");
    });

    $("#editButtonMore").click(function(){
       $("#editMoreOptions").toggle();
    });
    $("#ContributeMore").click(function(){
       $("#howToContributeMore").toggle();
    });	
});