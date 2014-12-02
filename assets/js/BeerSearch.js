/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

/* autocomplete beer - setup form */ 
$( "#beersearchinput" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php?",
            dataType: "jsonp",
            data: {
            q: request.term
            },
            success: function( data ) {
               ListData = [];
               for (var i in data) {
                  temp = {};
                  if (data[i].Beername && typeof data[i].Beername != 'undefined') {
                     temp = {value : data[i].BeerTag, label : data[i].BeerTag, image : data[i].ImageName}
                     ListData.push(temp);
                     }
                  }
               response(ListData);
               }
            });
         },
         minLength: 3,
         select: function(event, ui) { 
			 console.log("image associée : " + ui.item.image);
               $('#beersearchmetadata').val(ui.item.image);
               //$('#beersearchinput').value = ui.item.label;
               }
   });


$( "#beersearchsubmit" ).click(function() {
    if ($('#beersearchinput').val()!='')
    {
        BeerTag = $( "#beersearchinput" ).val();
        BeerMetaData = 'beers/' + $( "#beersearchmetadata" ).val();
        // If the user typed the name of the beer by himself, default image
        if (BeerMetaData == "beers/") { BeerMetaData = "beers/beer1.png"; }
        LocalStorageStore(BeerTag,BeerMetaData);
        LocalStorageList();
        $( "#beersearchinput" ).val('') ;
    }

});


/* autocomplete beer - bar edit form */
   $( "#beer-other" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php",
            dataType: "jsonp",
            data: {
            q: request.term
            },
            success: function( data ) {
            //console.log(data);
               ListData = [];
               for (var i in data) {
                  if (data[i].Beername && typeof data[i].Beername != 'undefined') {
                     ListData.push(data[i].BeerTag);
                     }
                  }
               response(ListData);
               }
            });
         },
         minLength: 3
   });

   $("#addbutton").on('click', function () {
           if ($('#beer-other').val()!='')
            {
            $('#checkboxlist').append('<div class="checkbox"><input type="checkbox" name="beer" checked id="checkbox-' + $("#beer-other").val() +'" value="' + $("#beer-other").val() +'"/><label for=checkbox-'+$("#beer-other").val()+'>'+ $("#beer-other").val()+'</label></div>');
            $('#beer-other').val("");
            }
    });

