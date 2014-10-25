/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

//les variables liées aux données sur les bières sont dans BeerList.js


function init_localstorage() { 
      localstorageitems = localStorage.length // Count items in local storage

	// set default for the first visit
    if (localStorage.length == 0) {
            localStorage.setItem('chouffe','beers/chouffe.png'); 
            localStorage.setItem('affligem','beers/affligem.png'); 
            localStorage.setItem('tripel_karmeliet','beers/karmeliet.png');
      }
      
  // Onload func
   
	 //init layers
      LSlength = localStorage.length;
      for (i=0; i<LSlength; i++) {
		  	element = localStorage.key(i)
			BeerName[element] = element;
  	 	 	BeerImage[element] = localStorage[element];
   		 	BeerList[element] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[\"brewery\"~\""+element+"\",i];way(BBOX)[\"brewery\"~\""+element+"\",i]);out center;", "assets/img/"+BeerImage[element]); 
      }  
   
       LocalStorageList();
	
      //deprecated-UpdateBeerList_Setup_Form(); // Update beers in setup form
      
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
     
     RefreshTxt(); // Display/update txt notification - debug
  };

/* debug func*/
function RefreshTxt() {
     //  Display small notification (remove hidden in the html file before using)
     document.getElementById('ResultLocalStorage').innerHTML = localStorage.length;
  };
  
  
/* deprecated func*/
function Store(element) {
     if (element.checked) {
      // Add item to localStorage
      localStorage.setItem(element.value,'1');
   }
   else { 
      // Remove item from localStorage
      if (map.hasLayer(BeerList[element.value])) {map.removeLayer(BeerList[element.value]);}
      delete localStorage.removeItem(element.value);

   }  
   RefreshTxt(); // Refresh notification
  };
  
/* deprecated func*/  
function UpdateBeerList_Setup_Form() {
      var htmlBieres = '<input type="text" id="beersearchinput" name="beersearchinput" onChange="BeerSearch(this.value);"/><br />';

      var checked = '';
      for (var myi in BeerName) {
         if (BeerName.hasOwnProperty(myi)) {
            var TempBeerName = BeerName[myi];
            var TempBeerNameLowercase = myi;
            if (localStorage.getItem(TempBeerNameLowercase) != null) {checked = 'checked="checked"';}
            else {checked = '';}
            TempLine = '<input type="checkbox" '+checked+' name="'+ TempBeerNameLowercase +'" value="' + TempBeerNameLowercase + '" id="' + TempBeerNameLowercase + '" onClick="Store(this)" />&nbsp;&nbsp;' + TempBeerName + '<br />';
            htmlBieres += TempLine;
            }
         }
      
      document.getElementById('FormSelectedBeers').innerHTML = htmlBieres;
  };
/* end deprecated */ 

function UpdateBeerList_Edition_Form() {
     var htmlBeers = '          <label class="col-md-4 control-label" for="checkboxes" data-l10n-id="liste_des_bieres">Bière pression dispo</label><div id="checkboxlist" class="col-md-4">';
     i=0;
     for (var myi in BeerName) {
       if (BeerName.hasOwnProperty(myi)) {
         var TempBeerName = BeerName[myi];
         var TempBeerNameLowercase = myi;
         TempLine = '<div class="checkbox"><label for="checkboxes-'+i+'"><input type="checkbox" name="beer" id="checkboxes-'+i+'" value="'+TempBeerNameLowercase+'">'+TempBeerName+'</label></div>';
         htmlBeers += TempLine;
         i++;
         }
      }
     document.getElementById('pubeditbeerlist').innerHTML = htmlBeers;
};


 

function LocalStorageStore(element,value) {
      if (localStorage.getItem(element) == null) {
         localStorage.setItem(element,value);
		 BeerName[element] = element;
  	 	 BeerImage[element] = localStorage[element];
   		 BeerList[element] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[\"brewery\"~\""+element+"\",i];way(BBOX)[\"brewery\"~\""+element+"\",i]);out center;", "assets/img/"+BeerImage[element]+".png"); 
      }
      else {
		  if (map.hasLayer(BeerList[element])) {map.removeLayer(BeerList[element]);}
         delete localStorage.removeItem(element); 
         console.log('Removing '+element+' with value '+value);
      }
      
   }
   
function LocalStorageList() {
      LSlength = localStorage.length;
      TxtList='';
      for (i=0; i<LSlength; i++) {
         //console.log(i + " : " + localStorage.key(i));
         TxtList += '<li><input type="button" class="removebutton" value="'+ localStorage.key(i) +'" /></li>';
      }
      $( "#localstoragelist" ).html(TxtList);
   }



/* Encode special chars - useless so far but can be usefull later !*/
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}


function ClearStorage() {
     // Reset localStorage , uncheck boxes, and remove map layer
      LSlength = localStorage.length;
      for (i=0; i<LSlength; i++) {
          element = localStorage.key(i);
		  if (map.hasLayer(BeerList[element])) {map.removeLayer(BeerList[element]);}
      }
      localStorage.clear();
      LocalStorageList();
      
  };
  


 

