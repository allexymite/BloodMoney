 /* BloodMoney--an opportunity cost converter extension for Chrome.
    Copyright (C) {year}  {name of author}

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>. */


/* TO-DO:
	*preserve punctuation on replacement
    *add more denoms

*/
$(document).ready(function(){
    moneys = [];
    var re = /[\$£][\d,\.]+\d/g;
    $('body').find('*').each(function() { //find everything inside the body
    	var text = $(this).text();
    	do {
    		result = re.exec(text);
        	if (result != null)
        		moneys.push(result);
    	} while (result != null);
	});              
    console.log(moneys);
    
    var denoms = [], topush = "", stripd, money, numval;
    $.each(moneys, function(i, el){ //convert everything
        money = el[0];
        if (/£/.test(money)) var pounds = true;
        if (/€/.test(money)) var euros = true;
        stripd = money.replace(/[$£€,]/g, ''); //removes unwanted characters for float conversion. Applies only to UK and US.
        numval = parseFloat(stripd); 
        if (pounds) numval *= 1.53;
        if (euros) numval *= 1.12; //money.js later
        denoms[0] = Math.floor(numval/800); //dead children
        denoms[1] = (numval%800)/200; //dead puppies
        console.log(denoms[0]);
        //todo: add other denoms
        if (denoms[0]>0){  //if we have a whole baby
        	topush += denoms[0] + " dead ";
            if (denoms[0]<=1) {
                topush += "child"
            }
            else {topush += "children"}
            	if (denoms[1]>0) topush += ", ";
        }
        if (denoms[1]>0) //if we have a whole puppy
        	topush += denoms[1] + " dead ";
        	if (denoms[1]<=1){ topush += "puppy " }
        	else { topush += "puppies " }
        el.push(topush);
        console.log(el);
    });
    var catchin = 0 //catch index for the following:
    $('body').find('*').each(function() {
    	var text = $(this).text();
        $(this).text(text.replace(re, moneys[catchin][1]));
        catchin += 1;
        
    });
});

