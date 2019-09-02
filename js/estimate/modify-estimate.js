var t = TrelloPowerUp.iframe();

var generalDiv = document.getElementById('generalDiv');	
var modifyCardButton = document.getElementById('modifyCardButton');

var quantityOfQuantities = 0;

var quantityChip = [];
var estimate = {};

var cardInfoKey = 'pappira.cardInfo';
var listId = '5a9ef0ce024c776a21220836';

t.render(function(){
	return t.get('card', 'shared', cardInfoKey)
	.then(function(cardInfo){
		modifyCardButton.addEventListener('click', updateEstimateCard);
	  if(cardInfo){
			estimate = deTranslateEstimate(JSON.parse( LZString.decompress(cardInfo)));
			createGeneralInformation(estimate);
		}
	});
});


var updateEstimate = function(){
	var quantity = [];
	for (var i = 0; i < quantityChip.length;i++){
		var input = document.getElementById(quantityChip[i]);
		if (input){
			quantity.push(input.getAttribute('quantity'));
		}
	}
	estimate.quantity = quantity;

	var newClossedSize = document.getElementById("clossedSize").value;
	
	//cambio los items que tenian el mismo openedSize que el viejo clossedsize
	estimate.items.filter(item => item.openedSize == estimate.clossedSize).forEach(item => item.openedSize[0] = newClossedSize);
	estimate.clossedSize = newClossedSize;

	estimate.prices = [];    

	var oldEstimate = JSON.parse(JSON.stringify(estimate));

	delete estimate.selectOption;
	delete estimate.comments;
	delete estimate.customer;
	delete estimate.optionalFinishesPrices;
	delete estimate.productionTime;
	delete estimate.selectedExtraPrices;

	addPrices(estimate);
	addExtraPrices(estimate);
	oldEstimate.prices = estimate.prices;
	return oldEstimate;
};


var focusOutOnQuantity = function(elementFocusedOut){
	if (elementFocusedOut.value.length > 0){
		var chip = createChip('quantityChip' + ++quantityOfQuantities,elementFocusedOut.value,['quantity'],[elementFocusedOut.value])
		var quantityChipsDiv = document.getElementById('quantityChipsDiv');	
		quantityChip.push('quantityChip' + quantityOfQuantities);
		quantityChipsDiv.appendChild(chip);
		elementFocusedOut.value = '';
	}
};

var createChip = function(chipId,chipText,attirbuteName,attributeValue){
	var div = document.createElement("div");
	div.setAttribute('class','chip');
	div.setAttribute('id',chipId);
	if(attirbuteName && attributeValue){
		for(var i = 0; i <attirbuteName.length;i++){
			div.setAttribute(attirbuteName[i],attributeValue[i]);
		}
	}
	div.append(chipText);
	var i = document.createElement("i");
	i.setAttribute('class','material-icons');
	i.append('close');
	div.appendChild(i);
	return div;
}

var createGeneralInformation = function(estimateObject){
	var divContainer = createElement('div','container','generalContainer');
	var formItem = createElement('form','col s12','generalForm');

	var h1 = createElement('h1','titulo','generalTitle','General');
	var divRow = createElement('div','row','','');

	var divQuantity = createTextInput('s4','quantity','Cantidad','number');
	divRow.appendChild(divQuantity);

	var divChips = createElement('div','input-field col s4','quantityChipsDiv');
	divRow.appendChild(divChips);
	
	var divClossedSize = createTextInput('s12','clossedSize','Tamaño cerrado (mm)','text',estimateObject?estimateObject.clossedSize:null);
	divRow.appendChild(divClossedSize);

	formItem.appendChild(h1);
	formItem.appendChild(divRow);

	divContainer.appendChild(formItem);

	generalDiv.appendChild(divContainer);

	var quantity = document.getElementById('quantity');

	quantity.addEventListener('focusout',function(e){
	        focusOutOnQuantity(e.srcElement);
	});

	quantity.addEventListener('keyup',function(e){
	    if(e.keyCode === 13 || e.keyCode === 32){
	        focusOutOnQuantity(e.srcElement);
	    }
	});

	if (estimateObject && estimateObject.quantity){
		for (var i = 0; i < estimateObject.quantity.length;i++){
			var chip = createChip('quantityChip' + ++quantityOfQuantities,estimateObject.quantity[i],['quantity'],[estimateObject.quantity[i]])
			var quantityChipsDiv = document.getElementById('quantityChipsDiv');	
			quantityChip.push('quantityChip' + quantityOfQuantities);
			quantityChipsDiv.appendChild(chip);
		}
	}
}



var updateEstimateCard = function() {
	var estimate = updateEstimate(estimate);
	updateCard(estimate);
  };