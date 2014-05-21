/*OverPass-API layer*/

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
                var pos = new L.LatLng(e.lat, e.lon);
                //var popup = e.tags["name"]
                var content = "<table class='table table-striped table-bordered table-condensed'>" 
                if (e.tags["name"]) {content += "<tr><th>Nom</th><td>" + e.tags["name"] + "</td></tr>"}
                if (e.tags["opening_hours"]) {content += "<tr><th>Horaires d'ouvertures</th><td>" + e.tags["opening_hours"] + "</td></tr>"}
                if (e.tags["happy_hours"]) {content += "<tr><th>Happy Hours</th><td>" + e.tags["happy_hours"] + "</td></tr>"}
                if (e.tags["brewery"]) {content += "<tr><th>Type de bières</th><td>" + e.tags["brewery"] + "</td></tr>"}
                content += "<tr><td colspan='2'><a href='#' onClick='sidebar.toggle();init_form_from_OSM(edit_form,"+ e.id.toString() +")'>Ajouter des infos sur ce bar</a></td></tr>";
                //content += "<tr><td colspan='2'><a href='http://www.openstreetmap.org/edit?editor=id&node="+ e.id.toString() +"' target='blank'>Modifier ce bar dans OSM</a></td></tr>"
                content +="</table>";

		var myicon = L.icon({
                  iconUrl: icon,
              });
        var marker = L.marker(pos, {icon: myicon}).bindPopup(content);
        this.instance.addLayer(marker);			  
			  

        }
      },
    })
    };    
    

