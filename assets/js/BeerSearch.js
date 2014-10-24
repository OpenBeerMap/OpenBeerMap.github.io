function BeerSearch(stringvalue) {
   var beerselection = [];
    $.getJSON('http://openbeermap.wc.lt/json_hostinger.php?q=guinness?callback=?','q=' + stringvalue,function(data){
        var output="<ul>";
        //alert(data[0].Beername);
         for (var i in data) {
            output+="<li>" + data[i].Beername + " (" + data[i].Brewery + ")</li>";
               //alert(data[i].Beername);
            if (data[i].Beername && typeof data[i].Beername != 'undefined') {
               beerselection.push(data[i].Beername);
            }
        }


        output+="</ul>";
        //document.getElementById("placeholder").innerHTML=output;

    });
}

/*
   $( "#beersearchinput" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://92.243.10.86/json.php?",
            dataType: "jsonp",
            data: {
            q: request.term
            },
            success: function( data ) {
               response(data);
               }
            });
         },
         minLength: 3
   });

*/

   //var beerselection = ['Michel','Andre'];
/*
   $( "#beersearchinput" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://92.243.10.86/json.php?",
            dataType: "jsonp",
            data: {
            q: request.term
            },
            success: function( data ) {
               //alert(data);
               ListData = [];
               for (var i in data) {
                  if (data[i].Beername && typeof data[i].Beername != 'undefined') {
                     ListData.push(data[i].BeerTag);
                     }
                  }
               //alert(ListData);
               response(ListData);
               }
            });
         },
         minLength: 3
   });
*/

   $( "#beersearchinput" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php?",
            dataType: "jsonp",
            data: {
            q: request.term
            },
            success: function( data ) {
               //alert(data);
               ListData = [];
               for (var i in data) {
                  temp = {};
                  if (data[i].Beername && typeof data[i].Beername != 'undefined') {
                     temp = {value : data[i].BeerTag, label : data[i].BeerTag, image : data[i].ImageName}
                     ListData.push(temp);
                     }
                  }
               //alert(ListData);
               response(ListData);
               }
            });
         },
         minLength: 3,
         select: function(event, ui) { 
               //alert(ui.item.image);
               $('#beersearchmetadata').val(ui.item.image);
               //$('#beersearchinput').value = ui.item.label;
               }
   });



function ImageQuery(request) {
      $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php?",
            dataType: "jsonp",
            data: {
            q: request
            },
            success: function( data ) {
               response = data[0].ImageName;
               //LocalStorageStore(request,response);
               }
            });
      }



  $( "#beersearchsubmit" ).click(function() {
         //ImageQuery('guinness');

        BeerTag = $( "#beersearchinput" ).val();
        BeerMetaData = $( "#beersearchmetadata" ).val();
        // If the user typed the name of the beer by himself, default image
        if (BeerMetaData == "") { BeerMetaData = "beer1.png"; }
        //alert(ImageData);
        LocalStorageStore(BeerTag,BeerMetaData);
        LocalStorageList();
        //ImageData = ImageQuery(BeerTag);
     });

$('#localstoragelist').on('click', '.removebutton', function(event) {
 //sl.remove($(this).parent().data('value'));
   LocalStorageStore(this.value,"0");
   LocalStorageList();
});
