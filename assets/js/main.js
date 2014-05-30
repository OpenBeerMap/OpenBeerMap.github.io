/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

/* Basemap Layers */
var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
      attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
//var osm = new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
var osm = new L.TileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(48.84702,2.37705), 17);

/*User Location*/
map.locate({setView: true})
        .on('locationfound', function(e){
        console.log("localisation utilisateur réussie");
            var marker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup('Vous êtes par ici&nbsp;&nbsp;');
            map.addLayer(marker);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("échec de localisation de l'utilisateur");
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

/*OverPassAPI overlay*/
    var tous = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];node(BBOX)[amenity=cafe];node(BBOX)[amenity=pub]);out;>;out;", "assets/img/beer1.png");
    
    var leffe = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[lL]effe'];out;", "assets/img/beer2.png"); 
    	
    var chouffe = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[cC]houffe'];out;", "assets/img/beer4.png");  
    
    var chimay = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Cc]himay'];out;", "assets/img/beer1.png");  
	
    var guinness = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Gg]uinness'];out;", "assets/img/beer1.png");  

	var brewdog = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Bb]rewdog'];out;", "assets/img/beer1.png");  
	
    var karmeliet = draw_beer("http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[tT]ripel_[kK]armeliet'];out;", "assets/img/beer3.png");
//les fonctions utilisées pour récupérer les données et les placer sont dans BeerLayer.js   
    
    
    var baseMaps = {
        "OpenStreetMap": osm,
    };

    var overlayMaps = {
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Boire": tous,
        "<img src='assets/img/beer4.png' width='24' height='28'>&nbsp;Avec de la Chouffe": chouffe,
        "<img src='assets/img/beer3.png' width='24' height='28'>&nbsp;Avec de la Tripel Karmeliet": karmeliet,
        "<img src='assets/img/beer2.png' width='24' height='28'>&nbsp;Avec de la Leffe": leffe,
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Avec de la Chimay": chimay,
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Avec de la Brewdog": brewdog,
        "<img src='assets/img/beer1.png' width='24' height='28'>&nbsp;Avec de la Guinness": guinness
    };
    map.addLayer(tous);

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
 
/*supprimer la barre de progression quand tout le js est traité */
$(document).one("ajaxStop", function () {$("#loading").hide(); });

