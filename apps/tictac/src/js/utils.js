/**
 * Fichier de Fonctions utiles
 */

function isTouchDevice() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;
  }  
}

/**
* Encode toutes les entités HTML
*/
function htmlEncode(value){
  return $('<div/>').text(value).html();
}

/**
* Decode toutes les entités HTML
*/
function htmlDecode(value){
  return $('<div/>').html(value).text();
}


/**
* Donne la position absolue par rapport au document d'un élément
*/
function findPos(obj) {
	var curleft = obj.offsetLeft || 0;
	var curtop = obj.offsetTop || 0;
	while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
	}
	return {x:curleft,y:curtop};
}


function getObjectLength(obj) {
	var count = 0;
	for( var i in obj ) {
		count++;
	}
	return count;
}

/**
 * in_array() recherche needle  dans collection et retourne TRUE s'il s'y trouve, ou FALSE sinon.
 * 
 * Le troisième paramètre strict est optionnel. S'il vaut TRUE alors in_array() vérifiera aussi 
 * que le type du paramètre needle correspond au type de la valeur trouvée dans collection.
 * 
 * @param mixed needle
 * @param array collection
 * @param bool  strict (optionnel)
 * @return bool
 */
function in_array(needle, collection, strict) {
    
    if (strict == null) {
        strict = false;
    }
    
    var i = collection.length-1;
    
    if (i >= 0) {
        
        do {
            if (collection[i].toLowerCase() == needle.toLowerCase()) {
                
                if (strict && typeof(collection[i]) != typeof(needle)) {
                    continue;
                }
                
                return true;
            }
        } while (i--);
    }
    
    return false;
}

function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange(); //Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); //get the selection object (allows you to change selection)
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make the range you have just created the visible selection

    }
    else if (document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        range.select(); //Select the range (make it the visible selection
    }
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

/**
* Browser Detection
*/
function detectBrowserVersion() {

	var arrayResult = {};

    var userAgent = navigator.userAgent.toLowerCase();
    var version = 0;

    isChrome = false;
    if (navigator.userAgent.indexOf("Chrome") > -1) { isChrome = true; }

    if (navigator.userAgent.indexOf("Firefox") > -1) { arrayResult['browser'] = 'Firefox'; }
    if (navigator.userAgent.indexOf("Opera") > -1) { arrayResult['browser'] = 'Opera'; }
    if (navigator.userAgent.indexOf("MSIE") > -1) { arrayResult['browser'] = 'MSIE'; }
    if (navigator.userAgent.indexOf("Chrome") > -1) { arrayResult['browser'] = 'Chrome'; }
    if ((navigator.userAgent.indexOf("Safari") > -1) && (isChrome == false)) { arrayResult['browser'] = 'Safari'; }

    var browser = arrayResult['browser'];

    // Is this a version of IE?
    if (browser == 'MSIE') {
        version = getInternetExplorerVersion();
    }

    // Is this a version of Chrome?
    if (browser == 'Chrome') {
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
    }

    // Is this a version of Safari?
    if (browser == 'Safari') {
        userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
    }

    // Is this a version of Mozilla?
    if (browser == 'Firefox') {
        
        //Is it Firefox?
        if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
            userAgent = userAgent.substring(0, userAgent.indexOf('.'));
            version = userAgent;
        }
        // If not then it must be another Mozilla
        else {

        }
    }

    // Is this a version of Opera?
    if (browser == 'Opera') {
        userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
    }

    arrayResult['browserversion'] = version;
    

    return arrayResult;
}

function strip_tags(input, allowed) {

    // Strips HTML and PHP tags from a string  
    // *     example 1: strip_tags('<p>Kevin</p> <b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    
    allowed = (((allowed || "") + "")
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var reg = /(<\/?([a-z][a-z0-9]*)\b[^>]*>)/gi;
    return input.replace(reg, function ($0, $1, $2) {
        return allowed.indexOf('<' + $2.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

// VERIFIE QU'UNE CHAINE EST BIEN UNE URL
function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);
}

// GET DOMAIN NAME
function fnGetDomain(url) {
   return url.match(/:\/\/(.[^/]+)/)[1];
}



function createCookie(name,value,hours) {
	if (hours) {
		var date = new Date();
		date.setTime(date.getTime()+(hours*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var konsole = {};
konsole.log = function(s) {
	if (typeof (console) != 'undefined') {
		return console.log(s);
  }
}

function getNextHighestZindex(obj){  
    /*
		var highestIndex = 0;  
    var currentIndex = 0;  
    var elArray = Array();  
    if(obj){ elArray = obj.getElementsByTagName('*'); }else{ elArray = document.getElementsByTagName('*'); }  
    for(var i=0; i < elArray.length; i++){  
		currentIndex = $(elArray[i]).css('z-index');		
      if($(elArray[i]).css('z-index') != 'auto' && currentIndex > highestIndex){ highestIndex = currentIndex; }
    } 
		
    return(highestIndex+1);  ²
		*/
		/*
	var highestZ;
	var onefound = false;
	var divs = document.getElementsByTagName('*');
	if( ! divs.length ) { return (highestZ+1); }
	for( var i=0; i<divs.length; i++ ) {
		if( divs[i].style.zIndex ) {
			if( ! onefound ) { 
				highestZ = parseInt(divs[i].style.zIndex);
				onefound = true;
			}
			else {
				var ii = parseInt(divs[i].style.zIndex);
				if( ii > highestZ ) { highestZ = ii; }
			}
		}
	}
	return (highestZ+1);
	*/

	var highestZ = 1;
	var onefound = false;
	var divs = document.getElementsByTagName('*');
	var z;
	for( var i=0; i<divs.length; i++ ) {
		z = parseInt(window.getComputedStyle(divs[i]).zIndex);

		if( z > 0 ) {
			if( ! onefound ) { 
				highestZ = z;
				onefound = true;
			}
			else {
				var ii = z;
				if( ii > highestZ ) { highestZ = ii; }
			}
		}
	}
	return (highestZ+1);
}

function reformatDate(dateStr) {
	dArr = dateStr.split("-");  // ex input "2010-01-18"
	return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/2010"
}

function reformatDateToUTC(dateStr) {
	dArr = dateStr.split("/");  // ex input "2010-01-18"
	return dArr[2]+ "-" +dArr[1]+ "-" +dArr[0] + "T00:00:00"; //ex out: "18/01/2010"
}

$.fn.getCursorPosition = function(){
    if(this.lengh == 0) return -1;
    return $(this).getSelectionStart();
}

$.fn.setCursorPosition = function(position){
	if(this.lengh == 0) return this;
	return $(this).setSelection(position, position);
}

$.fn.setCursorPosition = function(position){
    if(this.lengh == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.lengh == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.getSelectionEnd = function(){
    if(this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveStart('character', -input.value.length);
        if (r.text == '')
        pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if(typeof(input.selectionEnd)!="undefined")
    pos = input.selectionEnd;

    return pos;
}


$.fn.getSelectionStart = function(){
    if(this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
        pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if(typeof(input.selectionStart)!="undefined")
    pos = input.selectionStart;

    return pos;
}


function formatXml (xml) {
    var reg = /(>)(<)(\/*)/g;
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
    var transitions = {
        'single->single': 0,
        'single->closing': -1,
        'single->opening': 0,
        'single->other': 0,
        'closing->single': 0,
        'closing->closing': -1,
        'closing->opening': 0,
        'closing->other': 0,
        'opening->single': 1,
        'opening->closing': 0,
        'opening->opening': 1,
        'opening->other': 1,
        'other->single': 0,
        'other->closing': -1,
        'other->opening': 0,
        'other->other': 0
    };

    for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];
        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';

        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '\t';
        }
        if (fromTo == 'opening->closing')
            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
        else
            formatted += padding + ln + '\n';
    }

    return formatted;
};


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}


/**
* @function: getBytesWithUnit()
* @purpose: Converts bytes to the most simplified unit.
* @param: (number) bytes, the amount of bytes
* @returns: (string)
*/
var getFileSizeWithUnit = function( bytes , lang) {

	if( isNaN( bytes ) ){ return; }

	var units;

	if(typeof lang == 'undefined' || lang == null || lang == '')
		lang = 'fr';

	if (lang == 'fr') {
		units = [ ' octets', ' Ko', ' Mo', ' Go', ' To', ' Po', ' Eo', ' Zo', ' Yo' ];
	} else {
		units = [ ' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];
	}

	var amountOf2s = Math.floor( Math.log( +bytes )/Math.log(2) );
	if( amountOf2s < 1 ){
		amountOf2s = 0;
	}
	var i = Math.floor( amountOf2s / 10 );
	bytes = +bytes / Math.pow( 2, 10*i );
	
	// Rounds to 3 decimals places.
    if( bytes.toString().length > bytes.toFixed(1).toString().length ){
        bytes = bytes.toFixed(1);
    }

	return bytes + units[i];
};


/**
* @function: iSNullEmptyOrUndefined()
* @param: (string) 
* @returns: (boolean)
*/

function isNullEmptyOrUndefined(s) {
	if (s == '' || s == '' || typeof(s) == 'undefined') {
		return true;
	}
	else {
		return false;
	}
}


/**
* @function: hasValue()
* @param: (string)
* @returns: (boolean)
*/
function hasValue (s) {
	// TODO : WARNING si on teste false,  la fn renvoie false
	//return (typeof(s) != 'undefined' && s != null && s != '');
	if (s === false) {return true;}
	if (s === 0) {return true;}
	return (typeof(s) != 'undefined' && s != null && s != '');
}

// Add indexOf for <IE9
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}

/**
* @function: arrayUnique()
* @param: (array)
* @returns: (array)
*/
function arrayUnique(array) {
    var newArray = array.concat();
    
		for(var i=0; i<newArray.length; ++i) {
        for(var j=i+1; j<newArray.length; ++j) {
            if(newArray[i] === newArray[j])
                newArray.splice(j--, 1);
        }
    }

    return newArray;
};




function countEvents(selector) {
    var allEvents = {};
    var elements = $(selector);

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var elemEvents = $._data(element, 'events');    

        for(key in elemEvents) {
            var elemEvent = elemEvents[key];
            var n = elemEvent.length;
        
            if (key in allEvents) {
                allEvents[key] = allEvents[key] + n;
            }
            else {
               allEvents[key] = n;
            }
        }
    }
    
    return allEvents;
}


function getEventsDetail(selector, returnType) {

    var allEvents = {};
    var elements = $(selector);
    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var elemEvents = $._data(element, 'events');
        
        if (elemEvents != undefined) {
            var tag = getTagAndAttributes(element);
            
            if (!(tag in allEvents)) {
                allEvents[tag] = {};
            }
                
            for (key in elemEvents) {
    
                var elemEvent = elemEvents[key];
                var n = elemEvent.length;
                var selectors = new Array();
                
                for (var y = 0; y < n; y++) {
                    selectors.push(elemEvent[y].selector);
                }
    
                if (key in allEvents[tag]) {
                    allEvents[tag][key].total = allEvents[tag][key].total + n;
                }
                else {
                    allEvents[tag][key] = {'total': n, 'domElem': $(element), 'selectors': selectors};
                }
            }
        }
    }

		if (!hasValue(returnType)) {
			return allEvents;
		} else {
			return JSON.stringify(allEvents);
		}
}

function getTagAndAttributes(element) {
    var result = '<' + element.tagName.toLowerCase();
    var attributes = $(element).context.attributes;
    var nbMax = 0;
        
    if ($(element).attr('id') != undefined) {
        result += ' id=' + $(element).attr('id');
        nbMax++;
    }

    if ($(element).attr('class') != undefined) {
        result += ' class=' + $(element).attr('class');
        nbMax++;
    }

    for (var i = 0; i < attributes.length & i < (2 - nbMax); i++) {
        if (attributes[i].nodeName != 'id' && attributes[i].nodeName != 'class')
            result += ' ' + attributes[i].nodeName + '=' + attributes[i].nodeValue;
    }
    
    result += '>';
    
    return result;
}

function isFunction(functionToCheck) {
	if (!(hasValue(functionToCheck)))
		return false;

	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}



function getYoutubeId (s) {
	var regEx = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
	var regexMatch = s.match(regEx);
	var m = regEx.exec(s);
	return m[1];
}

function checkYoutubeLink (s) {
	var regEx = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
	var regexMatch = s.match(regEx);
	return (s.match(regEx));
}

function dateTimeSqlToFr (s) {
	var _date = s.split(' ')[0];
	var _time = s.split(' ')[1];
	
	var dateFr = _date.split('-')[2] + '/' + _date.split('-')[1] + '/' + _date.split('-')[0];
	return dateFr + ' - ' + _time;
}

// HACK IE8 TO ADD .map
(function(fn){
    if (!fn.map) fn.map=function(f){var r=[];for(var i=0;i<this.length;i++)r.push(f(this[i]));return r}
    if (!fn.filter) fn.filter=function(f){var r=[];for(var i=0;i<this.length;i++)if(f(this[i]))r.push(this[i]);return r}
})(Array.prototype);

String.prototype.trimLeft = function(charlist) {
    if (charlist === undefined)
    charlist = "\s";
 
    return this.replace(new RegExp("^[" + charlist + "]+"), "");
};