/* Éditeur OSM dans la Leaflet sidebar */
//les fonctions de manipulation de l'API OSM sont dans OSMAPI.js

//méthode pour pouvoir supprimer facilement un élément d'un tableau
Array.prototype.del = function(val){
    var index = this.indexOf(val)
    if(index > -1){
        this.splice(index,1)
    }
}

function init_form_from_OSM(form,OSM_id) { 
        // récupération des valeurs actuelles 
        OSM_xml = get_node(OSM_id)
        beer_src = get_tag(OSM_xml,"brewery").toLowerCase()
        name_src = get_tag(OSM_xml,"name") ; if (name_src === "non_fourni") {name_src = ""}  ;   
        opening_src = get_tag(OSM_xml,"opening_hours") ; if (opening_src === "non_fourni") {opening_src = ""}; 
        happy_src = get_tag(OSM_xml,"happy_hours") ; if (happy_src === "non_fourni") {happy_src = ""}; 
        wifi_src = get_tag(OSM_xml,"internet_access").toLowerCase()
        
        //écriture des valeurs dans le formulaire
        // id du node, pour pouvoir soumettre le formulaire plus tard
        document.getElementById('OSM_id').value = OSM_id
        // nom du bar
        document.getElementById('bar-name').value = name_src
        // horaires d'ouverture
        document.getElementById('opening_hours').value = opening_src 
        // happy hours
        document.getElementById('happy_hours').value = happy_src        
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
        };

function form_from_user(form) {
        OSM_id = document.getElementById('OSM_id').value
         
        // récupération des valeurs de bière actuelles       
        OSM_xml = get_node(OSM_id)
        var beer_tab = get_tag(OSM_xml,"brewery").toLowerCase().split(';');
        
        
        // récupération des valeurs saisies dans le formulaire
        var name = document.getElementById('bar-name').value
        var opening = document.getElementById('opening_hours').value
        var happy = document.getElementById('happy_hours').value
        var inputForm = form.getElementsByTagName("input"); 
        var n = inputForm.length;
        for (i=0; i<n; i++)
                {
                //traitement des cases à cocher des types de bières
                if ( (inputForm[i].type.toLowerCase()==="checkbox") && (inputForm[i].name.toLowerCase()==="beer")) 
                        {
                        if (inputForm[i].checked) 
                                {
                                if (beer_tab.indexOf(inputForm[i].value) === -1 )
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

        //ici, faire les changements de tag nécessaires
        if (beer_tab.length > 0) {edit_tag(OSM_xml,"brewery",brewery); envoi = 1}
        // s'il n'y avait qu'une bière, et que l'utilisateur la décoche, beer_tab devient vide, il faut donc supprimer le tag
        else {if(brewery != get_tag(OSM_xml,"brewery")) {del_tag(OSM_xml,"brewery");envoi=1}}
        if (wifi != "chaispas") {edit_tag(OSM_xml,"internet_access", wifi); envoi = 1}
        // si wifi n'était pas vide, mais que maintenant, c'est chaispas, il faut supprimer le tag
        else {if(get_tag(OSM_xml,"internet_access") != "non_fourni") {del_tag(OSM_xml,"internet_access");envoi=1}}
        if ((name != get_tag(OSM_xml,"name")) && (name != "")) {edit_tag(OSM_xml, "name", name); envoi = 1}
        //si nom est vide mais qu'avant il y avait qqch, il faut supprimer le tag
        else {if ((get_tag(OSM_xml,"name") != "non_fourni") && (name == "")) {del_tag(OSM_xml, "name"); envoi = 1}}
        /*
        if ((opening != get_tag(OSM_xml,"opening_hours")) && (opening != "")) {edit_tag(OSM_xml, "opening_hours", opening); envoi = 1}
        if ((happy != get_tag(OSM_xml,"happy_hours")) && (happy != "")) {edit_tag(OSM_xml, "happy_hours", happy); envoi = 1}
        */
        if (envoi != 0)
                {
                //ouvrir un changeset
                changeset_id = put_changeset()
                
                //envoyer le nouveau node
                put_node(OSM_xml, changeset_id, OSM_id)
                
                //fermer le changeset
                close_changeset(changeset_id);
                }
        //TODO : peut-être replier la sidebar si enregistre sans faire de modif ?
        };



