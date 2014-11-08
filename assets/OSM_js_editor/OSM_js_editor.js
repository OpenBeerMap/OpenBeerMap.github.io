/*
 OpenBeerMap OSM_js_editor.js | noemie.lehuby(at)gmail.com | MIT Licensed
Éditeur OSM dans la Leaflet sidebar */

//les fonctions de manipulation de l'API OSM sont dans OSMAPI.js

//méthode pour pouvoir supprimer facilement un élément d'un tableau
Array.prototype.del = function(val){
    var index = this.indexOf(val)
    if(index > -1){
        this.splice(index,1)
    }
}

function init_form_from_OSM(form,OSM_type,OSM_id) { 
        // récupération des valeurs actuelles 
        OSM_xml = get_node_or_way(OSM_id,OSM_type)
    
        beer_src = get_tag(OSM_xml,"brewery").toLowerCase()
		
		complete_form_with_already_maped_beers(beer_src) // ajouter les bières déjà présentes dans le formulaire d'édition
	
        name_src = get_tag(OSM_xml,"name") ; if (name_src === "non_fourni") {name_src = ""}  ;   
        opening_src = get_tag(OSM_xml,"opening_hours") ; if (opening_src === "non_fourni") {opening_src = ""}; 
        happy_src = get_tag(OSM_xml,"happy_hours") ; if (happy_src === "non_fourni") {happy_src = ""}; 
        wifi_src = get_tag(OSM_xml,"internet_access").toLowerCase()
        otherbeer_src = get_tag(OSM_xml,"brewery:note") ; if (otherbeer_src === "non_fourni") {otherbeer_src = ""}  ; 
        
        //écriture des valeurs dans le formulaire
        // id du node/way, pour pouvoir soumettre le formulaire plus tard
        document.getElementById('OSM_type').value = OSM_type
        document.getElementById('OSM_id').value = OSM_id
        // nom du bar
        document.getElementById('bar-name').value = name_src
        // horaires d'ouverture
        document.getElementById('opening_hours').value = opening_src 
        // happy hours
        document.getElementById('happy_hours').value = happy_src        
		//lien iD tout en bas du formulaire
		document.getElementById("singlelink").href = "http://www.openstreetmap.org/edit?editor=id&"+OSM_type+ "=" + OSM_id.toString() 
        // champ libre pour les bières autres
        document.getElementById('beer-other').value = otherbeer_src
        //tout le reste
        var inputForm = form.getElementsByTagName("input"); // récupération ds éléments de type input du formulaire
        var n = inputForm.length;
        for (i=0; i<n; i++)
                {
                if ( (inputForm[i].type.toLowerCase()==="checkbox") && (inputForm[i].name ==="beer"))  // si c'est une case à cocher de type beer
                        {
                        if (inputForm[i].checked) {inputForm[i].checked = false} ; //décocher tout par défaut
                        if (beer_src.indexOf(inputForm[i].value.toLowerCase()) != -1 ) // si j'ai le nom de ma bière dans les données OSM
                                {inputForm[i].checked = true}
                        }
                
               if ( (inputForm[i].type.toLowerCase()==="radio") && (inputForm[i].name ==="wifi"))  
                        {
                        if ((wifi_src === "wlan") || (wifi_src === "yes") ) {if (inputForm[i].value === "wlan") {inputForm[i].checked = true}}
                        if (wifi_src === "non_fourni") {if (inputForm[i].value === "chaispas") {inputForm[i].checked = true}}
                        if (wifi_src === "no") {if (inputForm[i].value === "no") {inputForm[i].checked = true}}
                        }
               } 
        
    	//post-processing
        	// pass
        	
        };

function form_from_user(form) {
        OSM_id = document.getElementById('OSM_id').value
        OSM_type = document.getElementById('OSM_type').value
         
        // récupération des valeurs de bière actuelles       
        OSM_xml = get_node_or_way(OSM_id,OSM_type)
        var beer_tab = get_tag(OSM_xml,"brewery").toLowerCase().split(';');
        
        
        // récupération des valeurs saisies dans le formulaire
        var name = document.getElementById('bar-name').value
        var opening = document.getElementById('opening_hours').value
        var happy = document.getElementById('happy_hours').value
        var inputForm = form.getElementsByTagName("input"); 
    	var otherbeer = document.getElementById('beer-other').value
        var n = inputForm.length;
        for (i=0; i<n; i++)
                {
                //traitement des cases à cocher des types de bières
                if ( (inputForm[i].type.toLowerCase()==="checkbox") && (inputForm[i].name.toLowerCase()==="beer")) 
                        {
                        if (inputForm[i].checked) 
                                {
                                if (beer_tab.indexOf(inputForm[i].value.toLowerCase()) === -1 )
                                        {beer_tab.push(inputForm[i].value) }
                                }
                        else
                                {
                                beer_tab.del(inputForm[i].value) 
                                }
                        
                        }
                        
                //traitement des cases à cocher pour le wifi
               if ( (inputForm[i].type.toLowerCase()==="radio") && (inputForm[i].name ==="wifi"))  
                        {
                        if (inputForm[i].checked) {var wifi = inputForm[i].value} ;
                        }
                }
                
        // préparation de l'envoi à OSM 
        beer_tab.del("non_fourni")
        var brewery = beer_tab.join(";")  
             
        var envoi = 0   

        //TODO : il y a des envois vides à OSM ; refacto à prévoir ici
        if (beer_tab.length > 0) {edit_tag(OSM_xml,OSM_type,"brewery",brewery); envoi = 1} // TODO : ici, on envoie dès qu'il y a déjà une bière renseignée, même si on ne la change pas
        // s'il n'y avait qu'une bière, et que l'utilisateur la décoche, beer_tab devient vide, il faut donc supprimer le tag
        else {if((brewery != get_tag(OSM_xml,"brewery")) && (beer_tab.length != 0)) {del_tag(OSM_xml,"brewery");envoi=2}} // fonctionne pas
        if (wifi != "chaispas") {edit_tag(OSM_xml,OSM_type,"internet_access", wifi); envoi = 3}
        // si wifi n'était pas vide, mais que maintenant, c'est chaispas, il faut supprimer le tag
        else {if(get_tag(OSM_xml,"internet_access") != "non_fourni") {del_tag(OSM_xml,"internet_access");envoi=4}}
        if ((name != get_tag(OSM_xml,"name")) && (name != "")) {edit_tag(OSM_xml,OSM_type, "name", name); envoi = 5}
        //si nom est vide mais qu'avant il y avait qqch, il faut supprimer le tag
        else {if ((get_tag(OSM_xml,"name") != "non_fourni") && (name == "")) {del_tag(OSM_xml, "name"); envoi = 6}}
    	if ((otherbeer != get_tag(OSM_xml,"brewery:note")) && (otherbeer != "")) {edit_tag(OSM_xml,OSM_type, "brewery:note", otherbeer); envoi = 7}
    
        /*
        if ((opening != get_tag(OSM_xml,"opening_hours")) && (opening != "")) {edit_tag(OSM_xml, OSM_type, "opening_hours", opening); envoi = 1}
        if ((happy != get_tag(OSM_xml,"happy_hours")) && (happy != "")) {edit_tag(OSM_xml, OSM_type, "happy_hours", happy); envoi = 1}
        */
    
    	//envoi à OSM
    	console.log(envoi)
        if (envoi != 0)
                {
                //ouvrir un changeset
                changeset_id = put_changeset()
                
                //envoyer le nouveau node
                put_node_or_way(OSM_xml, changeset_id, OSM_id,OSM_type)
                
                //fermer le changeset
                close_changeset(changeset_id);
                }
    
        //post-processing
        sidebar.hide();
        };


		
function complete_form_with_already_maped_beers(beer_src){
		var htmlBeers=''
		x = beer_src.split(";")
		
			// BeerName to lower case
		var key, keys = Object.keys(BeerName);
		var n = keys.length;
		var lcBeerName={}
		while (n--) {
		  key = keys[n];
		  lcBeerName[key.toLowerCase()] = BeerName[key];
		}	

	
		for(var i= 0; i < x.length; i++)
		{
		if (!(x[i] in lcBeerName)) { // ne pas ajouter les éléments déjà ajoutés par localstorage
			console.log(x[i])
			if (x[i] != "non_fourni"){

         TempLine = '<div class="checkbox"><label for="checkboxes-'+x[i]+'"><input type="checkbox" name="beer" id="checkboxes-'+x[i]+'" value="'+x[i]+'">'+x[i]+'</label></div>';
         htmlBeers += TempLine;
         
         
			}}}
	 	document.getElementById('beerlist_fromOSM').innerHTML = htmlBeers;
	
}
