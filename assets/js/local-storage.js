/*
 OpenBeerMap localStorage.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
 contributors : nlehuby, Maxime Corteel, Poilou (labiloute)
*/

function get_favorites()
{
    var favoriteBeers = localStorage.getItem('favoriteBeers');
    return '' !== favoriteBeers ? favoriteBeers.split(";") : [];
}

// Onload func
function init_local_storage()
{
    if(localStorage.getItem('favoriteBeers') === null)
    {
        localStorage.clear();
        localStorage.setItem('favoriteBeers', "Guinness;Heineken");
        console.log("INFO: clearing localStorage for new system");
    }
    if(localStorage.getItem('favoriteBeers') === "")
    {
        localStorage.setItem('favoriteBeers', "Guinness;Heineken");
        console.log("INFO: resetting favorite beers with default ones");
    }

    var favoriteBeers = get_favorites();
    console.log("user has " + favoriteBeers.length + " favorite beer(s): '" + localStorage.getItem('favoriteBeers') + "'");

	init_layers(); //create the layers objets for the beers already in localStorage
    update_setup_list(); // displays localStorage items
    update_edit_list(); // update beers list in OSM form
    // Display/update txt notification - debug
    var favoriteBeers = get_favorites();
    document.getElementById('ResultLocalStorage').innerHTML = favoriteBeers.length;
}

//Create beer layer objects, in order to make properly work the removeLayer Leaflet function
function init_layers()
{
	var favoriteBeers = get_favorites();
	for(var i = 0 ; i < favoriteBeers.length ; i++)
		{
			element = favoriteBeers[i];
			img = get_beer_img(element);
		beerList[element] = draw_beer(overpassBaseUrl + "data=[out:json];(node(BBOX)[\"brewery\"~\""+element+"\",i];way(BBOX)[\"brewery\"~\""+element+"\",i];);out center;", "assets/img/beers/"+img, true);
    	}
}
//Create the bar edit form in the sidebar
function update_edit_list()
{
    var htmlBeers = '';
    var favoriteBeers = get_favorites();
    for(var i = 0 ; i < favoriteBeers.length ; i++)
    {
        htmlBeers += '<div class="checkbox"><input type="checkbox" name="editBeer" id="editBeersListLocal-' + i + '" value="' + favoriteBeers[i] + '"><label for="editBeersListLocal-' + i + '">' + favoriteBeers[i] + '</label></div>';
    }
    document.getElementById('editBeersListLocal').innerHTML = htmlBeers;
}

// Display the localStorage beers items in the modal
function update_setup_list()
{
    var favoriteBeers = get_favorites();
    if(favoriteBeers.length)
    {
        var list = '';
        for(var i = 0 ; i < favoriteBeers.length ; i++)
        {
            list += '<div><input type="checkbox" checked value="' + favoriteBeers[i] + '" id="setupFavoritesList-' + i + '" /><label for="setupFavoritesList-' + i + '">' + favoriteBeers[i] + '</label></div>';
        }
        $("#setupFavoritesList").html(list);
    }
    else
    {
        document.l10n.localize(['modal_setup_favorites_empty'], function(l10n){
            $("#setupFavoritesList").html('<p class="modal-setup-favorites-empty" data-l10n-id="modal_setup_favorites_empty">' + l10n.entities['modal_setup_favorites_empty'].value + '</p>');
       });
    }
    update_edit_list();
}

//add/remove beers items to localStorage
function add_favorite(value)
{
    var favoriteBeers = get_favorites();	
    
	if(favoriteBeers.indexOf(value) == -1)
    {
        favoriteBeers.push(value);
		img = get_beer_img(value);
		beerList[value] = draw_beer(overpassBaseUrl + "data=[out:json];(node(BBOX)[\"brewery\"~\"" + value + "\",i];way(BBOX)[\"brewery\"~\"" + value + "\",i];);out center;", "assets/img/beers/"+img, true);
    }
    else
    {
        favoriteBeers.del(value); 
		if(map.hasLayer(beerList[value]))
        {
            map.removeLayer(beerList[value]);
        }
        console.log('Removing ' + value + ' from favorite beers');
    }
    localStorage.setItem("favoriteBeers", favoriteBeers.join(";"));
	refresh_layers_list();
    update_edit_list();
}


// Reset localStorage 
function clear_favorites()
{
    var favoriteBeers = get_favorites();
    for(var i = 0 ; i < favoriteBeers.length ; i++)
    {
		element = favoriteBeers[i];
        if(map.hasLayer(beerList[element]))
        {
            map.removeLayer(beerList[element]);
        }
    }
    localStorage.setItem('favoriteBeers', "");
    update_setup_list();
    refresh_layers_list();
    update_edit_list();	
}

$(document).ready(function(){
   $("#setupClearFavorites").click(function(){
       document.l10n.localize(['modal_setup_confirm_clear'], function(l10n){
            if(confirm(l10n.entities['modal_setup_confirm_clear'].value))
            {
                clear_favorites();
            }
       });
   });
   $("#setupFavoritesList").on("click", "label", function(){
       add_favorite($(this).prev("input").val());
   });

});
