/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

// Onload func
function init_localstorage() { 
	//oldies : the use of localStorage have changed so flush it to avoid side effects
	if (localStorage.getItem('ItIsMyFirstVisit') != null) {
	localStorage.clear();
		console.log('nettoyage du localStorage - il est maintenant utilisé différemment')
	}
  	// set default for the first visit
    if (localStorage.length == 0) {
            localStorage.setItem('chouffe','beers/chouffe.png'); 
            localStorage.setItem('guinness','beers/guinness.png'); 
            localStorage.setItem('tripel_karmeliet','beers/karmeliet.png');
      }

	//init layers
      LSlength = localStorage.length;
      for (i=0; i<LSlength; i++) {
		  	element = localStorage.key(i)
			BeerName[element] = element;
  	 	 	BeerImage[element] = localStorage[element];
   		 	BeerList[element] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[\"brewery\"~\""+element+"\",i];way(BBOX)[\"brewery\"~\""+element+"\",i]);out center;", "assets/img/"+BeerImage[element]); 
      }  
   
      LocalStorageList(); // displays localStorage items
      
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
     
     RefreshTxt(); // Display/update txt notification - debug
  };

// debug func
function RefreshTxt() {
     //  Display small notification (remove hidden in the html file before using)
     document.getElementById('ResultLocalStorage').innerHTML = localStorage.length;
  };

//Create the bar edit form in the sidebar
function UpdateBeerList_Edition_Form() {
     var htmlBeers = '';
     i=0;
     for (var myi in BeerName) {
       if (BeerName.hasOwnProperty(myi)) {
         var TempBeerName = BeerName[myi];
         var TempBeerNameLowercase = myi;
         TempLine = '<div class="checkbox"><input type="checkbox" name="beer" id="checkboxes-'+i+'" value="'+TempBeerNameLowercase+'"><label for="checkboxes-'+i+'">'+TempBeerName+'</label></div>';
         htmlBeers += TempLine;
         i++;
         }
      }
     document.getElementById('beerlist_fromlocalstorage').innerHTML = htmlBeers;
};

//Store items to localStorage
function LocalStorageStore(element,value) {
      if (localStorage.getItem(element) == null) {
         localStorage.setItem(element,value);
		 BeerName[element] = element;
  	 	 BeerImage[element] = localStorage[element];
   		 BeerList[element] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[\"brewery\"~\""+element+"\",i];way(BBOX)[\"brewery\"~\""+element+"\",i]);out center;", "assets/img/"+BeerImage[element]); 
      }
      else {
		  if (map.hasLayer(BeerList[element])) {map.removeLayer(BeerList[element]);}
         delete localStorage.removeItem(element); 
         console.log('Removing '+element+' with value '+value);
      }
      
   }

// Display the localStorage items
function LocalStorageList() {
      LSlength = localStorage.length;
      TxtList='';
      for (i=0; i<LSlength; i++) {    
		  //console.log(localStorage.key(i))
		  //console.log(localStorage[localStorage.key(i)])
		TxtList += '<input type="checkbox"  checked name="'+ localStorage.key(i) +'" value="' + localStorage.key(i) + '" id="' + localStorage.key(i) + '" onClick="LocalStorageStore(this.value,localStorage[this.value])" /><label>' + localStorage.key(i) + '</label>'		  
      }
      $( "#localstoragelist" ).html(TxtList);
   }


// Reset localStorage , uncheck boxes, and remove map layer
function ClearStorage() {    
      LSlength = localStorage.length;
      for (i=0; i<LSlength; i++) {
          element = localStorage.key(i);
		  if (map.hasLayer(BeerList[element])) {map.removeLayer(BeerList[element]);}
      }
      localStorage.clear();
      LocalStorageList();
	
      
  };
  



// Encode special chars - useless so far but can be usefull later !
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}