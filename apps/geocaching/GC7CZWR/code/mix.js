$(function(){

	var color1 = [238,219,107];
	var color2 = [224,162,119];
	var color3 = [59,0,0];
	var pows = [1, 3, 28];
	var mix = [];

	// 1 bouteille
	// 0,25l	1/3b	3 chopines BLANC
	
	// 3 bouteilles
	// 0,75l	1b		1 bouteille ROSE
	// 1,5l		2b		1 magnum ROSE

	// 28 bouteilles
	// 1,5l		2b		2 magnums ROUGE
	// 3l 		4b		1 jéroboam ROUGE
	// 6l		8b		1 mathusalem ROUGE
	// 9l		12b		1 salmanazar ROUGE

	var final = '81 23 15';


	var componentToHex = function(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}

	var rgbToHex = function(arr) {
	    return "#" + componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
	}

	var setColorView = function () {
		$('#color1 .colorView').css('background-color', 'rgb(' + color1[0] + ',' + color1[1] + ',' + color1[2] + ')');
		$('#color2 .colorView').css('background-color', 'rgb(' + color2[0] + ',' + color2[1] + ',' + color2[2] + ')');
		$('#color3 .colorView').css('background-color', 'rgb(' + color3[0] + ',' + color3[1] + ',' + color3[2] + ')');
		$('#colorMix .colorView').css('background-color', 'rgb(' + mix[0] + ',' + mix[1] + ',' + mix[2] + ')');
	}

	var setRvbValue = function () {
		$('#color1 .colorRVB').text(color1.join(','));
		$('#color2 .colorRVB').text(color2.join(','));
		$('#color3 .colorRVB').text(color3.join(','));
		$('#colorMix .colorRVB').text(mix.join(','));
	}

	var setHexaValue = function () {
		$('#color1 .colorHEXA').text(rgbToHex(color1));
		$('#color2 .colorHEXA').text(rgbToHex(color2));
		$('#color3 .colorHEXA').text(rgbToHex(color3));
		$('#colorMix .colorHEXA').text(rgbToHex(mix));
		
	}

	var bindEvents = function () {

		$('.range').on('change', function(){

			//debugger;

			if ($(this).hasClass('rangeR')) {
				eval($(this).closest('.aColor').attr('id'))[0] = parseInt($(this).val(), 10);
			}
			else if ($(this).hasClass('rangeV')) {
				eval($(this).closest('.aColor').attr('id'))[1] = parseInt($(this).val(), 10);
			}
			else if ($(this).hasClass('rangeB')) {
				eval($(this).closest('.aColor').attr('id'))[2] = parseInt($(this).val(), 10);
			}

			else if ($(this).hasClass('qte')) {
				var parentID = $(this).closest('.aColor').attr('id');
				if (parentID === 'color1') {
					pows[0] = parseFloat($(this).val());
				}
				else if (parentID === 'color2') {
					pows[1] = parseFloat($(this).val());
				}
				else if (parentID === 'color3') {
					pows[2] = parseFloat($(this).val());
				}
			}

			updateMix();

			setColorView();
			setRvbValue();
			setHexaValue();
				
			

		});

	}

	var updateMix = function() {

		var powTot = pows[0] + pows[1] + pows[2];
		
		mix = [];

		mix[0] = Math.ceil(((color1[0] * pows[0]) + (color2[0] * pows[1]) + (color3[0] * pows[2])) / powTot);
		mix[1] = Math.ceil(((color1[1] * pows[0]) + (color2[1] * pows[1]) + (color3[1] * pows[2])) / powTot);
		mix[2] = Math.ceil(((color1[2] * pows[0]) + (color2[2] * pows[1]) + (color3[2] * pows[2])) / powTot);
		/*
		mix[0] = (((color1[0] * pows[0]) + (color2[0] * pows[1]) + (color3[0] * pows[2])) / powTot);
		mix[1] = (((color1[1] * pows[0]) + (color2[1] * pows[1]) + (color3[1] * pows[2])) / powTot);
		mix[2] = (((color1[2] * pows[0]) + (color2[2] * pows[1]) + (color3[2] * pows[2])) / powTot);
		*/

	}

 
	var initRanges = function() {

		$('#color1 .rangeR').val(color1[0]);
		$('#color1 .rangeV').val(color1[1]);
		$('#color1 .rangeB').val(color1[2]);

		$('#color2 .rangeR').val(color2[0]);
		$('#color2 .rangeV').val(color2[1]);
		$('#color2 .rangeB').val(color2[2]);

		$('#color3 .rangeR').val(color3[0]);
		$('#color3 .rangeV').val(color3[1]);
		$('#color3 .rangeB').val(color3[2]);

		$('#color1 .qte').val(pows[0]);
		$('#color2 .qte').val(pows[1]);
		$('#color3 .qte').val(pows[2]);
	}

	var init = function () {
		updateMix();
		setColorView();
		setRvbValue();
		setHexaValue();
		initRanges();
		bindEvents();
	} () ;

});



