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

/* les contrôles */
var baseMaps = {
   "OpenStreetMap": osm
};

/* Function to refresh controler */
init_localstorage()
var Ctrl = undefined;
console.log(Ctrl)
/* Function to refresh topright controler */
function RefreshCtrl() {
		   if (Ctrl != undefined) {
					  Ctrl.removeFrom(map); 
				   };
			   
		   var overlayMaps = {
			  "<img src='assets/img/beer1.png'><span data-l10n-id='choix_bieres_tous' height='28'>&nbsp;Boire</span>": tous
		   };
	   
		   items = localStorage.length;
		   for (var i = 0; i < items; i++) {
			if (BeerName[localStorage.key(i)] != undefined) {			   
			overlayMaps["<img src='assets/img/"+BeerImage[localStorage.key(i)]+"' height='28'>&nbsp; " + BeerName[localStorage.key(i)]] = BeerList[localStorage.key(i)];
			}}
	   

		   Ctrl = L.control.layers(baseMaps, overlayMaps, {collapsed: isCollapsed});

		   Ctrl.addTo(map);
   
		   var html = Ctrl['_separator'].innerHTML;


		   html += '<a href="#" class="btn btn-warning" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="';
		   html += "$('#setupModal').modal('show'); return false;";
		   html += '"><i class="fa fa-cogs" style="color: white"></i><font color="white" data-l10n-id="setup">&nbsp;&nbsp;Configurer</font></a>';
		   //console.log(Ctrl['_overlaysList'].innerHTML);
		   Ctrl['_separator'].innerHTML = html;

		   // l10n
		   document.l10n.localize(['choix_bieres_tous','setup'], function(l10n) {
			  var node = document.querySelector('[data-l10n-id=choix_bieres_tous]');				  
				if (node != null ) {node.textContent = l10n.entities.choix_bieres_tous.value;}
				var node2 = document.querySelector('[data-l10n-id=setup]');				  
				if (node2 != null ) {node2.textContent = l10n.entities.setup.value;}                  
				})
   }
// Refresh controler on page load
RefreshCtrl();
map.addLayer(tous);
/* indication utilisateur en cas de dé-zoom*/
className : 'leaflet-control-minZoomIndecator'
map.zoomIndecator._container.innerHTML = "<span data-l10n-id='overpass_err'>Zoom zoom zoom ! </span>";
   
/* Search layer */
map.addControl( new L.Control.Search({
			url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
			jsonpParam: 'json_callback',
			propertyName: 'display_name',
			propertyLoc: ['lat','lon'],
			markerLocation: true,
			autoType: false,
			autoCollapse: true,
			minLength: 2,
			zoom:16
		}) );

/* Hash map (coordinates in the url to make perenne url) */
var hash = new L.Hash(map);

/* supprimer la barre de progression quand tout le js est traité */
$(document).one("ajaxStop", function () {$("#loading").hide(); });

