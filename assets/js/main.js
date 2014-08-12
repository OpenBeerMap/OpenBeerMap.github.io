/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

/* Basemap Layers */
var attr_osm = '<span data-l10n-id="attr_osm">Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors </span>',
      attr_overpass = '<span data-l10n-id="attr_overpass">POI via <a href="http://www.overpass-api.de/">Overpass API</a></span>';
var osm = new L.TileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_overpass,attr_osm].join('| ')});

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(48.84702,2.37705), 17);

/*User Location*/
map.locate({setView: true})
        .on('locationfound', function(e){
        console.log("localisation utilisateur réussie");
            var marker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup('<span data-l10n-id="locate_ok">Vous êtes par ici&nbsp;&nbsp;</span>');
            map.addLayer(marker);
				function onPopupClick(e) {
				document.l10n.localize(['locate_ok',], function(l10n) {
				  var node = document.querySelector('[data-l10n-id=locate_ok]');
				  if (node != null ) {node.textContent = l10n.entities.locate_ok.value;}                 
				  })
				}
				marker.on('click', onPopupClick);
        })
       .on('locationerror', function(e){
            //console.log(e);
            console.log("Échec de localisation de l'utilisateur");
});

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

/* Leaflet sidebar */
var sidebar = L.control.sidebar("sidebar", {
  closeButton: true,
  position: "left"
}).addTo(map);
//les fonctions liées à l'éditeur OSM sont dans OSM_js_editor.js

    var baseMaps = {
        "OpenStreetMap": osm,
    };

    items = localStorage.length;
     // Check boxes depending on storage
     /*
    var overlayMaps = {
        "<span data-l10n-id='choix_bieres_tous'><img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Boire</span>": tous
     }
     for (var i = 0; i < items; i++) {
        overlayMaps += "<span data-l10n-id='choix_bieres_tous'><img src='assets/img/beer1.png' width='24' height='28'>&nbsp;" + localStorage.getItem(i) + "</span>":localStorage.getItem(i)
        }
      */
 //    alert("pouet");

      var overlayMaps = {
        "<span data-l10n-id='choix_bieres_tous'><img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Boire</span>": tous
     }
     for (var i = 0; i < items; i++) {
      overlayMaps["<img src='assets/img/beer4.png' width='24' height='28'>&nbsp; " + BeerName[localStorage.key(i)]] = BeerList[localStorage.key(i)];
      }

/*
    var overlayMaps = {
        "<span data-l10n-id='choix_bieres_tous'><img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Boire</span>": tous,
        "<img src='assets/img/beer4.png' width='24' height='28'>&nbsp; Chouffe": chouffe,
        "<img src='assets/img/beer3.png' width='24' height='28'>&nbsp; Tripel Karmeliet": karmeliet,
        "<img src='assets/img/beer2.png' width='24' height='28'>&nbsp; Leffe": leffe,
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp; Chimay": chimay,
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp; Brewdog": brewdog,        
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp; Guinness": guinness,
        "<img src='assets/img/affligem.png' width='24' height='28'>&nbsp; Affligem": affligem
    };*/
      //-debug-alert (Object.keys(overlayMaps));

    map.addLayer(tous);

//indication utilisateur en cas de dé-zoom
className : 'leaflet-control-minZoomIndecator'
map.zoomIndecator._container.innerHTML = "<span data-l10n-id='overpass_err'>Zoom zoom zoom ! </span>";


L.control.layers(baseMaps, overlayMaps, {
  collapsed: isCollapsed
}).addTo(map);

//recherche
map.addControl( new L.Control.Search({
			url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
			jsonpParam: 'json_callback',
			propertyName: 'display_name',
			propertyLoc: ['lat','lon'],
			markerLocation: true,
			autoType: false,
			autoCollapse: true,
			minLength: 2,
			zoom:16
		}) );
 
//supprimer la barre de progression quand tout le js est traité
$(document).one("ajaxStop", function () {$("#loading").hide(); });

