/*
 OpenBeerMap Beerlist.js | noemie.lehuby(at)gmail.com, Poilou | MIT Licensed
*/

/*OverpassAPI overlay > controls and form checkboxes */
BeerList = new Array();
BeerName = new Array();
BeerImage = new Array();

	var tous = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];way(BBOX)[amenity=bar];node(BBOX)[amenity=cafe]['cuisine'!='coffee_shop'];way(BBOX)[amenity=cafe]['cuisine'!='coffee_shop'];node(BBOX)[amenity=biergarten];node(BBOX)[microbrewery=yes];node(BBOX)['brewery'];way(BBOX)['brewery'];node(BBOX)[amenity=pub];way(BBOX)[amenity=pub]);out center;>;out;", "assets/img/beer1.png");
    
	//
	BeerImage["chouffe"] = "beers/chouffe.png";
    BeerName["chouffe"] = "Chouffe";
    BeerList["chouffe"] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[cC]houffe'];way(BBOX)['brewery'~'[cC]houffe']);out center;", "assets/img/"+BeerImage['chouffe']);
    //
    BeerImage["guinness"] = "beers/guinness.png";
    BeerName["guinness"] = "Guinness";
    BeerList["guinness"] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[Gg]uinness'];way(BBOX)['brewery'~'[Gg]uinness']);out;", "assets/img/"+BeerImage["guinness"]);
    //
    BeerImage["affligem"] = "beers/affligem.png";
    BeerName["affligem"] = "Affligem";	
	 BeerList["affligem"] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[aA]ffligem'];way(BBOX)['brewery'~'[aA]ffligem']);out center;", "assets/img/"+BeerImage['affligem']);
    //
	BeerImage["tripel_karmeliet"] = "beers/karmeliet.png";
    BeerName["tripel_karmeliet"] = "Tripel Karmeliet";
    BeerList["tripel_karmeliet"] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[tT]ripel[ _][kK]armeliet'];way(BBOX)['brewery'~'[tT]ripel_[kK]armeliet']);out center;", "assets/img/"+BeerImage['tripel_karmeliet']);
    //
    BeerImage["kwak"] = "beers/kwak.png";
    BeerName["kwak"] = "Kwak";
    BeerList["kwak"] = draw_beer("//overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[kK]wak'];way(BBOX)['brewery'~'[kK]wak']);out center;", "assets/img/"+BeerImage['kwak']);

// D'autres bières sont ajoutées à ces trois listes à partir de localStorage.js
// _ au chargement de la page, à partir des éléments présents dans le localStorage
// _ à l'ajout d'éléments dans le localStorage

//les fonctions utilisées pour récupérer les données et les placer sont dans BeerLayer.js


/*    //
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
    BeerImage["kronenbourg"] = "beer3";
    BeerName["kronenbourg"] = "Kronenbourg";
    BeerList["kronenbourg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[kK]rone[nm]bourg'];way(BBOX)['brewery'~'[kK]rone[mn]bourg']);out center;", "assets/img/"+BeerImage['kronenbourg']+".png");
    //
    BeerImage["grimbergen"] = "beer3";
    BeerName["grimbergen"] = "Grimbergen";
    BeerList["grimbergen"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[gG]rimbergen'];way(BBOX)['brewery'~'[gG]rimbergen']);out center;", "assets/img/"+BeerImage['grimbergen']+".png");
    //
    BeerImage["1664"] = "beer3";
    BeerName["1664"] = "1664";
    BeerList["1664"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'1664'];way(BBOX)['brewery'~'1664']);out center;", "assets/img/"+BeerImage['1664']+".png");  
	// 
    BeerImage["rebelred"] = "beer4";
    BeerName["rebelred"] = "Rebel Red";
	BeerList["rebelred"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)['brewery'~'[rR]ebel red'];way(BBOX)['brewery'~'[rR]ebel red']);out center;", "assets/img/"+BeerImage['rebelred']+".png");
*/ 




