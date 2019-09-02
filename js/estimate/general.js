var createSelect = function(colType,selectId,values,labelName,thisValue){
	var option0 = createElement('Option','','','Selecciona','','','');
	option0.setAttribute('disabled',true);
	option0.setAttribute('selected',true);
	var select = createElement('select','',selectId);
	select.appendChild(option0);
	if (values){
		for(var i = 0; i < values.length; i++){
			var option = createElement('Option','','',values[i],'','',values[i]);
			select.appendChild(option);
		}
	}
	if (thisValue){
  		select.value = thisValue;
  		$('#'+selectId).material_select();
	}
	var label = createElement('label','','',labelName,'',selectId);
	var divInput = createElement('div','input-wrapper');
	divInput.appendChild(select);
	divInput.appendChild(label);
	var divCol = createElement('div','input-field col ' + colType);
	divCol.appendChild(divInput);

	return divCol;
}

var createSwitch = function(colType,switchId,switchLabelValue, thisValue){
	var divCol = createElement('div','col ' + colType +' switch-div switch');
	var p = createElement('p','switch','',switchLabelValue);
	var divSwitch = createElement('div','switch','','');
	var label = createElement('label','puntas');
	var input = createElement('input','',switchId,'','checkbox');
	if (thisValue){
		input.checked = thisValue;
	}
	var span = createElement('span','lever');
	label.appendChild(input);
	label.appendChild(span);
	divSwitch.appendChild(label);
	divCol.appendChild(p);
	divCol.appendChild(divSwitch);
	return divCol;
};

var createTextInput = function(colType,inputId,inputLabelValue,type,valueForInput){
	var divCol = createElement('div','input-field col ' + colType);
	var divInput = createElement('div','input-wrapper','','');
	var input = createElement('input','validate',inputId,'',type?type:'text');
	var label = createElement('label',colType,'',inputLabelValue,'',inputId);
	if (valueForInput){
		input.value=valueForInput;
		label.setAttribute('class','active');
	}
	divInput.appendChild(input);
	divInput.appendChild(label);
	divCol.appendChild(divInput);

	return divCol;
};

var createElement = function(typeValue,className,id,text,type,forValue,value,href,disabled,attirbuteName,attributeValue,innerHTML){
	var createElement=document.createElement(typeValue);
	if(className && className.length>0){
		createElement.setAttribute('class',className);
	}
	if(id && id.length>0){	
		createElement.setAttribute('id',id);
	}
	if(text  && text.length>0){
		createElement.append(text);
	}
	if(type  && type.length>0){
		createElement.setAttribute('type',type);
	}	
	if(forValue  && forValue.length>0){
		createElement.setAttribute('for',forValue);
	}
	if(value  && value.length>0){
		createElement.setAttribute('value',value);
	}
	if(href && href.length>0){
		createElement.setAttribute('href',href);
	}
	if(disabled && disabled.length>0){
		createElement.setAttribute('disabled',disabled);
    }
    if(attirbuteName && attributeValue){
		for(var i = 0; i <attirbuteName.length;i++){
			createElement .setAttribute(attirbuteName[i],attributeValue[i]);
		}
	}
	if(innerHTML && innerHTML.length > 0){
		createElement.innerHTML = innerHTML;
	}
	return createElement;
};

var cutArray = function(originalArray,indexToCut){
  var a =  jQuery.grep(originalArray, function(n, i ) {
    return indexToCut?indexToCut.indexOf(i)!=-1:false;
  });
  return a;
}
var createCheckListObject = function(name, cardId){
	return {
		idCard:cardId,
		name:name,
		pos:'bottom'
	};
}


var updateCard = function(estimate) {
	startLoader();
	var checkLists = createCheckListsForCard(estimate);
	var trelloCheckList = [];
	var trelloCheckListItems = [];
	var estimateToSave = translateEstimate(JSON.parse(JSON.stringify(estimate)));
	var estimateToSave = LZString.compress(JSON.stringify(estimateToSave));
	t.card('all')
	.then(function(card) {
	  t.set('card', 'shared', cardInfoKey, estimateToSave)
		.then(function(){
			updateTrelloCard(t, {id: card.id, desc: createTextForCard(estimate), name: createTrelloCardName(estimate)})
			.then(function(){
				//var checkListToCard = [];
				return getCheckLists(t,card.id)
				.then(function(currentCheckListsOnCard){
					var currentCheckListsToDelete = [];
					for (var i = 0; i < currentCheckListsOnCard.length;i++){
						currentCheckListsToDelete.push(removeCheckLists(t,currentCheckListsOnCard[i].id));
					}
					return TrelloPowerUp.Promise.all(currentCheckListsToDelete)
					.then(function(){
						for (var i = 0; i < checkLists.length;i++){
							var currentCheckList = createCheckListObject(checkLists[i].name, card.id);
							var checkListToCard = addCheckListToCard(t, currentCheckList,checkLists[i].checkItems)
							.then(function(checkList){
								for (var i = 0; i < checkLists.length;i++){
									if(checkLists[i].name == checkList.name){
										for (var j = 0; j < checkLists[i].checkItems.length;j++){ 
											trelloCheckListItems.push(addCheckListItemToCheckList(t,checkLists[i].checkItems[j],checkList.id));
										}
										break;
									}
								}
							})
							trelloCheckList.push(checkListToCard);
						}
						return TrelloPowerUp.Promise.all(trelloCheckList)
						.then(function(){
							return TrelloPowerUp.Promise.all(trelloCheckListItems)
							.then(function(){
								t.closeModal();
							});
						});
					});
				});
			});
		});
	});
};

var createCard = function(estimate){
	var cardToSave = {idList: listId, desc: createTextForCard(estimate), name: createTrelloCardName(estimate)};
	if(estimate.deliveryDelay){
	  //TODO Agregar due date a la tarjeta
	  // due: mm/dd/yyy
	}
	startLoader();
	createNewTrelloCard(t, cardToSave, function(card) {
	  setTimeout(function () {
		var estimateToSave = JSON.parse(JSON.stringify(translateEstimate(estimate)));
		var estimateToSave = LZString.compress(JSON.stringify(estimate));
		t.set(card.id, 'shared', cardInfoKey, estimateToSave)
		  .then(function(){
			t.showCard(card.id);
			t.closeModal();
		  });
	  }, 1500);
	});
	};
	
var translateEstimate = function (estimate){
	return convert(estimate,translate);
}

var deTranslateEstimate = function (estimate){
	return convert(estimate,deTranslate);
}

var convert = function(objectToConvert,functionToTranslate){
	if (objectToConvert!=null){
		Object.keys(objectToConvert).forEach(function(key) {
			if(typeof objectToConvert[key] == 'object'){
				var newKey = functionToTranslate(key);
				objectToConvert = rename(objectToConvert,newKey,key);
				convert(objectToConvert[newKey],functionToTranslate);
			}else{
				if(isNaN(key)){
						var newKey = functionToTranslate(key);
						objectToConvert = rename(objectToConvert,newKey,key);
					}
				}
		});
	}
	return objectToConvert;
}

var rename = function(objectToRename, newKey, oldKey){
	if (oldKey !== newKey) {
    Object.defineProperty(objectToRename, newKey,
        Object.getOwnPropertyDescriptor(objectToRename, oldKey));
    delete objectToRename[oldKey];
	}
	return objectToRename;
}
var createCheckListsForCard = function(estimate){
	var checkLists = [];
	var generalCheckList = {
		name:"Terminaciones Generales",
		checkItems:[]
	};
	if (estimate.mandatoryFinishGroups && estimate.mandatoryFinishGroups.length >0){
		var currentMandatoryFinishGroups = estimate.mandatoryFinishGroups;
		if(estimate.SelectedOption!=null){
			currentMandatoryFinishGroups = estimate.prices[estimate.SelectedOption].mandatoryFinishGroups;
			for (var i = 0; i < currentMandatoryFinishGroups.length;i++){
				var item = currentMandatoryFinishGroups[i].groupName + " - " + currentMandatoryFinishGroups[i].finishes.finish + 
				(currentMandatoryFinishGroups[i].finishes.finishComment!=""?' - ' +currentMandatoryFinishGroups[i].finishes.finishComment:'');
				generalCheckList.checkItems.push(
					{
						checkListName: "Terminaciones Generales",
						checked:false,
						name:item,
						pos:'bottom'
					}
				);
			}
		}
	}
	if (estimate.optionalFinishes && estimate.optionalFinishes.length >0){
		if(estimate.SelectedOption!=null){
			var optionalFinishesPrices = estimate.selectedExtraPrices;
			for (var i = 0; i < optionalFinishesPrices.length; i++){
				if (optionalFinishesPrices[i].optionalFinishes){
					for (var j = 0; j < optionalFinishesPrices[i].optionalFinishes.length;j++){
						var item = optionalFinishesPrices[i].optionalFinishes[j].finish + 
						(optionalFinishesPrices[i].optionalFinishes[j].finishComment!=""?' - ' +optionalFinishesPrices[i].optionalFinishes[j].finishComment:'');
						generalCheckList.checkItems.push(
							{
								checkListName: "Terminaciones Generales",
								checked:false,
								name:item,
								pos:'bottom'
							}
						);
					}
				}
			}
		}
	}
	if(generalCheckList.checkItems.length>0){
		checkLists.push(generalCheckList);
	}
	for (var i = 0; i< estimate.items.length;i++){
		var currentCheckList = {
			name:"Terminaciones de " + estimate.items[i].name,
			checkItems:[]
		};
		if (estimate.items[i].mandatoryFinishGroups && estimate.items[i].mandatoryFinishGroups.length >0){
			var currentItemMandatoryFinishGroups = estimate.items[i].mandatoryFinishGroups;
			if(estimate.SelectedOption!=null){
				currentItemMandatoryFinishGroups = estimate.prices[estimate.SelectedOption].items[i].mandatoryFinishGroups;
				for (var k = 0; k < currentItemMandatoryFinishGroups.length;k++){
					var item = currentItemMandatoryFinishGroups[k].groupName + ' - ' + currentItemMandatoryFinishGroups[k].finishes.finish + 
					(currentItemMandatoryFinishGroups[k].finishes.finishComment?' - ' +currentItemMandatoryFinishGroups[k].finishes.finishComment:'');
					currentCheckList.checkItems.push(
						{
							checkListName: "Terminaciones de " + estimate.items[i].name,
							checked:false,
							name:item,
							pos:'bottom'
						}
					);
				}
			}
		}
		if (estimate.items[i].optionalFinishes && estimate.items[i].optionalFinishes.length >0){
			if(estimate.SelectedOption!=null){
				var optionalFinishesPrices = estimate.selectedExtraPrices;
				for (var j = 0; j < optionalFinishesPrices.length; j++){
					if(optionalFinishesPrices[j].items && optionalFinishesPrices[j].items[i] && optionalFinishesPrices[j].items[i].optionalFinishes){
						for (var k = 0; k < optionalFinishesPrices[j].items[i].optionalFinishes.length;k++){
							var item = optionalFinishesPrices[j].items[i].optionalFinishes[k].finish +  
							(optionalFinishesPrices[j].items[i].optionalFinishes[k].finishComment!=""?' - ' + optionalFinishesPrices[j].items[i].optionalFinishes[k].finishComment:'');
							currentCheckList.checkItems.push(
								{
									checkListName: "Terminaciones de " + estimate.items[i].name,
									checked:false,
									name:item,
									pos:'bottom'
								}
							);
						}
					}
				}
			}
		}
		if(currentCheckList.checkItems.length>0){
			checkLists.push(currentCheckList);
		}
	}
return checkLists;
}

var convertTextForCard = function(text){
	switch(text.type){
		case 'title':
		return '#' + text.name + '\n';
		
		case 'subtitle1':
		return '##' + text.name + '\n';
		
		case 'subtitle2':
		return '###' + text.name + '\n';
		
		case 'subtitle3':
		return '####' + text.name + '\n';
		
		case 'subtitle4':
		return '#####' + text.name + '\n';
		
		case 'text':
		return '**' + text.name + ': **' + text.value + '\n';
		
		case 'list':
		var thisText = '1. ' + text.name + '\n';
		if (Array.isArray(text.value)){
			for (var j = 0; j < text.value.length;j++){
				thisText += '  - ' + text.value[j] + '\n';
			}
		}else if (text.value && text.value.length>0){
			thisText += '  - ' + text.value + '\n';
		}
		return thisText + '\n';
	}
}

function add(accumulator, a) {
	return accumulator + a;
}

var createTextForCard = function(estimate){
	var texts = createGeneralText(estimate,true);
	for (var i = 0; i < estimate.items.length;i++){
		texts = texts.concat(createItemText(estimate,estimate.items[i],true,true,true,false,true));
	}
	texts = texts.concat(createCommentsText(estimate,true,false)); 

	texts = texts.concat(createPriceText(estimate,getExtraPricesFromEstimate(estimate))); 

	texts = texts.concat(createCustomerText(estimate));

	var text = ''; 
	for (var i = 0; i < texts.length;i++){
		text +=convertTextForCard(texts[i]);
	}
	return text;
}

var createText = function(type,name,value){
	return {
		type: type,
		name: name?name+'':name,
		value: (!value || Array.isArray(value))?value:value+''
	};
}

var getExtraPricesFromEstimate = function(estimate){
	var extraPrice = 0;
	if(estimate.selectedExtraPrices && estimate.selectedExtraPrices.length > 0){
		extraPrice += estimate.selectedExtraPrices.map(optionalFinishes => optionalFinishes.optionalFinishes?optionalFinishes.optionalFinishes.map(optionalFinish => optionalFinish.price).reduce(add):0).reduce(add);
		extraPrice += estimate.selectedExtraPrices.map(optionalFinishes => optionalFinishes.items?optionalFinishes.items.filter(Boolean).map(item => item.optionalFinishes?item.optionalFinishes.filter(Boolean).map(optionalFinish => optionalFinish.price).reduce(add):0).reduce(add):0).reduce(add);
	}
	return extraPrice;
}

var createOptionalFinishesText = function(estimate,dontTakeCareOfSelectedOption){
	var selectedOption = estimate.SelectedOption!=null && !dontTakeCareOfSelectedOption;
	var texts = [];
	var finishes;
	if (estimate.optionalFinishesPrices && estimate.optionalFinishesPrices.length >0){
		if(!selectedOption){
			finishes = groupFinishes(estimate.optionalFinishesPrices);
		}else{
			finishes = groupFinishes(estimate.selectedExtraPrices);
			
		}
		texts = [].concat.apply([],finishes.map(finish => [].concat.apply([],[createText('subtitle3','Opcional ' + finish.finish  + ((finish.item!=-1 && estimate.items.length>1)?' en ' + estimate.items[finish.item].name:''),''), finish.price.map(price => createText('text','Sub-Total extra (' + price.quantity + ' unidades)', '$ ' +  price.price.toLocaleString() + ' + IVA'))])))
	}
	return texts;
}

var createGeneralText = function(estimate,includeOptionalFinishes,dontTakeCareOfSelectedOption){  
	var text = [];
	var selectedOption = estimate.SelectedOption!=null && !dontTakeCareOfSelectedOption;
	text.push(createText('title',estimate.name,''));
	text.push(createText('text','Cantidad',(selectedOption?estimate.prices[estimate.SelectedOption].quantity:estimate.quantity.join(' // '))));
	text.push(createText('text','Tamaño cerrado',estimate.clossedSize.map(currentClossedSize => ((typeof currentClossedSize == 'object')?currentClossedSize.value:currentClossedSize)).join(' // ')));
	if (estimate.mandatoryFinishGroups && estimate.mandatoryFinishGroups.length >0){	
		var currentMandatoryFinishGroups = estimate.mandatoryFinishGroups;
		if(!selectedOption || dontTakeCareOfSelectedOption){
			for (var i = 0; i < currentMandatoryFinishGroups.length;i++){
				text.push(createText('text',currentMandatoryFinishGroups[i].groupName,currentMandatoryFinishGroups[i].finishes.map(finishes => finishes.finish).join(" // ")));
			}
		}else{
			currentMandatoryFinishGroups = estimate.prices[estimate.SelectedOption].mandatoryFinishGroups;
			for (var i = 0; i < currentMandatoryFinishGroups.length;i++){
				text.push(createText('text',currentMandatoryFinishGroups[i].groupName,currentMandatoryFinishGroups[i].finishes.finish));
			}
		}
	}
	if (includeOptionalFinishes){
		if (estimate.optionalFinishes && estimate.optionalFinishes.length >0){
			text.push(createText('subtitle2','Terminaciones',''));
			if(!selectedOption || dontTakeCareOfSelectedOption){
				var currentOptionalFinish = estimate.optionalFinishes;
				for(var i = 0; i < currentOptionalFinish.length;i++){
					text.push(createText('list',currentOptionalFinish[i].finish,''));
				}
			}else{
				var optionalFinishesPrices = estimate.selectedExtraPrices;
				for (var i = 0; i < optionalFinishesPrices.length; i++){
					if (optionalFinishesPrices[i].optionalFinishes){
						for (var j = 0; j < optionalFinishesPrices[i].optionalFinishes.length;j++){
							text.push(createText('list',optionalFinishesPrices[i].optionalFinishes[j].finish));
						}
					}
				}
			}
		}
	}
	return text;
}
var createItemText = function(estimate, item, showBleedPrint, showAllDifferentPages, showOptionalFinishes,dontTakeCareOfSelectedOption,showPrivatePrinterInformation){
	var texts = [];
	var selectedItem;
	var selectedOption = estimate.SelectedOption!=null && !dontTakeCareOfSelectedOption;
	if(item){
		if (selectedOption){
			selectedItem = estimate.prices[estimate.SelectedOption].items[item.id];
		}
		if (estimate.items.length>1){
			texts.push(createText('subtitle1',item.name,''));
		}
		if (selectedItem){
			texts.push(createText('text','Papel', selectedItem.materials.paper + ' ' + selectedItem.materials.gr + 'gr'));
			var inks = selectedItem.inks.inksDetails + (showBleedPrint?(selectedItem.bleedPrint?'(Impresión al Vivo)':''):'');
			inks += ' - ' + selectedItem.faces;
			texts.push(createText('text','Impresión',inks));
			if (selectedItem.openedSize != estimate.clossedSize){
				texts.push(createText('text','Tamaño Abierto',selectedItem.openedSize));
			}
			if (selectedItem.quantityOfPages !=1){
				var quantityOfPages = selectedItem.quantityOfPages + (selectedItem.allTheSame?' (Todas iguales)':(showAllDifferentPages?' (Todas diferentes)':''));
				texts.push(createText('text','Páginas',quantityOfPages));
			}
			if (selectedItem.mandatoryFinishGroups && selectedItem.mandatoryFinishGroups.length >0){
				currentItemMandatoryFinishGroups = selectedItem.mandatoryFinishGroups;
				for (var k = 0; k < currentItemMandatoryFinishGroups.length;k++){
					texts.push(createText('text',currentItemMandatoryFinishGroups[k].groupName,currentItemMandatoryFinishGroups[k].finishes.finish +currentItemMandatoryFinishGroups[k].finishes.finishComment));
				}
			}
			if(showPrivatePrinterInformation && estimate.SelectedOption){
				texts.push(createText('text','Hoja', selectedItem.sheetSize + " cortado en " + selectedItem.cutsPerSheet));
				texts.push(createText('text','Pliego', selectedItem.paperSize + " armado de a " + selectedItem.quantityPerPaper + " (" + selectedItem.excess + " de demasía)"));
				texts.push(createText('text','Máquina', selectedItem.machine));
			}  
			var notTitlePlaced = true;
			if(showOptionalFinishes){
				var optionalFinishesPrices = estimate.selectedExtraPrices;
				if (optionalFinishesPrices){
					for (var j = 0; j < optionalFinishesPrices.length; j++){
						if(optionalFinishesPrices[j].items && optionalFinishesPrices[j].items[selectedItem.id] && optionalFinishesPrices[j].items[selectedItem.id].optionalFinishes){
							for (var k = 0; k < optionalFinishesPrices[j].items[selectedItem.id].optionalFinishes.length;k++){
								if (notTitlePlaced){
									texts.push(createText('subtitle2','Terminaciones',''));
									notTitlePlaced = false;
								}
								texts.push(createText('list',optionalFinishesPrices[j].items[selectedItem.id].optionalFinishes[k].finish + (optionalFinishesPrices[j].items[selectedItem.id].optionalFinishes[k].finishComment!=""?optionalFinishesPrices[j].items[i].optionalFinishes[k].finishComment:'')));
							}
						}
					}
				}
			}



		}else{
			if (item.materials){
				var materials = item.materials.map(function(material) {
					return material.paper + " " + material.gr + 'gr';
				}).join(' // ');
				texts.push(createText('text','Papel',materials));
			}
			if (item.inks){
					var inks = item.inks.map(function(ink) {
						return ink.inksDetails;
					}).join(' // ') + (showBleedPrint?' ' + (item.bleedPrint?'(Impresión al Vivo)':''):'');
					inks += (item.faces?' - ' + item.faces.join(' // '):'');
					texts.push(createText('text','Impresión',inks));
			}
			if (item.openedSize && (JSON.stringify(item.openedSize.sort()) != JSON.stringify([...new Set(estimate.prices.map(price => price.clossedSizes))].sort()))){
				texts.push(createText('text','Tamaño Abierto',item.openedSize.join(' // ')));
			}
			if (item.quantityOfPages.length>1 || (item.quantityOfPages.length==1 && item.quantityOfPages!=1)){
				var quantityOfPages = item.quantityOfPages.join(' // ') + (item.allTheSame?' (Todas iguales)':(showAllDifferentPages?' (Todas diferentes)':''))
				texts.push(createText('text','Páginas',quantityOfPages));
			}
			if (item.mandatoryFinishGroups && item.mandatoryFinishGroups.length >0){
				var currentItemMandatoryFinishGroups = item.mandatoryFinishGroups;
				for (var k = 0; k < currentItemMandatoryFinishGroups.length;k++){
					texts.push(createText('text',currentItemMandatoryFinishGroups[k].groupName,currentItemMandatoryFinishGroups[k].finishes.map(finishes => finishes.finish + finishes.finishComment).join(" // ")));
				}
			}
			var notTitlePlaced = true;
			if(showOptionalFinishes){
				if (item.optionalFinishes && item. optionalFinishes.length >0){
					var currentItemOptionalFinish = item.optionalFinishes;
					for(var k = 0; k < currentItemOptionalFinish.length;k++){
						if (notTitlePlaced){
							texts.push(createText('subtitle2','Terminaciones',''));
							notTitlePlaced = false;
						}
						texts.push(createText('list',currentItemOptionalFinish[k].finish + (currentItemOptionalFinish[k].finishComment!=""?currentItemOptionalFinish[k].finishComment:''),''));
					}
				}
			}
		}
		return texts;
	}
}

var createCommentsText = function(estimate, showInternalComments, showCustomerComments){
	var texts =[];
	if (estimate.comments){
		if (showInternalComments){
			texts.push(createText('subtitle1','Comentario: ' + estimate.comments.internalComments,''));
		}
		if(showCustomerComments){
			texts.push(createText('subtitle1','Comentario: ' + estimate.comments.clientComments,''));
		}
	}
	return texts;
}

var createCompletePriceText = function(estimate){
	textToAdd = [];
	if(estimate.prices){
			estimate.prices.sort(compareValues());
			if (estimate.prices.length>1){
					textToAdd.push(createText('subtitle1','Precios', ''));  
			}
			//var lastPriceText = '';
			var lastGeneralFinishesText = '';
			var isList = false;
			//Hay variación en los papeles?
			var quantityOfPapersOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.materials).size!=1);
			var materialChange = quantityOfPapersOnOriginalEstimate.filter(v => v).length >0;

			//Hay variación en los tamaños?
			var quantityOfSizesOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.openedSize).size!=1);
			var sizeChange = quantityOfSizesOnOriginalEstimate.filter(v => v).length >0;

			//Hay variación en tintas?
			var quantityOfInksOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.inks).size!=1);
			var inksChange = quantityOfInksOnOriginalEstimate.filter(v => v).length >0;

			//Hay variación en fases
			var quantityOfFacesOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.faces).size1=1);
			var facesChange = quantityOfFacesOnOriginalEstimate.filter(v => v).length >0;

			//Hay variación en páginas
			var quantityOfPagesOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.quantityOfPages).size1=1);
			var pagesChange = quantityOfPagesOnOriginalEstimate.filter(v => v).length >0;

			//Hay variación en vías
			var quantityOfViasOnOriginalEstimate = estimate.items.map(currentItem => new Set(currentItem.quantityOfVias).size1=1);
			var viasChange = quantityOfViasOnOriginalEstimate.filter(v => v).length >0;

		//	quantityOfOpenedSizesPerItemOnOriginalEstimate.push(quantityOfClossedSizesOnOriginalEstimate);
			var lastPaperText = '';
			var lastsizeText = '';
			var lastInkText = '';
			var lasPagesText = '';
			var lastItemsFinishesText = '';
			var changeMade = false;
			for (var i = 0; i < estimate.prices.length;i++){
				var quantityOfTitles = 2;
					var price = estimate.prices[i];
					var generalFinishesText = "";
					if(estimate.mandatoryFinishGroups){
							for (var j = 0; j < estimate.mandatoryFinishGroups.length;j++){
									if (estimate.mandatoryFinishGroups[j].finishes.length>1){
											generalFinishesText += (generalFinishesText.length >0?" ":"") + price.mandatoryFinishGroups[j].finishes.finish;
									}
							}
					}
					if (generalFinishesText && generalFinishesText.length>0){
						quantityOfTitles++;
						if(generalFinishesText != lastGeneralFinishesText){
							textToAdd.push(createText('subtitle' + quantityOfTitles + "price",generalFinishesText, ''));  
							changeMade = true;
						}
						lastGeneralFinishesText = generalFinishesText;
					}

					var priceText = '';

					if(materialChange){
						quantityOfTitles++;
						var putItemName = quantityOfPapersOnOriginalEstimate.filter(v => v).length>1;
						var paperText = 'Papel' + price.items.map(currentItem => quantityOfPapersOnOriginalEstimate[currentItem.id]?
																																			(putItemName?' de '+currentItem.name:'') 
																																				+ ' ' + currentItem.materials.paper + ' '  + currentItem.materials.gr + 'gr':'').join(", ");
						if(paperText && paperText != lastPaperText){
							textToAdd.push(createText('subtitle' + quantityOfTitles + "price",paperText, ''));  
							changeMade = true;
						}
						lastPaperText = paperText;
					}

					if(sizeChange){
						quantityOfTitles++;
						var putItemName = quantityOfSizesOnOriginalEstimate.filter(v => v).length>1;
						var sizeText = price.items.map(function(currentItem){
							if(quantityOfSizesOnOriginalEstimate[currentItem.id]){
								var quantityOfClossedSizesOnOriginalEstimate = (new Set(estimate.clossedSize)).size;
								var quantityOfOpenedSizesPerItemOnOriginalEstimate = estimate.items.map(currentItem1 => new Set(currentItem1.openedSize).size);
								quantityOfOpenedSizesPerItemOnOriginalEstimate.push(quantityOfClossedSizesOnOriginalEstimate);
	
								//Si hay la misma cantidad de diferentes tamaños cerrados que abiertos, pongo el cerrado, sino el abierto
									return (quantityOfOpenedSizesPerItemOnOriginalEstimate.every(val => val == quantityOfOpenedSizesPerItemOnOriginalEstimate[0])?	
										'Tamaño' + (putItemName?' de '+currentItem.name:'') + ' ' + price.clossedSizes:							
										'Tamaño abierto' + (putItemName?' de '+currentItem.name:'') + ' ' + item.openedSize);
							}
						}).join(", ");
						if(sizeText && sizeText != lastsizeText){
							textToAdd.push(createText('subtitle' + quantityOfTitles + "price",sizeText, ''));  
							changeMade = true;
						}
						lastsizeText = sizeText;
					}
					if(inksChange || facesChange){
						quantityOfTitles++;
						var putItemName = quantityOfInksOnOriginalEstimate.filter(v => v).length>1 || quantityOfFacesOnOriginalEstimate.filter(v => v).length>1;
						var inkText = price.items.map(currentItem => ((quantityOfInksOnOriginalEstimate[currentItem.id] || quantityOfFacesOnOriginalEstimate[currentItem.id])?
													(putItemName?currentItem.name:'') +
													 (inksChange?' ' + currentItem.inks.inksDetails:'') + (facesChange?' ' + currentItem.faces:''):'')).join(", ");
						if(inkText && inkText != lastInkText){
							textToAdd.push(createText('subtitle' + quantityOfTitles + "price",inkText, ''));  
						}
						lastInkText = inkText;
					}
					if(viasChange || pagesChange){
						quantityOfTitles++;
						var putItemName =  quantityOfPagesOnOriginalEstimate.filter(v => v).length>1 || quantityOfViasOnOriginalEstimate.filter(v => v).length>1;
						var pagesText = 
														price.items.map(currentItem => 
															((quantityOfPagesOnOriginalEstimate[currentItem.id] || quantityOfViasOnOriginalEstimate[currentItem.id])?
															(putItemName?currentItem.name + ' de ':'') + 
															(quantityOfPagesOnOriginalEstimate[currentItem.id]?((pagesChange && currentItem.quantityOfPages>1)?item.quantityOfPages + ' páginas ':''):'') + 
															(quantityOfViasOnOriginalEstimate[currentItem.id]?((viasChange && currentItem.quantityOfVias>1)?item.quantityOfVias + ' vías':''):''):'')
															
															
														).join(", ");
						if(pagesText && pagesText != lasPagesText){
							textToAdd.push(createText('subtitle' + quantityOfTitles + "price",pagesText, ''));  
							changeMade = true;
						}
						lasPagesText = pagesText;
					}

					//mandatoryFinishGroups inside item
					itemsFinishesText = price.items.map(currentItem => currentItem.mandatoryFinishGroups?currentItem.mandatoryFinishGroups.map(
						currentMandatoryFinishGroup => currentMandatoryFinishGroup.finishes.length>1?currentMandatoryFinishGroup.finishes.finish:'').join(" "):''
					).join(' ');
					if(itemsFinishesText && itemsFinishesText !=lastItemsFinishesText){
						quantityOfTitles++;
						textToAdd.push(createText('subtitle' + quantityOfTitles,itemsFinishesText, ''));  
						changeMade = true;
						lastItemsFinishesText = itemsFinishesText;
					}
					
					//Si hay más de una cantidad
					if(estimate.quantity.length>1){
							//Si estoy agregando una variante nueva (que no solo cambia en la cantidad)
							if(changeMade){
								textToAdd.push(createText('list', 'Sub-Total (' + price.quantity + ' unidades)', '$ ' + price.price.toLocaleString() + ' + IVA'));  
							}else{
								textToAdd[textToAdd.length-1].value.push(['Sub-Total (' + price.quantity + ' unidades)','$ ' + price.price.toLocaleString() + ' + IVA']);  
							}
					}else{
						textToAdd.push(createText('text', 'Sub-Total (' + price.quantity + ' unidades)', '$ ' + price.price.toLocaleString() + ' + IVA'));  
					}
			}
	}
	return textToAdd;
}

var createPriceText = function(estimate,extraPrice){
	var texts = [];
	if (estimate.SelectedOption){
		texts.push(createText('subtitle1','Precio: $' + (estimate.prices[estimate.SelectedOption].price + extraPrice) + ' + IVA' ,''));
	}
	return texts;
}

var createCustomerText = function(estimate){
	var customer = estimate.customer;
	var texts = [];
	if (customer){
		texts.push(createText('subtitle1','Cliente' ,''));
		if (customer.comercialName){
			texts.push(createText('text','Nombre Fantasía' ,customer.comercialName ));
		}
		if (customer.businessName){
			texts.push(createText('text','Razón Social' ,customer.businessName ));
		}
		if (customer.rut){
			texts.push(createText('text','RUT' ,customer.rut ));
		}
		if (customer.address){
			texts.push(createText('text','Dirección' ,customer.address ));
		}
		if (estimate.paymentWay){
			texts.push(createText('text','Forma de Pago' ,estimate.paymentWay ));
		}
		texts.push(createText('subtitle3','Contacto' ,''));
		if (customer.contactName){
			texts.push(createText('text','Nombre' ,customer.contactName ));
		}		
		if (customer.contactEmail){
			texts.push(createText('text','Mail' ,customer.contactEmail ));
		}
		if (customer.contactPhone){
			texts.push(createText('text','Teléfono' ,customer.contactPhone ));
		}
	}
	return texts;
}

var createTrelloCardName = function(estimate){
	var contactAndBusinessInfo = estimate.customer?[estimate.customer.comercialName, estimate.customer.businessName, estimate.customer.contactName]:[];
	var quantity = estimate.quantity.join(' // ');
	if (estimate.SelectedOption){
		quantity = estimate.prices[estimate.SelectedOption].quantity;
	}
	return quantity + " " + estimate.name + " - " + contactAndBusinessInfo.filter(Boolean).join(' - ');
}


function compareValues(order='asc') {
    return function(a, b) {
				let comparison = 0;
				if(a.mandatoryFinishGroups && b.mandatoryFinishGroups){
					if (a.mandatoryFinishGroups.length == b.mandatoryFinishGroups.length){
						for (var j = 0; j < a.mandatoryFinishGroups.length;j++){
							const varA = (typeof a.mandatoryFinishGroups[j].finishes.finish === 'string') ?a.mandatoryFinishGroups[j].finishes.finish.toUpperCase() : a.mandatoryFinishGroups[j].finishes.finish;
							const varB = (typeof b.mandatoryFinishGroups[j].finishes.finish === 'string') ?b.mandatoryFinishGroups[j].finishes.finish.toUpperCase() : b.mandatoryFinishGroups[j].finishes.finish;
							if (a.mandatoryFinishGroups[j].finishes.finish != b.mandatoryFinishGroups[j].finishes.finish){
								if (varA > varB) {
									return ((order == 'desc') ? -1:1);
								} else if (varA < varB) {
									return ((order == 'desc') ? 1:-1);
								}
							}
						}
					}
				}
        key = ['materials','openedSize','inks','faces','quantityOfPages','quantityOfVias'];
        if(a.items.length==b.items.length){
            for (var j = 0; j < a.items.length;j++){
                var item1 = a.items[j];
                var item2 = b.items[j];
                for (var i = 0; i < key.length;i++){
                    var currentKey = key[i];
                    const varA = (typeof item1[currentKey] === 'string') ?item1[currentKey].toUpperCase() : item1[currentKey];
                    const varB = (typeof item2[currentKey] === 'string') ?item2[currentKey].toUpperCase() : item2[currentKey];
                    if(typeof varA !='object'){
                        if (varA > varB) {
                            return ((order == 'desc') ? -1:1);
                        } else if (varA < varB) {
                            return ((order == 'desc') ? 1:-1);
                            
                        }
                    }else{
                        for (var currentKey in varA) {
                            var varAA = (typeof varA[currentKey] === 'string') ? varA[currentKey].toUpperCase() :  varA[currentKey];
                            var varBA = (typeof varB[currentKey] === 'string') ? varB[currentKey].toUpperCase() :  varB[currentKey];
                            if (varAA > varBA) {
                                return ((order == 'desc') ? -1:1);
                            } else if (varAA < varBA) {
                                return ((order == 'desc') ? 1:-1);
                                
                            }
                        }
                    }
               }      

            }
        }else{
            return a.items.length - b.items.length;
        }
       return ((order == 'desc') ? (comparison * -1) : comparison);
    }
}



