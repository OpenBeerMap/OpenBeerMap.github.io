/*
 OpenBeerMap Beerlist.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

/*OverpassAPI overlay > controls and form checkboxes */
BeerList = new Array();
BeerName = new Array();
BeerImage = new Array();

	var tous = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];way(BBOX)[amenity=bar];node(BBOX)[amenity=cafe];way(BBOX)[amenity=cafe];node(BBOX)[amenity=biergarten];node(BBOX)[microbrewery=yes];node(BBOX)['brewery'];way(BBOX)['brewery'];node(BBOX)[amenity=pub];way(BBOX)[amenity=pub]);out center;>;out;", "assets/img/beer1.png");
   //
    BeerName["leffe"] = "Leffe";
    BeerImage["leffe"] = "beer1";
    BeerList["leffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[lL]effe'];way(BBOX)['brewery'~'[lL]effe']);out center;", "assets/img/"+BeerImage['leffe']+".png"); 
    //
    //BeerImage["chouffe"] = "beer4";
	BeerImage["chouffe"] = "beers/chouffe";
    BeerName["chouffe"] = "Chouffe";
    BeerList["chouffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[cC]houffe'];way(BBOX)['brewery'~'[cC]houffe']);out center;", "assets/img/"+BeerImage['chouffe']+".png");
    //
    BeerName["chimay"] = "Chimay";	
    BeerImage["chimay"] = "beer4";
    BeerList["chimay"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[Cc]himay'];way(BBOX)['brewery'~'[Cc]himay']);out center;", "assets/img/"+BeerImage['chimay']+".png");  
    //
    BeerName["guinness"] = "Guinness";
    //BeerImage["guinness"] = "beer1";
	BeerImage["guinness"] = "beers/guinness";
    BeerList["guinness"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[Gg]uinness'];way(BBOX)['brewery'~'[Gg]uinness']);out;", "assets/img/"+BeerImage['guinness']+".png");
    //
    BeerImage["brewdog"] = "beer1";
    BeerName["brewdog"] = "Brewdog";
    BeerList["brewdog"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[Bb]rewdog'];way(BBOX)['brewery'~'[Bb]rewdog']);out center;", "assets/img/"+BeerImage['brewdog']+".png");  
    //
    BeerImage["affligem"] = "beers/affligem";
    BeerName["affligem"] = "Affligem";	
	 BeerList["affligem"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[aA]ffligem'];way(BBOX)['brewery'~'[aA]ffligem']);out center;", "assets/img/"+BeerImage['affligem']+".png");
    //
    //BeerImage["tripel_karmeliet"] = "beer3";
	BeerImage["tripel_karmeliet"] = "beers/karmeliet";
    BeerName["tripel_karmeliet"] = "Tripel Karmeliet";
    BeerList["tripel_karmeliet"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[tT]ripel_[kK]armeliet'];way(BBOX)['brewery'~'[tT]ripel_[kK]armeliet']);out center;", "assets/img/"+BeerImage['tripel_karmeliet']+".png");
    //
    //BeerImage["kwak"] = "beer3";
	BeerImage["kwak"] = "beers/kwak";
    BeerName["kwak"] = "Kwak";
    BeerList["kwak"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[kK]wak'];way(BBOX)['brewery'~'[kK]wak']);out center;", "assets/img/"+BeerImage['kwak']+".png");
    //
    BeerImage["amstel"] = "beer3";
    BeerName["amstel"] = "Amstel";
    BeerList["amstel"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[aA]mstel'];way(BBOX)['brewery'~'[aA]mstel']);out center;", "assets/img/"+BeerImage['amstel']+".png");
    //
    BeerImage["carlsberg"] = "beer3";
    BeerName["carlsberg"] = "Carlsberg";
    BeerList["carlsberg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[cC]Carlsberg'];way(BBOX)['brewery'~'[cC]Carlsberg']);out center;", "assets/img/"+BeerImage['carlsberg']+".png");
    //
    BeerImage["fischer"] = "beer3";
    BeerName["fischer"] = "Fischer";
    BeerList["fischer"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[fF]ischer'];way(BBOX)['brewery'~'[fF]ischer']);out center;", "assets/img/"+BeerImage['fischer']+".png");
    //
    BeerImage["heineken"] = "beer3";
    BeerName["heineken"] = "Heineken";
    BeerList["heineken"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[hH]eineken'];way(BBOX)['brewery'~'[hH]eineken']);out center;", "assets/img/"+BeerImage['heineken']+".png");
    //
    BeerImage["pelforth"] = "beer3";
    BeerName["pelforth"] = "Pelforth";
    BeerList["pelforth"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[pP]elforth'];way(BBOX)['brewery'~'[pP]elforth']);out center;", "assets/img/"+BeerImage['pelforth']+".png");
    //
    BeerImage["kronembourg"] = "beer3";
    BeerName["kronembourg"] = "Kronembourg";
    BeerList["kronembourg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[kK]ronembourg'];way(BBOX)['brewery'~'[kK]ronembourg']);out center;", "assets/img/"+BeerImage['kronembourg']+".png");
    //
    BeerImage["grimbergen"] = "beer3";
    BeerName["grimbergen"] = "Grimbergen";
    BeerList["grimbergen"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[gG]rimbergen'];way(BBOX)['brewery'~'[gG]rimbergen']);out center;", "assets/img/"+BeerImage['grimbergen']+".png");
    //
    BeerImage["1664"] = "beer3";
    BeerName["1664"] = "1664";
    BeerList["1664"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'1664'];way(BBOX)['brewery'~'1664']);out center;", "assets/img/"+BeerImage['1664']+".png");
//les fonctions utilisées pour récupérer les données et les placer sont dans BeerLayer.js
