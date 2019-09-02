var t = TrelloPowerUp.iframe();

var commentsDiv = document.getElementById('commentsDiv');
var customerDiv = document.getElementById('customerDiv');
var addCardButton = document.getElementById('addCardButton');


var paymentWays = ['Contado','Seña del 50% y saldo contra-entrega','Seña del 40% y saldo contra-entrega','SIIF 30 días','SIIF 60 días'];


var comments = ['internalComments','clientComments'];
var customer = ['comercialName','businessName','rut','address','contactName','contactEmail','contactPhone','paymentWay'];
var productionTimes = ['1 a 2 días hábiles', '3 a 5 días hábiles','5 a 8 días hábiles','8 a 12 días hábiles', '12 a 15 días hábiles','15 a 20 días hábiles'];
var estimate = {};

var cardInfoKey = 'pappira.cardInfo';

t.render(function(){
	return t.get('card', 'shared', cardInfoKey)
	.then(function(cardInfo){
		if (addCardButton){
		    addCardButton.addEventListener('click', createEstimateAndUpdateCard);
		}
	  if(cardInfo){
			estimate = deTranslateEstimate(JSON.parse( LZString.decompress(cardInfo)));
		}
		createComments(estimate);
		createCustomer(estimate);
		createProductionTime(estimate);
	}).then(function(){
		var select = document.getElementById('paymentWay');
		select.value = (estimate && estimate.customer)?estimate.customer.paymentWay:'';
		$('select#paymentWay').material_select();

		select = document.getElementById('productionTime');
		select.value = (estimate && estimate.productionTime)?estimate.productionTime:'';
		$('select#productionTime').material_select();
		
	});
});

var createObject = function(){
	commentsObject = {};
	for (var i = 0; i < comments.length;i++){
		var input = document.getElementById(comments[i]);
		if (input && input.value.length>0 && input.value !== 'Selecciona'){
			commentsObject[comments[i]] = input.value;
		}else{
			commentsObject[comments[i]] = '';
		}
	}
	estimate.comments = commentsObject;

	customerObject = {};
	for (var i = 0; i < customer.length;i++){
		var input = document.getElementById(customer[i]);
		if (input && input.value.length>0 && input.value !== 'Selecciona'){
			customerObject[customer[i]] = input.value;
		}else{
			customerObject[customer[i]] = '';
		}
	}
	estimate.customer = customerObject;

	var paymentWayText = document.getElementById('productionTime').value;
	estimate.productionTime = paymentWayText!='Selecciona'?paymentWayText:'';
	return estimate;

};


var createProductionTime = function(estimateObject){
	var divContainer = createElement('div','container','productionTimeContainer');
	var formItem = createElement('form','col s12','productionTimeForm');

	var h1 = createElement('h1','titulo','productionTimeTitle','Tiempo de Entrega');
	var divRow = createElement('div','row','','');

	var select = createSelect('s6','productionTime',productionTimes,'Tiempo de entrega');
	divRow.appendChild(select);

	formItem.appendChild(h1);
	formItem.appendChild(divRow);
	divContainer.appendChild(formItem);

	commentsDiv.appendChild(divContainer);
}

var createComments = function(estimateObject){
	var divContainer = createElement('div','container','commentsContainer');
	var formItem = createElement('form','col s12','commentsForm');

	var h1 = createElement('h1','titulo','commentsTitle','Comentarios');
	var divRow = createElement('div','row','','');

	var divInternalComments = createTextInput('s6','internalComments','Internos','text',(estimateObject && estimateObject.comments)?estimateObject.comments.internalComments:null);
	divRow.appendChild(divInternalComments);
	
	var divClientComments = createTextInput('s6','clientComments','Al Cliente','text',(estimateObject && estimateObject.comments)?estimateObject.comments.clientComments:null);
	divRow.appendChild(divClientComments);

	formItem.appendChild(h1);
	formItem.appendChild(divRow);
	divContainer.appendChild(formItem);

	commentsDiv.appendChild(divContainer);
}

var createCustomer = function(estimateObject){
	var divContainer = createElement('div','container','customerContainer');
	var formItem = createElement('form','col s12','customerForm');

	var h1 = createElement('h1','titulo','customerTitle','Datos del cliente');
	var divRow = createElement('div','row','','');

	divRow.appendChild(createTextInput('s6','comercialName','Nombre comercial o fantasia','text',(estimateObject && estimateObject.customer)?estimateObject.customer.comercialName:null));
	divRow.appendChild(createTextInput('s6','businessName','Razón social','text',(estimateObject && estimateObject.customer)?estimateObject.customer.businessName:null));

	divRow.appendChild(createTextInput('s6','rut','RUT','text',(estimateObject && estimateObject.customer)?estimateObject.customer.rut:null));
	divRow.appendChild(createTextInput('s6','address','Dirección','text',(estimateObject && estimateObject.customer)?estimateObject.customer.address:null));

	divRow.appendChild(createTextInput('s6','contactName','Nombre','text',(estimateObject && estimateObject.customer)?estimateObject.customer.contactName:null));
	divRow.appendChild(createTextInput('s6','contactEmail','Email','text',(estimateObject && estimateObject.customer)?estimateObject.customer.contactEmail:null));

	divRow.appendChild(createTextInput('s6','contactPhone','Teléfono','text',(estimateObject && estimateObject.customer)?estimateObject.customer.contactPhone:null));
	var select = createSelect('s6','paymentWay',paymentWays,'Forma de pago');
	divRow.appendChild(select);

	formItem.appendChild(h1);
	formItem.appendChild(divRow);
	divContainer.appendChild(formItem);

	customerDiv.appendChild(divContainer);


	select.value = (estimateObject && estimateObject.customer)?estimateObject.customer.paymentWay:'';
	$('select#paymentWay').material_select();
}

var createEstimateAndUpdateCard = function() {
	estimate = createObject();
	updateCard(estimate);
	};
