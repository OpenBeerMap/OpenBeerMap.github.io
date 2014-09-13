/*
 OpenBeerMap Beerlist.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

/*OverpassAPI overlay > controls and form checkboxes */
BeerList = new Array();
BeerName = new Array();
BeerImage = new Array();

	var tous = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];node(BBOX)[amenity=cafe];node(BBOX)[amenity=biergarten];node(BBOX)[microbrewery=yes];node(BBOX)['brewery'];node(BBOX)[amenity=pub]);out;>;out;", "assets/img/beer1.png");
   //
    BeerName["leffe"] = "Leffe";
    BeerImage["leffe"] = "beer1";
    BeerList["leffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[lL]effe'];out;", "assets/img/"+BeerImage['leffe']+".png"); 
    //
    BeerImage["chouffe"] = "beer4";
	//BeerImage["chouffe"] = "beers/chouffe";
    BeerName["chouffe"] = "Chouffe";
    BeerList["chouffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[cC]houffe'];out;", "assets/img/"+BeerImage['chouffe']+".png");
    //
    BeerName["chimay"] = "Chimay";	
    BeerImage["chimay"] = "beer4";
    BeerList["chimay"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Cc]himay'];out;", "assets/img/"+BeerImage['chimay']+".png");  
    //
    BeerName["guinness"] = "Guinness";
    BeerImage["guinness"] = "beer1";
	//BeerImage["guinness"] = "beers/guinness";
    BeerList["guinness"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Gg]uinness'];out;", "assets/img/"+BeerImage['guinness']+".png");
    //
    BeerImage["brewdog"] = "beer1";
    BeerName["brewdog"] = "Brewdog";
    BeerList["brewdog"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Bb]rewdog'];out;", "assets/img/"+BeerImage['brewdog']+".png");  
    //
    BeerImage["affligem"] = "beers/affligem";
    BeerName["affligem"] = "Affligem";	
	 BeerList["affligem"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[aA]ffligem'];out;", "assets/img/"+BeerImage['affligem']+".png");
    //
    BeerImage["tripel_karmeliet"] = "beer3";
	//BeerImage["tripel_karmeliet"] = "beers/karmeliet";
    BeerName["tripel_karmeliet"] = "Tripel Karmeliet";
    BeerList["tripel_karmeliet"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[tT]ripel_[kK]armeliet'];out;", "assets/img/"+BeerImage['tripel_karmeliet']+".png");
    //
    BeerImage["kwak"] = "beer3";
	//BeerImage["kwak"] = "beers/kwak";
    BeerName["kwak"] = "Kwak";
    BeerList["kwak"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[kK]wak'];out;", "assets/img/"+BeerImage['kwak']+".png");
    //
    BeerImage["amstel"] = "beer3";
    BeerName["amstel"] = "Amstel";
    BeerList["amstel"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[aA]mstel'];out;", "assets/img/"+BeerImage['amstel']+".png");
    //
    BeerImage["carlsberg"] = "beer3";
    BeerName["carlsberg"] = "Carlsberg";
    BeerList["carlsberg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[cC]Carlsberg'];out;", "assets/img/"+BeerImage['carlsberg']+".png");
    //
    BeerImage["fischer"] = "beer3";
    BeerName["fischer"] = "Fischer";
    BeerList["fischer"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[fF]ischer'];out;", "assets/img/"+BeerImage['fischer']+".png");
    //
    BeerImage["heineken"] = "beer3";
    BeerName["heineken"] = "Heineken";
    BeerList["heineken"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[hH]eineken'];out;", "assets/img/"+BeerImage['heineken']+".png");
    //
    BeerImage["pelforth"] = "beer3";
    BeerName["pelforth"] = "Pelforth";
    BeerList["pelforth"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[pP]elforth'];out;", "assets/img/"+BeerImage['pelforth']+".png");
    //
    BeerImage["kronembourg"] = "beer3";
    BeerName["kronembourg"] = "Kronembourg";
    BeerList["kronembourg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[kK]ronembourg'];out;", "assets/img/"+BeerImage['kronembourg']+".png");
    //
    BeerImage["grimbergen"] = "beer3";
    BeerName["grimbergen"] = "Grimbergen";
    BeerList["grimbergen"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[gG]rimbergen'];out;", "assets/img/"+BeerImage['grimbergen']+".png");
    //
    BeerImage["1664"] = "beer3";
    BeerName["1664"] = "1664";
    BeerList["1664"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'1664'];out;", "assets/img/"+BeerImage['1664']+".png");
    // Coucou !
    BeerImage["rebelred"] = "beer4";
    BeerName["rebelred"] = "Rebel Red";
    BeerList["rebelred"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[rR]ebel red'];out;", "assets/img/"+BeerImage['rebelred']+".png");
//les fonctions utilisées pour récupérer les données et les placer sont dans BeerLayer.js
