/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

/* autocomplete beer - setup form */ 
$("#setupAddFavoriteInput").autocomplete({
    source: function(request, response){
        $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php?",
            dataType: "jsonp",
            data: {
                q: request.term
            },
            success: function(data){
                var list = [];
                for(var i = 0 ; i < data.length ; i++)
                {
                    if(data[i].Beername && data[i].Beername !== undefined)
                    {
                        list.push({
                            value : data[i].BeerTag,
                            label : data[i].BeerTag,
                            image : data[i].ImageName ? data[i].ImageName : "beer1.png"
                        });
                    }
                }
                response(list);
            }
        });
    },
    minLength: 3,
    select: function(event, ui){
        $('#beersearchmetadata').val(ui.item.image);
//         $("#setupAddFavoriteButton").click();
    }
});


$("#setupAddFavoriteButton").click(function(){
    if($('#setupAddFavoriteInput').val() != '')
    {
        add_favorite($('#setupAddFavoriteInput').val());
        update_setup_list();
        $("#setupAddFavoriteInput").val('');
    }
});


/* autocomplete beer - bar edit form */
$("#editAddBeerInput").autocomplete({
    source: function(request, response){
        $.ajax({
            url: "http://openbeermap.wc.lt/json_hostinger.php",
            dataType: "jsonp",
            data: {
                q: request.term
            },
            success: function(data){
                //console.log(data);
                var list = [];
                for(var i = 0 ; i < data.length ; i++)
                {
                    if(data[i].Beername && data[i].Beername !== undefined)
                    {
                        list.push(data[i].BeerTag);
                    }
                }
                response(list);
            }
        });
    },
    minLength: 3
});

$('#editAddBeerButton').on('click', function(){
    if($('#editAddBeerInput').val() != '')
    {
        var i = $("#editBeersListManual label").size() + 1;
        $('#editBeersListManual').append('<div class="checkbox"><input name="editBeer" id="editBeersListManual-' + i + '" value="' + $('#editAddBeerInput').val() + '" type="checkbox" name="beer" checked><label for="editBeersListManual-' + i + '">' +  $('#editAddBeerInput').val() + '</label></div>');
        $('#editAddBeerInput').val('');
    }
});