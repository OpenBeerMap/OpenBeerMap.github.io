function basic_auth(){
        return "Basic " + btoa("OpenBeerMapContributor" + ":" + "FtHwuH8w1RDjQpOr0y0gF3AWm8sRsRzncK3hHh9");
}
        
function get_node(id){
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://api.openstreetmap.org/api/0.6/node/"+id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send();

        console.log("GET node/ : " + xhr.status);
        var xmlDocument = xhr.responseXML;

        var tous_les_tags = xmlDocument.documentElement.getElementsByTagName("tag");
        for (var i = 0; i < tous_les_tags.length; i++) {
        console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
      
        }
        return xmlDocument;
              
}

function edit_tag(xml,key, value){
        var tous_les_tags = xml.documentElement.getElementsByTagName("tag");
        /*modifier la valeur d'un tag, s'il existe déjà */ 
        for (var i = 0; i < tous_les_tags.length; i++) {
          if (tous_les_tags[i].getAttribute("k") === key)
                {
                //console.log(tous_les_tags[i].getAttribute("v"))
                tous_les_tags[i].setAttribute("v",value);
                return
                }
         }       
        /*sinon, créer un nouveau tag */ 
        newel=xml.createElement("tag");
        x=xml.getElementsByTagName("node")[0];
        x.appendChild(newel); 
        newel.setAttribute("k",key);
        newel.setAttribute("v", value);  
        return              
        
        //debug
        for (var i = 0; i < tous_les_tags.length; i++) {     
        console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
        }
        //return

}

function get_tag(xml,key){
      var tous_les_tags = xml.documentElement.getElementsByTagName("tag");
      /*modifier la valeur d'un tag*/ 
      for (var i = 0; i < tous_les_tags.length; i++) {
        if (tous_les_tags[i].getAttribute("k") === key)
                {
                //console.log(tous_les_tags[i].getAttribute("v"));
                return tous_les_tags[i].getAttribute("v");
                }
        }
      return "non_fourni"  
}

function del_tag(xml,key){
      var tous_les_tags = xml.documentElement.getElementsByTagName("tag");
      /*modifier la valeur d'un tag*/ 
      for (var i = 0; i < tous_les_tags.length; i++) {
        if (tous_les_tags[i].getAttribute("k") === key)
                {
                //supprimer le tag
                tous_les_tags[i].parentNode.removeChild(tous_les_tags[i]); 
                }
        }
        return  
}

function put_node(xml, changeset_id, id){        
        var node = xml.documentElement.getElementsByTagName("node");
        console.log(node[0].getAttribute('changeset'))
        node[0].setAttribute('changeset', changeset_id); 
       
        var tous_les_tags = xml.documentElement.getElementsByTagName("tag");
        for (var i = 0; i < tous_les_tags.length; i++) {
        console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
      
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://api.openstreetmap.org/api/0.6/node/"+id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(xml);

        console.log("PUT node/ : " + xhr.status);
        console.log(xhr.responseText);
        
}

function close_changeset(id){ 

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://api.openstreetmap.org/api/0.6/changeset/"+id+"/close", false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send();

        console.log("PUT changeset/close : " + xhr.status);
        console.log(xhr.responseText); 
        return xhr.responseText ;

}

function put_changeset(){ 
        xml = "<osm> <changeset> <tag k='created_by' v='OpenBeerMap javascript editor'/> <tag k='comment' v='OpenBeerMar - Modification de bar'/> </changeset></osm>";
// TODO : passer le nom du bar modifié (ou son id si pas de nom) ?

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://api.openstreetmap.org/api/0.6/changeset/create", false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(xml);

        console.log("PUT changeset : " + xhr.status);
        console.log(xhr.responseText);    
        return xhr.responseText ;

}


function edit_node(id){
        // récupérer le node initial
        OSMxml = get_node(id)
        
        //ici, faire les changements nécessaires
        edit_tag(OSMxml,"internet_acces","wlan")
        
        //ouvrir un changeset
        changeset_id = put_changeset()
        
        //envoyer le nouveau node
        put_node(OSMxml, changeset_id, id)
        
        //fermer le changeset
        close_changeset(changeset_id);

}





