/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

//les variables liées aux données sur les bières sont dans BeerList.js

  function init_localstorage() { 
	// set default for the first visit
      if (localStorage.getItem('ItIsMyFirstVisit') == undefined) {
            localStorage.setItem('chouffe','1'); 
            localStorage.setItem('affligem','1'); 
            localStorage.setItem('tripel_karmeliet','1');
         localStorage.setItem('ItIsMyFirstVisit','not any more')
      }
      
  // Onload func
      UpdateBeerList_Setup_Form(); // Update beers in setup form
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
      localstorageitems = localStorage.length // Count items in local storage
     
     RefreshTxt(); // Display/update txt notification
  };
  
  function RefreshTxt() {
     // DEBUG
     //  Display small notification (remove hidden in the html file to debug)
     document.getElementById('ResultLocalStorage').innerHTML = localStorage.length;
  };
  
  function Store(element) {
     if (element.checked) {
      // Add item to localStorage
      localStorage.setItem(element.value,'1');
   }
   else { 
      // Remove item from localStorage
      delete localStorage.removeItem(element.value);
      if (map.hasLayer(BeerList[element.value])) {map.removeLayer(BeerList[element.value]);}
   }  
   RefreshTxt(); // Refresh notification
  };
  
  function ClearStorage() {
     // Reset localStorage , uncheck boxes, and remove map layer
     localStorage.clear();
      UpdateBeerList_Setup_Form()
      RefreshTxt()
      localStorage.setItem('ItIsMyFirstVisit','nope')
      for (var myi in BeerList) {
          if (map.hasLayer(BeerList[myi])) {map.removeLayer(BeerList[myi]);console.log("removed layer : "+myi);}
      }
  };
  
  function UpdateBeerList_Setup_Form() {
      var htmlBieres = '';
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

