/*OverPassAPI overlay*/
BeerList = new Array();
BeerName = new Array();

	var tous = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];(node(BBOX)[amenity=bar];node(BBOX)[amenity=cafe];node(BBOX)[amenity=biergarten];node(BBOX)[microbrewery=yes];node(BBOX)['brewery'];node(BBOX)[amenity=pub]);out;>;out;", "assets/img/beer1.png");
    
    BeerList["leffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[lL]effe'];out;", "assets/img/beer2.png"); 
    BeerName["leffe"] = "Leffe";	
    BeerList["chouffe"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[cC]houffe'];out;", "assets/img/beer4.png");  
    BeerName["chouffe"] = "Chouffe";	
    BeerList["chimay"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Cc]himay'];out;", "assets/img/beer1.png");  
	BeerName["chimay"] = "Chimay";	
    BeerList["guinness"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Gg]uinness'];out;", "assets/img/beer1.png");  
   BeerName["guinness"] = "Guinness";	
	BeerList["brewdog"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[Bb]rewdog'];out;", "assets/img/beer1.png");  
   BeerName["brewdog"] = "Brewdog";	
	BeerList["affligem"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[aA]ffligem'];out;", "assets/img/affligem.png");  
	BeerName["affligem"] = "Affligem";	
    BeerList["karmeliet"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[tT]ripel_[kK]armeliet'];out;", "assets/img/beer3.png");
    BeerName["karmeliet"] = "Karmeliet";
    BeerList["amstel"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[aA]mstel'];out;", "assets/img/beer3.png");
    BeerName["amstel"] = "Amstel";
    BeerList["carlsberg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[cC]Carlsberg'];out;", "assets/img/beer3.png");
    BeerName["carlsberg"] = "Carlsberg";
    BeerList["fischer"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[fF]ischer'];out;", "assets/img/beer3.png");
    BeerName["fischer"] = "Fischer";
    BeerList["heineken"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[hH]eineken'];out;", "assets/img/beer3.png");
    BeerName["heineken"] = "Heineken";
    BeerList["pelforth"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[pP]elforth'];out;", "assets/img/beer3.png");
    BeerName["pelforth"] = "Pelforth";
    BeerList["kronembourg"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[kK]ronembourg'];out;", "assets/img/beer3.png");
    BeerName["kronembourg"] = "Kronembourg";
    BeerList["grimbergen"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'[gG]rimbergen'];out;", "assets/img/beer3.png");
    BeerName["grimbergen"] = "Grimbergen";
    BeerList["1664"] = draw_beer("https://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)['brewery'~'1664'];out;", "assets/img/beer3.png");
    BeerName["1664"] = "1664";
//les fonctions utilisées pour récupérer les données et les placer sont dans BeerLayer.js
