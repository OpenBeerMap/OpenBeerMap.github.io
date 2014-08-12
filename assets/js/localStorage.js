/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com | MIT Licensed
*/

//les variables liées aux données sur les bières sont dans BeerList.js

  function init_localstorage() { 
  // Onload func
      UpdateBeerList(); // Update beers in setup form
      UpdateBeerList_Edition_Form(); // update beers list in OSM form
      localstorageitems = localStorage.length // Count items in local storage
     
     // Check boxes depending on storage
     for (var i = 0; i < localstorageitems; i++) {
        document.getElementById(localStorage.key(i)).checked = true;
        //console.log(localStorage.key(i));
        }

     // Choose default if localStorage is empty 
        var NoneChecked = true; 
        var inputForm = FormSelectedBeers.getElementsByTagName("input"); // récupération ds éléments de type input du formulaire
        var n = inputForm.length;
        for (i=0; i<n; i++)
                {
                if ( inputForm[i].type.toLowerCase()==="checkbox")  // si c'est une case à cocher 
                        {
                        if (inputForm[i].checked) {NoneChecked = false; break;} ; 
                        }
                }
     //console.log(NoneChecked)
     if (NoneChecked == true) {
            localStorage.setItem('chouffe','1'); document.getElementById('chouffe').checked = true;
            localStorage.setItem('affligem','1'); document.getElementById('affligem').checked = true;
            localStorage.setItem('karmeliet','1'); document.getElementById('karmeliet').checked = true;
            }

     
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
   }  
   RefreshTxt(); // Refresh notification
  };
  
  function ClearStorage() {
     // Reset localStorage
     localStorage.clear();
     document.getElementById('FormSelectedBeers').reset(); // Uncheck boxes   
     document.location.reload(); // Page reload 
  };
  
  function UpdateBeerList() {
      var htmlBieres = '';
      for (var myi in BeerName) {
         if (BeerName.hasOwnProperty(myi)) {
            var TempBeerName = BeerName[myi];
            var TempBeerNameLowercase = myi; 
            TempLine = '<input type="checkbox" name="'+ TempBeerNameLowercase +'" value="' + TempBeerNameLowercase + '" id="' + TempBeerNameLowercase + '" onClick="Store(this)" />&nbsp;&nbsp;' + TempBeerName + '<br />';
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

