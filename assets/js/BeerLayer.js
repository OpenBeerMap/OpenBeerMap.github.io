/*
 OpenBeerMap OverPass-API layer | noemie.lehuby(at)gmail.com | MIT Licensed
*/

function debug_draw_beer(url,icon){
        return new L.OverPassLayer({
                minzoom: 17,
                query: url,
                callback: function(data) {
                        for(i=0;i<data.elements.length;i++) {
                        e = data.elements[i];

                        if (e.id in this.instance._ids) return;
                        this.instance._ids[e.id] = true;
                        var pos = new L.LatLng(e.lat, e.lon);
                        var popup = this.instance._poiInfo(e.tags,e.id);
		        var myicon = L.icon({
                          iconUrl: icon,
                      });
                var marker = L.marker(pos, {icon: myicon}).bindPopup(popup);
                this.instance.addLayer(marker);			  

        }
      },
    })
    };
    
function draw_beer(url,icon){
        return new L.OverPassLayer({
	minzoom: 14,
	query: url,

	callback: function(data) {
                for(i=0;i<data.elements.length;i++) {
                e = data.elements[i];
                if (e.id in this.instance._ids) return;
                this.instance._ids[e.id] = true;   
                if (e.tags != undefined){
                    if (e.type === "node") {if (e.tags['amenity']) {var pos = new L.LatLng(e.lat, e.lon);}}
                    else {var pos = new L.LatLng(e.center.lat, e.center.lon);}
                var content = "<table class='table table-striped table-bordered table-condensed'>" 
                if (e.tags["name"]) {content += "<tr><th data-l10n-id='popup_nom'>Nom</th><td>" + e.tags["name"] + "</td></tr>"}
                if (e.tags["opening_hours"]) {content += "<tr><th data-l10n-id='popup_opening_hours'>Horaires d'ouvertures</th><td>" + e.tags["opening_hours"] +"<div class='opening-hours-circle' style='background:"+ parse_osm_times(e.tags["opening_hours"]) +"'></div></td></tr>"}
                if (e.tags["happy_hours"]) {content += "<tr><th data-l10n-id='popup_happy_hours'>Happy Hours</th><td>" + e.tags["happy_hours"] +"<div class='opening-hours-circle' style='background:"+ parse_osm_times(e.tags["happy_hours"]) +"'></div></td></tr>"}
                if (e.tags["brewery"]) {content += "<tr><th data-l10n-id='popup_biere'>Type de bière pression</th><td>" + e.tags["brewery"].replace(/;/g, ", ") + "</td></tr>"}
                if (e.type == 'node') {node = "node" ; content += "<tr><td colspan='2'><a href='#' onClick='sidebar.toggle();init_form_from_OSM(edit_form,node,"+ e.id.toString() +")'><span data-l10n-id='popup_edit'>Ajouter des infos sur ce bar</span></a></td></tr>";}
                if (e.type == 'way') {way = "way" ; content += "<tr><td colspan='2'><a href='#' onClick='sidebar.toggle();init_form_from_OSM(edit_form,way,"+ e.id.toString() +")'><span data-l10n-id='popup_edit'>Ajouter des infos sur ce bar</span></a></td></tr>";}
                content +="</table>";
//78146476                    
        icon_o = icon            
		//if (e.tags["brewery"]) {icon_o = "assets/img/beer_empty.png"}
                    
		var myicon = L.icon({
                  iconUrl: icon_o,
                  iconAnchor:[10, 45],
                  popupAnchor : [4, -30]
              });
        var marker = L.marker(pos, {icon: myicon}).bindPopup(content);
        this.instance.addLayer(marker);			  
			  
        function onPopupClick(e) {
        document.l10n.localize(['popup_nom', 'popup_opening_hours', 'popup_happy_hours', 'popup_biere', 'popup_edit'], function(l10n) {
          var node = document.querySelector('[data-l10n-id=popup_nom]');
          if (node != null ) {node.textContent = l10n.entities.popup_nom.value;}
          var node = document.querySelector('[data-l10n-id=popup_opening_hours]');
          if (node != null ) {node.textContent = l10n.entities.popup_opening_hours.value;}       
          var node = document.querySelector('[data-l10n-id=popup_happy_hours]');
          if (node != null ) {node.textContent = l10n.entities.popup_happy_hours.value;}           
          var node = document.querySelector('[data-l10n-id=popup_biere]');
          if (node != null ) {node.textContent = l10n.entities.popup_biere.value;}  
          var node = document.querySelector('[data-l10n-id=popup_edit]');
          if (node != null ) {node.textContent = l10n.entities.popup_edit.value;}                      
          })
        }
        

                    
                    
        marker.on('click', onPopupClick);	
                }}
      },
    })
    };  
 
/* Opening Hours parsing */
function parse_osm_times(a_string){
      try {
      var oh = new opening_hours(a_string);
      var state      = oh.getStateString();
       // console.log(state)
      if (state === "open") {colour = "#bfd70e"}
      if (state === "close") {colour = "#ff0000"}
        return colour
      }

      catch(err){console.log("erreur en parsant les horaires")}       
}
