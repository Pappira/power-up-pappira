
var t = TrelloPowerUp.iframe();
var cardInfoKey = 'pappira.cardInfo';
var listId = '5a9ef0ce024c776a21220836';

var selectedWorkTypeId;
var selectedWorkId;
var selectedOptions = {};
var estimate; 

t.render(function(){
	return t.get('card', 'shared', cardInfoKey)
	.then(function(cardInfo){
    estimate = deTranslateEstimate(JSON.parse( LZString.decompress(cardInfo)));
    createWorkTypeSelectPanel();
	});
});

var createWorkTypeSelectPanel = function(){
  var wizardForm =  document.getElementById('wizardForm');
  var wizardElement = createScreen('AcceptEstimate','Aceptar Presupuesto',estimate,nextAfterAcceptedEstimateSelect);
  if(wizardElement){
    wizardForm.appendChild(wizardElement);
  }
}

var createScreen = function(type,titulo,estimate,nextFunction){
  if (estimate.prices.length>1){
    var div = createElement('div','row setup-content',type); 
    var title = createElement('h3','','',titulo); 
    var divRow = createElement('div','row','','');
    div.appendChild(title);
    
    var divLoader = createElement('div','','loader');
    div.appendChild(divLoader);
    estimate.prices.sort(compareValues());
    for (var i = 0; i < estimate.prices.length;i++){
      var price = estimate.prices[i];
      var text;
      var priceText = "<strong>Cantidad: </strong>" + price.quantity + '<br>';
      var generalFinishesText = "";
      if(estimate.mandatoryFinishGroups){
        for (var j = 0; j < estimate.mandatoryFinishGroups.length;j++){
            if (estimate.mandatoryFinishGroups[j].finishes.length>1){
                generalFinishesText += (generalFinishesText.length>0?" ":"") + price.mandatoryFinishGroups[j].finishes.finish;
            }
        }
      }
      priceText += "<strong>" + generalFinishesText +"</strong>" + '<br>';
      for (var j = 0; j < price.items.length; j++){
        var item =  price.items[j];
        var itemsFinishesText  = "";
        if(estimate.items[j].mandatoryFinishGroups){
          for (var k = 0; k < estimate.items[j].mandatoryFinishGroups.length;k++){
              if (estimate.items[j].mandatoryFinishGroups[k].finishes.length>1){
                  itemsFinishesText += " " + item.mandatoryFinishGroups[k].finishes.finish;
              }
          }
        }

        var originalItem = estimate['items'][item.id];
        var currentPriceText = (originalItem.materials.length>1?'<strong>papel: </strong>' + item.materials.paper + ' '  + item.materials.gr + 'gr <br>':'')
        + ((originalItem.inks.length>1 || originalItem.faces.length>1)?'<strong>Tintas: </strong>' + item.inks.inksQuantity +' ' + item.faces +'<br>':'')
        + ((originalItem.openedSize && originalItem.openedSize.length>1)?'<strong>Tamaño Abierto: </strong>' + item.openedSize + '<br>':'') 
        + ((originalItem.quantityOfPages.length>1 && item.quantityOfPages>1)?'<strong>Páginas: </strong>'  + item.quantityOfPages + '<br>':'')
        + ((originalItem.quantityOfVias.length>1 && item.quantityOfVias>1)?'<strong>Vías: </strong>' + item.quantityOfVias + '<br>': '')
        + ((itemsFinishesText && itemsFinishesText.length>0)?'<strong>' + itemsFinishesText + '</strong>':'');;
        if (currentPriceText && currentPriceText.length>0){
          currentPriceText = (price.items.length>1?'<p style="text-align: center;font-size: 1.3em;text-decoration: underline;margin: 0.5em;">' + originalItem.name+'</p>':'') + currentPriceText;
          priceText += currentPriceText;
        }
      }
      text = priceText + "<h6>" + 'Precio: $ ' + price.price.toLocaleString() + ' + IVA' + '</h6>';

      var card = createHTMLCard(noImage,'',text,type,i,nextFunction,true);
      divRow.appendChild(card);
    }
    div.appendChild(divRow);
    return div;
  }else{
    nextAfterAcceptedEstimateSelect();
  }
}

var nextAfterAcceptedEstimateSelect = function(){
  if (estimate.prices.length>1){
    var elementId = $(this).attr('id');
    var id = elementId.substring(elementId.indexOf('-')+1);
    estimate["SelectedOption"] = id;
  }else{
    estimate["SelectedOption"] = 0;
  }
  if (estimate.optionalFinishesPrices && estimate.optionalFinishesPrices.length>0){
      var possibilities = createPossibilities();
      if (possibilities != null){
        deleteWizard();
        createWizard(possibilities);
      }else{
        updateEstimateAndTrelloCard();
      }
  }
}

var createPossibilities = function(){
  var generalFinishesToShow = [];
    var itemFinishesToShow = [];
    for (var i = 0; i < estimate.optionalFinishesPrices.length;i++){
      var possibleExtraPrice = estimate.optionalFinishesPrices[i];
      var isPossible = true;
      var work = estimate.prices[estimate.SelectedOption];
      for (var prop in possibleExtraPrice) {
        if (prop != "optionalFinishes" && prop !="items" && prop !="workId"){
          if(!JSON.stringify(work[prop]).includes(JSON.stringify(possibleExtraPrice[prop]))){
            isPossible = false;
            break; 
          }
        }else if(prop == "items"){
          for (var j = 0; j < possibleExtraPrice.items.length; j++){
            var priceItem = possibleExtraPrice.items[j];
            var workItem = work.items[j];
            for (var itemProp in priceItem) {
              if (itemProp != "optionalFinishes" && itemProp!="id"){
                if(!JSON.stringify(workItem[itemProp]).includes(JSON.stringify(priceItem[itemProp]))){
                  isPossible = false;
                  break;
                }
              }
            }
          }
        }
      }
      if (isPossible){
        for(var j = 0; j <possibleExtraPrice.optionalFinishes.length;j++ ){
          var possibility = {};
          possibility['itemId'] = "-1-" + i + "-" + j;
          possibility['values'] = possibleExtraPrice.optionalFinishes[j].finish;
          generalFinishesToShow.push(possibility);
        }
        for(var j = 0; j < possibleExtraPrice.items.length;j++){
          if(possibleExtraPrice.items[j] && possibleExtraPrice.items[j].optionalFinishes){
            for (var k = 0; k < possibleExtraPrice.items[j].optionalFinishes.length;k++){
              var possibility = {};
              possibility['itemId'] = j + "-" + i + "-" + k;
              possibility['values'] = possibleExtraPrice.items[j].optionalFinishes[k].finish;
              if(!itemFinishesToShow[j] || itemFinishesToShow[j].length==0){
                itemFinishesToShow[j] = [];
              }
              itemFinishesToShow[j].push(possibility);
            }
          }
        }
      }
    }
    if(generalFinishesToShow.length>0 && itemFinishesToShow.length>0){
      return [generalFinishesToShow,itemFinishesToShow];
    }else if(generalFinishesToShow.length > 0){
      return [generalFinishesToShow];
    }else if (itemFinishesToShow.length > 0){
      return [itemFinishesToShow];
    }else{
      return null;
    }
   
}

var deleteWizard = function(){
  var wizardForm =  document.getElementById('wizardForm');
  while(wizardForm.firstChild){
    wizardForm.removeChild(wizardForm.firstChild);
  }
  $(".stepwizard-step").remove();
}

var createHTMLCard = function(image,title,content,type,id,functionOnClick,blackText){
  var divCol = createElement('div','col m4','','');
  var divCard = createElement('div','card',type + '-' + id,'');
  var divCardImage = createElement('div','card-content ' + (blackText?'':'white-text'),'','');

  var p = createElement('p','','','','','','','','','','',content);
  if(title && title.length>0){
    var span = createElement('span','card-title activator grey-text text-darken-4','',title);
    divCardImage.appendChild(span);
  }
  divCardImage.appendChild(p);
  divCard.appendChild(divCardImage);
  divCol.appendChild(divCard);
  if (functionOnClick){
    divCard.addEventListener('click',functionOnClick)
  }
  return divCol;
}

var createWizard = function(combinations){
  var divContainer = createElement('div','stepwizard-row setup-panel','wizardRow');
  var wizardForm =  document.getElementById('wizardForm');

  var wizardButton = createWizardButton(1,"Terminaciones generales opcionales");
  divContainer.appendChild(wizardButton);
  var wizardElement = createWizardElement(1,combinations[0],"Terminaciones generales opcionales");
  wizardForm.appendChild(wizardElement);

  
  for(var i = 0; i < combinations[1].length; i++){
    var combination = combinations[1][i];
    var wizardButton = createWizardButton(i+2,"Terminaciones de " + estimate.items[i].name + " opcionales");
    divContainer.appendChild(wizardButton);
    var wizardElement = createWizardElement(i+2 ,combination,"Terminaciones de " + estimate.items[i].name + " opcionales",i==combinations[1].length-1?true:false);
    wizardForm.appendChild(wizardElement);
  }

  var wizardContainer = document.getElementById('wizardContainer');
  wizardContainer.appendChild(divContainer);
  startFunction();
}


var createWizardElement = function(step,combinations,name,last){
  var div = createElement('div','setup-content','step-' + step); 
  var divRow = createElement('div','row'); 
  var title = createElement('h3','','',name); 
  divRow.appendChild(title);

  for (var i = 0; i < combinations.length;i++){
    var value = combinations[i].values+'';
    var card = createRevealCard(noImage,value,combinations[i].itemId,combinations[i].itemId);
    divRow.appendChild(card);
  }
 
  var divButton = createElement('div','div-button'); 

  if(step!=1){
    var buttonPreviuos = createFormButton(step,"",false);
    divButton.appendChild(buttonPreviuos);
  }
  if(!last){
    var buttonNext = createFormButton(step,"",true);
    divButton.appendChild(buttonNext);
  }else{
    var buttonNext = createFormButton(step,'Finalizar',true,true);
    divButton.appendChild(buttonNext);
  }
  div.appendChild(divRow);
  div.appendChild(divButton);

  return div;
}

var createFormButton = function(step,text,next,finish){
  var button;
   if(!finish){
     button = createElement('button','btn ' + (next?'nextBtn ':'prevBtn ') + 
       'btn-lg ' + (next?'pull-right ':'pull-left '),'',(next?'Avanzar a ' + text:'Volver a ' + text),'button');
       next?button.addEventListener('click',nextButtonClick):button.addEventListener('click',previuosButtonClick);
    }else{
       var divButton = createElement('div');
       var thisButton = createElement('button','btn ' +'nextBtn ' + 'btn-lg ' + 'pull-right ','',text,'button');
       thisButton.addEventListener('click',updateEstimateAndTrelloCard);
       var divLoader = createElement('div','','loader');
       divButton.appendChild(thisButton);
       divButton.appendChild(divLoader);
       button = divButton;
   }
   return button;
 } 

 var updateEstimateAndTrelloCard = function(){
  var extraPrices = JSON.parse(JSON.stringify(estimate.optionalFinishesPrices));
  for (var extraPriceId = 0; extraPriceId < estimate.optionalFinishesPrices.length;extraPriceId++){
    if (estimate.optionalFinishesPrices[extraPriceId].optionalFinishes){
      if(selectedOptions[-1] && selectedOptions[-1][extraPriceId]){
        extraPrices[extraPriceId].optionalFinishes = cutArray(extraPrices[extraPriceId].optionalFinishes,selectedOptions[-1][extraPriceId]);
      }else{
        delete extraPrices[extraPriceId].optionalFinishes;
      }
    }
    for(var elementId = 0; elementId < estimate.optionalFinishesPrices[extraPriceId].items.length; elementId++ ){
      if (estimate.optionalFinishesPrices[extraPriceId].items[elementId]){
        if(selectedOptions[elementId] && selectedOptions[elementId][extraPriceId]){
          extraPrices[extraPriceId].items[elementId].optionalFinishes = cutArray(extraPrices[extraPriceId].items[elementId].optionalFinishes,selectedOptions[elementId][extraPriceId]);
        }else{
          delete extraPrices[extraPriceId].items[elementId];
        }
      }
    }
    if (extraPrices[extraPriceId].items.every(element => element === null)){
      delete extraPrices[extraPriceId].items;
    }
  }
  estimate.selectedExtraPrices = extraPrices;

  var currentEstimate = estimate.prices[estimate.SelectedOption];
  for (var i = 0; i < currentEstimate.items.length;i++){
   var currentItem = currentEstimate.items[i];
   if (currentItem.faces == "Doble Faz"){
     currentItem.quantityOfPages *= 2; 
   }
  }
  updateCard(estimate);
 }

 var createWizardButton = function(step,name){
  var div = createElement('div','stepwizard-step'); 
  var a = createElement('a','btn ' + (step==1?'btn-primary':'btn-default') +' btn-circle','',step,'button','','','#step-'+step,(step==1?'':'disabled'));
  var p = createElement('p','','',name);
  div.appendChild(a);
  div.appendChild(p);
  return div;
}  

var createRevealCard = function(image,title,type,id,functionOnClick){
  var divCol = createElement('div','col m4','','');
  var divCard = createElement('div','card',type + '-' + id,'');
  var divCardImage = createElement('div','card-image waves-effect waves-block waves-light','','');
  var img = createElement('img','activator','','','','','','','',['src'],[image]);
  var span = createElement('span','card-title activator grey-text text-darken-4','',title);

  divCardImage.appendChild(img);
  divCardImage.appendChild(span);

  var divCardReveal = createElement('div','card-reveal','','');
  var spanReveal = createElement('span','card-title grey-text text-darken-4');
  var iClose = createElement('i','material-icons right',type + '-' + title);

  spanReveal.appendChild(iClose);
  divCardReveal.appendChild(spanReveal);
  divCard.addEventListener('click',selectOption);
  divCard.appendChild(divCardImage);
  divCard.appendChild(divCardReveal);

  divCol.appendChild(divCard);

  if (functionOnClick){
    divCard.addEventListener('click',functionOnClick)
  }
  return divCol;
}

var selectOption = function(){ 
  var elementId = $(this).attr('id');
  var item;
  if (elementId.charAt(0)=='-'){
    item = -1;
    elementId = elementId.substring(3);
  }else{
    var item = elementId.substring(0,elementId.indexOf('-'));
    elementId = elementId.substring(elementId.indexOf('-')+1);
  }
  var extraPriceId = elementId.substring(0,elementId.indexOf('-'));
  var finishId = parseInt(elementId.substring(elementId.indexOf('-')+1));

  if (!selectedOptions[item]){
    selectedOptions[item] = {};
  }
  if (selectedOptions[item][extraPriceId]){
    if(selectedOptions[item][extraPriceId].indexOf(finishId) == -1){
      selectedOptions[item][extraPriceId].push(finishId);
    }else{
      removeItem = finishId;
      selectedOptions[item][extraPriceId] = jQuery.grep(selectedOptions[item][extraPriceId],function(value1) {
        return value1 != removeItem;
      });
    }
  }else{
    selectedOptions[item][extraPriceId] = [finishId];
  }
}

var previuosButtonClick = function(){
  var curStep = $(this).closest(".setup-content"),
  curStepBtn = curStep.attr("id"),
  prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

  prevStepWizard.removeAttr('disabled').trigger('click');
}

var nextButtonClick = function(){
  var curStep = $(this).closest(".setup-content"),
    curStepBtn = curStep.attr("id"),
    nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
    curInputs = curStep.find("input[type='text'],input[type='url']"),
    isValid = true;

  $(".form-group").removeClass("has-error");
  for(var i=0; i<curInputs.length; i++){
    if (!curInputs[i].validity.valid){
      isValid = false;
      $(curInputs[i]).closest(".form-group").addClass("has-error");
    }
  }

  if (isValid)
    nextStepWizard.removeAttr('disabled').trigger('click');
};

var startFunction = function(){
  var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
          allPrevBtn = $('.prevBtn');
  
    allWells.hide();
  
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);
  
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });  
    $('div.setup-panel div a.btn-primary').trigger('click');
  };