/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

//les variables liées aux données sur les bières sont dans BeerList.js

  function init_localstorage() { 
      localstorageitems = localStorage.length // Count items in local storage

	// set default for the first visit
      //if (localStorage.getItem('ItIsMyFirstVisit') == undefined) {
      if (localstorageitems == 0) {
            localStorage.setItem('chouffe','beer2.png'); 
            localStorage.setItem('affligem','beer2.png'); 
            localStorage.setItem('tripel_karmeliet','beer2.png');
         //localStorage.setItem('ItIsMyFirstVisit','not any more')
      }
      
  // Onload func
      // New
      
      LocalStorageList();
      //deprecated-UpdateBeerList_Setup_Form(); // Update beers in setup form
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
     
     RefreshTxt(); // Display/update txt notification - debug
  };
  
  function RefreshTxt() {
     // DEBUG
     //  Display small notification (remove hidden in the html file to debug)
     document.getElementById('ResultLocalStorage').innerHTML = localStorage.length;
  };
  
  
/* deprecated*/
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
  
  
// pas encore deprecated  
  function UpdateBeerList_Edition_Form() {
     var htmlBeers = '          <label class="col-md-4 control-label" for="checkboxes" data-l10n-id="liste_des_bieres">Bière pression dispo</label><div class="col-md-4">';
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

/* end deprecated */ 
 
/*New*/ 
   function LocalStorageStore(element,value) {
      if (localStorage.getItem(element) == null) {
         localStorage.setItem(element,value);
      }
      else {
         BeerLayer = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)[\"brewery\"~\""+element+"\",i];out;", "assets/img/beers/"+value);
         //alert(element);
         if (map.hasLayer(BeerLayer)) {map.removeLayer(BeerLayer);}
         delete localStorage.removeItem(element);
      }
      
   }
   
   function LocalStorageList() {
      LSlength = localStorage.length;
      TxtList='';
      //alert(LSlength);
      for (i=0; i<LSlength; i++) {
         //alert(i + " : " + localStorage.key(i));
         TxtList += '<li><input type="button" class="removebutton" value="'+ localStorage.key(i) +'" /></li>';
      }
      $( "#localstoragelist" ).html(TxtList);
   }

/* Fin de New*/

/* Encode special chars - useless so far but can be usefull later !*/
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}


  function ClearStorage() {
     // Reset localStorage , uncheck boxes, and remove map layer
     /*
      UpdateBeerList_Setup_Form()
      RefreshTxt()
      localStorage.setItem('ItIsMyFirstVisit','nope')
      */
      LSlength = localStorage.length;
      for (i=0; i<LSlength; i++) {
          BeerLayer = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)[\"brewery\"~\""+localStorage.key(i)+"\",i];out;", "assets/img/beer1.png"); 
          if (map.hasLayer(BeerLayer)) {map.removeLayer(BeerLayer);console.log("removed layer : "+i);}
      }
      localStorage.clear();
      LocalStorageList();
      
  };
  


 

