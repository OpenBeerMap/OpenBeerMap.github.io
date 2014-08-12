  // Onload func
  function init_localstorage() {
      UpdateBeerList(); // Update beers in setup form
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
     // Count items in local storage
     localstorageitems = localStorage.length
     // Check boxes depending on storage
     for (var i = 0; i < localstorageitems; i++) {
        document.getElementById(localStorage.key(i)).checked = true;
        //alert(localStorage.key(i));
        }
     // Display/Update notification
     RefreshTxt();
  }
  function RefreshTxt() {
     // Display small notification
     document.getElementById('ResultLocalStorage').innerHTML = localStorage.length;
  }
  function Store(element) {
     if (element.checked) {
      // Add item to localStorage
      localStorage.setItem(element.value,'1');
   }
   else { 
      // Remove item from localStorage
      delete localStorage.removeItem(element.value);
   }
   // Refresh notification
   RefreshTxt();
  }
  function ClearStorage() {
     // Efface le storage local
     localStorage.clear();
     // Uncheck boxes
     document.getElementById('FormSelectedBeers').reset();
     // reload la page
     document.location.reload();
  }
  function UpdateBeerList() {
      var htmlBieres = '';
      for (var myi in BeerName) {
         if (BeerName.hasOwnProperty(myi)) {
            var TempBeerName = BeerName[myi];
            var TempBeerNameLowercase = TempBeerName.toLowerCase();
            TempLine = '<input type="checkbox" name="'+ TempBeerNameLowercase +'" value="' + TempBeerNameLowercase + '" id="' + TempBeerNameLowercase + '" onClick="Store(this)" />&nbsp;&nbsp;' + TempBeerName + '<br />';
            htmlBieres += TempLine;
            }
         }
      document.getElementById('FormSelectedBeers').innerHTML = htmlBieres;
  }

  function UpdateBeerList_Edition_Form() {
     var htmlBeers = '          <label class="col-md-4 control-label" for="checkboxes" data-l10n-id="liste_des_bieres">Bière pression dispo</label><div class="col-md-4">';
     i=0;
     for (var myi in BeerName) {
       if (BeerName.hasOwnProperty(myi)) {
         var TempBeerName = BeerName[myi];
         var TempBeerNameLowercase = TempBeerName.toLowerCase();
         TempLine = '<div class="checkbox"><label for="checkboxes-'+i+'"><input type="checkbox" name="beer" id="checkboxes-'+i+'" value="'+TempBeerNameLowercase+'">'+TempBeerName+'</label></div>';
         htmlBeers += TempLine;
         i++;
         }
      }
     document.getElementById('pubeditbeerlist').innerHTML = htmlBeers;
}
