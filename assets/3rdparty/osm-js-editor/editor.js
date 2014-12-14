/*
 OpenBeerMap OSM_js_editor.js | noemie.lehuby(at)gmail.com | MIT Licensed
Éditeur OSM dans la Leaflet sidebar */

//les fonctions de manipulation de l'API OSM sont dans api.js

$(document).ready(function(){
    $("#editButtonSave").click(function(){
        send_form_content(editForm);
    });
});

function init_form_from_OSM(osmType, osmId)
{
    //Fetch current values
    var osmXml = get_node_or_way(osmId, osmType);

    var sourceBeers = get_tag(osmXml, "brewery").toLowerCase();

    //Add already known beers to form
    complete_form_with_already_mapped_beers(get_tag(osmXml, "brewery"));

    var name = get_tag(osmXml, "name");
    if(name === "undefined")
    {
        name = "";
    }
    var openingHours = get_tag(osmXml, "opening_hours");
    if(openingHours === "undefined")
    {
        openingHours = "";
    }
    var happyHours = get_tag(osmXml, "happy_hours");
    if(happyHours === "undefined")
    {
        happyHours = "";
    }
    var wifi = get_tag(osmXml, "internet_access").toLowerCase();
    var otherBeer = get_tag(osmXml, "brewery:note");
    if(otherBeer === "undefined")
    {
        otherBeer = "";
    }

    //Write values to form
    document.getElementById('editOsmType').value = osmType;
    document.getElementById('editOsmId').value = osmId;
    document.getElementById('editName').value = name;
    document.getElementById('editOpeningHours').value = openingHours;
    document.getElementById('editHappyHours').value = happyHours;
    //Set link to edit entry directly in OSM
    document.getElementById("editOsmLink").href = "http://www.openstreetmap.org/edit?editor=id&" + osmType + "=" + osmId.toString();
    //Other beer in free text field
    document.getElementById('editAddBeerInput').value = otherBeer;
    //Disable all radios buttons (wifi)

    $("#editBeersListManual").empty();
    $("[name=editBeer]").each(function(){
        $(this).prop("checked", sourceBeers.indexOf($(this).val().toLowerCase()) > -1)
    });
    var wifiCheckArray = {"wlan": "yes", "yes": "yes", "undefined": "unknown", "no": "no"};
    $("[name=editWifi]").parent().removeClass("active");
    $("[name=editWifi][value=" + wifiCheckArray[wifi] + "]").prop("checked", true).parent().addClass("active");
}

function send_form_content(form)
{
    var osmId = document.getElementById('editOsmId').value;
    var osmType = document.getElementById('editOsmType').value;

    var osmXml = get_node_or_way(osmId, osmType);
    var beers = get_tag(osmXml, "brewery").split(';');
    
    //Get user edited values
    var name = document.getElementById('editName').value
    var openingHours = document.getElementById('editOpeningHours').value
    var happyHours = document.getElementById('editHappyHours').value
    var inputForm = form.getElementsByTagName("input"); 
    var otherBeer = document.getElementById('editAddBeerInput').value
    $("[name=editBeer]").each(function(){
        if($(this).prop("checked") && beers.indexOf($(this).val()) === -1)
        {
            beers.push($(this).val());
        }
        else if(!$(this).prop("checked"))
        {
            beers.del($(this).val());
        }  
    });
    var wifi = $("[name=editWifi]:checked").val();
            
    beers.del("undefined")
	
    var brewery = beers.join(";");
    
    var send = 0;


    if(beers.length)
    {
        edit_tag(osmXml, osmType, "brewery", brewery);
        // FIXME empty send : node/way is sent even if no beers have changed as long as there are beers
        send = 1;
    }
    else if((brewery != get_tag(osmXml, "brewery")) && (beers.length == 0))
    {//if beers is empty and has changed, delete tag
        del_tag(osmXml, "brewery");
        send = 2;
    }
    if(wifi != "unknown")
    {
        edit_tag(osmXml, osmType, "internet_access", wifi);
        send = 3;
    }
    else if(get_tag(osmXml, "internet_access") != "undefined")
    {
        del_tag(osmXml, "internet_access");
        send = 4;
    }
    if(name != get_tag(osmXml,"name") && name != "")
    {
        edit_tag(osmXml, osmType, "name", name);
        send = 5;
    }
    else if(get_tag(osmXml, "name") != "undefined" && name == "")
    {//If name is empty but wasn't previously, delete tag
        del_tag(osmXml, "name");
        send = 6;    
    }
    if(otherBeer != get_tag(osmXml,"brewery:note") && otherBeer != "")
    {
        edit_tag(osmXml,osmType, "brewery:note", otherBeer);
        send = 7;
    }
    /*
    if(openingHours != get_tag(osmXml, "editOpeningHours") && opening != "")
    {
        edit_tag(osmXml, osmType, "editOpeningHours", opening);
        send = 1;
    }
    if(happy != get_tag(osmXml,"editHappyHours") && happy != "")
    {
        edit_tag(osmXml, osmType, "editHappyHours", happy);
        send = 1;
    }
    */
    console.log(send)
	//if needed, send modified XML to OSM
    if(send != 0)
    {
        //Open changeset
        changeset_id = put_changeset();
        //Send new node/way
        put_node_or_way(osmXml, changeset_id, osmId, osmType);
        //Close changeset
        close_changeset(changeset_id);
    }
    //Update popup content
    $(".leaflet-popup:visible .mapPopupBeersList").text(brewery.replace(/;/g, ", "));
    //Hide sidebar
    sidebar.hide();
}

function complete_form_with_already_mapped_beers(sourceBeers)
{
    var htmlBeers = '';
    var array = sourceBeers.split(";");
    
    var favoriteBeers = get_favorites();
    
    for(var i = 0 ; i < array.length ; i++)
    {
        if(favoriteBeers.indexOf(array[i]) == -1)
        {
            if(array[i] != "undefined")
            {
                htmlBeers += '<div class="checkbox"><input type="checkbox" name="editBeer" id="editBeersListOSM-' + i + '" value="' + array[i] + '"><label for="editBeersListOSM-' + i + '">' + array[i] + '</label></div>';
            }
        }
        else
        {
            $("#editBeersListLocal input").each(function(){
                if($(this).val() == array[i])
                {
                    $(this).prop("checked", true);
                }
            });
        }
    }
    document.getElementById('editBeersListOSM').innerHTML = htmlBeers;
}