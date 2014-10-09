/*
 OpenBeerMap OSMAPI.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

function basic_auth(){
        return "Basic " + btoa("OpenBeerMapContributor" + ":" + "FtHwuH8w1RDjQpOr0y0gF3AWm8sRsRzncK3hHh9");
}

function get_node_or_way(id,OSM_type){
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api.openstreetmap.org/api/0.6/"  +OSM_type + "/"+id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send();

        console.log("GET " + OSM_type+ "/ : " + xhr.status);
        var xmlDocument = xhr.responseXML;

        var tous_les_tags = xmlDocument.documentElement.getElementsByTagName("tag");
        for (var i = 0; i < tous_les_tags.length; i++) {
        //console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
      
        }
        return xmlDocument;
              
}

function edit_tag(xml,OSM_type,key, value){
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
        if (OSM_type === 'node') { x=xml.getElementsByTagName("node")[0];}
        if (OSM_type === 'way') { x=xml.getElementsByTagName("way")[0];}

        x.appendChild(newel); 
        newel.setAttribute("k",key);
        newel.setAttribute("v", value);               
        
        /*
        //debug
        for (var i = 0; i < tous_les_tags.length; i++) {     
        console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
        }*/
        return 
        

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

 function xml_to_string(xml_node)
    {
        if (xml_node.xml)
            return xml_node.xml;
        else if (XMLSerializer)
        {
            var xml_serializer = new XMLSerializer();
            return xml_serializer.serializeToString(xml_node);
        }
        else
        {
            console.log("ERROR: Extremely old browser");
            return "";
        }
    };

function put_node_or_way(xml, changeset_id, id,OSM_type){       
    if (OSM_type == 'way')
       {
        var way = xml.documentElement.getElementsByTagName("way");
        console.log(way[0].getAttribute('changeset'))
        way[0].setAttribute('changeset', changeset_id); 
       }
    if (OSM_type == 'node')
      {
        var node = xml.documentElement.getElementsByTagName("node");
        console.log(node[0].getAttribute('changeset'))
        node[0].setAttribute('changeset', changeset_id); 
      }
       
        /*	
    	//debug    
        var tous_les_tags = xml.documentElement.getElementsByTagName("tag");    	
        for (var i = 0; i < tous_les_tags.length; i++) {
        console.log(tous_les_tags[i].getAttribute("k") +" : "+ tous_les_tags[i].getAttribute("v"))
        }*/
        
        
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/"+OSM_type+"/"+id, false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(xml_to_string(xml));

        console.log("PUT " +OSM_type+"/ : " + xhr.status);       
}

function close_changeset(id){ 

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/"+id+"/close", false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send();

        console.log("PUT changeset/close : " + xhr.status);
        return xhr.responseText ;

}

function put_changeset(){ 
        xml = "<osm> <changeset> <tag k='created_by' v='OpenBeerMap javascript editor'/> <tag k='comment' v='OpenBeerMap - Modification de bar'/> </changeset></osm>";

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://api.openstreetmap.org/api/0.6/changeset/create", false);
        xhr.setRequestHeader("Authorization", basic_auth());
        xhr.send(xml);

        console.log("PUT changeset : " + xhr.status);
        return xhr.responseText ;

}







