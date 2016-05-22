/*
 OpenBeerMap main.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
 contributors : nlehuby, Maxime Corteel, Poilou (labiloute), tassoman
*/

//This method deletes a given value in an array
Array.prototype.del = function(val){
    var index = this.indexOf(val);
    if(index > -1)
    {
        this.splice(index, 1);
    }
}

// Encode special chars - useless so far but can be usefull later !
function fixed_encode_URI_component(str)
{
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c){
        return '%' + c.charCodeAt(0).toString(16);
    });
}

//Localize an array of elements
function localize(l10n, array)
{
    for(var i = 0 ; i < array.length ; i++)
    {
        try
        {
            var node = document.querySelector('[data-l10n-id=' + array[i] + ']');
            if(node != null)
            {
                node.textContent = l10n.entities[array[i]].value;
            }
        }
        catch(e)
        {
            console.log("ERROR: cannot translate string " + array[i]);
        }
    }
}

// Share to social networks by tassoman
function social_share(network)
{
    var intent;
    switch (network)
    {
        case 'diaspora':
            intent = 'https://sharetodiaspora.github.io/?title=Look%20at%20this%20OpenBeerMap!&url=';
            break;
        case 'twitter':
            intent = 'https://twitter.com/intent/tweet?text=Look%20at%20this%20OpenBeerMap!&hashtags=openbeermap,beer,osm&url='
            break;
        case 'facebook':
            intent = 'https://www.facebook.com/sharer/sharer.php?p[url]=';
            break;
        default:
            return false;
    }
    window.location.assign(intent + document.URL);
}