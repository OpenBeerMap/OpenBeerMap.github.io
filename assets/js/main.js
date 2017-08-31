/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com | MIT Licensed
 contributors : nlehuby, Maxime Corteel, Poilou (labiloute), Pierre Rudloff, l-vincent-l,
*/

/* Basemap Layers */
var tilelayer_properties = {
    opacity: 0.7,
    attribution: '<span data-l10n-id="attribution_osm">Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors</span>'
}

var osm_stamen = new L.TileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', tilelayer_properties);
var osm_cartodb = new L.TileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', tilelayer_properties);
var tile_layer_list = [osm_cartodb, osm_stamen]

<<<<<<< HEAD
var map = new L.Map('map').addLayer(osm_cartodb).setView(new L.LatLng(48.84702,2.37705), 17);
=======
var map = new L.Map('map').addLayer(osm_stamen).setView(new L.LatLng(48.84702, 2.37705), 17);
>>>>>>> 006cbfe (handle l10n)

function change_layer(layer_to_add) {
    for (var i = 0; i < tile_layer_list.length; i++) {
        map.removeLayer(tile_layer_list[i])
    }
    map.addLayer(layer_to_add);
    console.log("change layer")
};

/*User Location*/
map.locate({
        setView: false,
        enableHighAccuracy: true,
        locate: true,
        maximumAge: 60000,
        timeout: 8000
    })
    .on('locationfound', function(e) {
        console.log("User positioning successful");
    })
    .on('locationerror', function(e) {
        //console.log(e);
        console.log("ERROR: cannot get user position");
    });

/* Search control */
map.addControl(new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat', 'lon'],
    markerLocation: true,
    autoType: false,
    autoCollapse: true,
    minLength: 2,
    zoom: 16
}));

/* Locate control */
map.addControl(L.control.locate({
    locateOptions: {
        setView: true,
        enableHighAccuracy: true,
        locate: true,
        maximumAge: 60000,
        timeout: 8000
    }
}));

/* Leaflet sidebar */
var sidebar = L.control.sidebar("sidebar", {
    closeButton: false,
    position: "left"
}).addTo(map);

$("#sidebar .close, #sidebar .discard").click(function() {
    sidebar.hide();
});

/* Function to refresh controler */
init_local_storage();

var layersList;

/* Function to refresh topright controler */
function refresh_layers_list() {
    overlayAll = draw_beer(overpassBaseUrl + make_overlayAll(restaurant_switch), "assets/img/beers/gray.png", false)
    if (layersList != undefined) {
        layersList.removeFrom(map);
    }

    var overlayMaps = {
        "<span class='image'><img src='assets/img/beers/blue.png'></span><span data-l10n-id='layers_overlays_all'>All bars</span>": overlayAll
    };

    var favoriteBeers = get_favorites();
    for (var i = 0; i < favoriteBeers.length; i++) {
        overlayMaps["<span class='image'><img src='assets/img/beers/" + get_beer_img(favoriteBeers[i]) + "'></span><span>" + favoriteBeers[i] + "</span>"] = beerList[favoriteBeers[i]];
    }

    layersList = L.control.layers({
        "OpenStreetMap": osm_stamen
    }, overlayMaps, {
        collapsed: document.body.clientWidth < 768
    });

    layersList.addTo(map);

    var button = $("<button>")
        .addClass("btn btn-default btn-block")
        .attr({
            "data-toggle": "collapse",
            "data-target": ".navbar-collapse.in",
            "type": "button"
        })
        .html('<i class="fa fa-cogs"></i> <span data-l10n-id="layers_setup"></span>')
        .click(function() {
            $('#modalSetup').modal('show');
        });

    $(layersList['_separator']).html(button)
        .insertAfter($(layersList['_separator']).next());

    document.l10n.localize(['layers_overlays_all', 'layers_setup'], function(l10n) {
        localize(l10n, ['layers_overlays_all', 'layers_setup']);
    });
}

/* Refresh controler on page load */
refresh_layers_list();
map.addLayer(overlayAll);

/* Indicate when zoom level is to low to display bars */
map.zoomIndicator._container.innerHTML = "<span data-l10n-id='overpass_err'>Zoom zoom zoom ! </span>";

/* Hash map (coordinates in the URL to make them reusable) */
var hash = new L.Hash(map);

$(document).ready(function() {
    //FIXME: nasty hack because bootstraps radio buttons don't work
    $("[name=editWifi]").on("change", function() {
        $("[name=editWifi]").parent().removeClass("active");
        if ($(this).prop("checked")) {
            $(this).parent().addClass("active");
        } else {
            $(this).parent().removeClass("active");
        }
    });

    $(".modal-about-toggle").click(function(e) {
        e.preventDefault();
        $("#modalAbout").modal("show");
    });

    $("#editButtonMore").click(function() {
        $("#editMoreOptions").toggle();
    });
    $("#modalAboutOSMToggle").click(function() {
        $("#modalAboutOSM").toggle();
    });
    update_auth_visual_return();
});

/* OSM Authentication */
function show_OSM_username() {
    auth.xhr({
        method: 'GET',
        path: '/api/0.6/user/details'
    }, OSM_user_name_done);
}

function OSM_user_name_done(err, res) {
    if (err) {
        console.log(err);
        console.log("Error on OSM oauth")
        return;
    }
    var u = res.getElementsByTagName('user')[0];
    document.getElementById('OSM_user').innerHTML = u.getAttribute('display_name');

}

function update_auth_visual_return() {
    if (auth.authenticated()) {
        document.getElementById('alert_no_auth').style.display = 'none';
        document.getElementById('alert_auth').style.display = 'block';
        document.getElementById('editButtonSave').className += "btn btn-primary";
        show_OSM_username();
    } else {
        document.getElementById('alert_auth').style.display = 'none';
        document.getElementById('alert_no_auth').style.display = 'block';
        document.getElementById('editButtonSave').className += " disabled";
    }
}

document.getElementById('OSM_authenticate').onclick = function() {
    auth.authenticate(function() {
        console.log("OSM oauth in progress")
        update_auth_visual_return()
    });
};
document.getElementById('OSM_logout').onclick = function() {
    auth.logout();
    console.log("OSM logout");
    update_auth_visual_return()
};
