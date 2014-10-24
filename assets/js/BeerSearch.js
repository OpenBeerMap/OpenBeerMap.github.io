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

        BeerTag = $( "#beersearchinput" ).val();
        BeerMetaData = $( "#beersearchmetadata" ).val();
        // If the user typed the name of the beer by himself, default image
        if (BeerMetaData == "") { BeerMetaData = "beer1.png"; }
        LocalStorageStore(BeerTag,BeerMetaData);
        LocalStorageList();

     });

$('#localstoragelist').on('click', '.removebutton', function(event) {
   LocalStorageStore(this.value,localStorage[this.value]);
   LocalStorageList();
});
