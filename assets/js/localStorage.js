/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

//les variables liées aux données sur les bières sont dans BeerList.js

  function init_localstorage() { 
  // Onload func
      UpdateBeerList_Setup_Form(); // Update beers in setup form
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
      localstorageitems = localStorage.length // Count items in local storage
     
     /*
     // Choose default if localStorage is empty 
        var NoneChecked = true; 
        var inputForm = FormSelectedBeers.getElementsByTagName("input"); 
        var n = inputForm.length;
        for (i=0; i<n; i++)
                {
                if ( inputForm[i].type.toLowerCase()==="checkbox")  
                        {
                        if (inputForm[i].checked) {NoneChecked = false; break;} ; 
                        }
                }
     //console.log(NoneChecked)
     if (NoneChecked == true) {
            localStorage.setItem('chouffe','1'); document.getElementById('chouffe').checked = true;
            localStorage.setItem('affligem','1'); document.getElementById('affligem').checked = true;
            localStorage.setItem('tripel_karmeliet','1'); document.getElementById('tripel_karmeliet').checked = true;
            }
    */
     
     RefreshTxt(); // Display/Update notification
  };
  
  function RefreshTxt() {
     // Display small notification
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
      for (var myi in BeerList) {
          if (map.hasLayer(BeerList[myi])) {map.removeLayer(BeerList[myi]);console.log("removed layer : "+myi);}
      }
     /* TO DELETE
     for (var myi in BeerName) {
       if (BeerName.hasOwnProperty(myi)) {
         var TempBeerName = myi;
         if (document.getElementById(TempBeerName).checked == true) {document.getElementById(TempBeerName).checked = false;}
         //alert(TempBeerName);
         if (map.hasLayer(BeerList[TempBeerName])) {map.removeLayer(BeerList[TempBeerName]);console.log("removed layer : "+TempBeerName);}
      }
     }
     localStorage.clear();
     RefreshTxt(); // Refresh notification*/
     //document.getElementById('FormSelectedBeers').reset(); // Uncheck boxes   
     //document.location.reload(); // Page reload 
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

