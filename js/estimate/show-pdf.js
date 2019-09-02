var fontType = "arial";
var fontSize = 10;
var leftMargin = 10;
var normalBoxLength = 28;
var separation = 4.4; 
var heightSeparation = 11;
var diagonalLogo = 'data:image/jpeg;base64,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';

var marginTop = 29;
var marginBottom = 29;
var rowSize = 5;
var mediumSpaceFactor = 1.3;
var dobleSpaceFactor = 1.6;
var tripleSpaceFactor = 2;

var newGetTotalSpaceNeededForText = function(textToAdd){
    
    //Filtro todos los types text y cada uno ocupa rowSize
    var total = textToAdd.map(currentText => currentText.type).filter(type => type =='text').length*rowSize;
    //Filtro todos los types que tiene title (subtitle1, 2, 3 etc) y cada uno ocupa rowSize*medium
    total += textToAdd.map(currentText => currentText.type).filter(type => type.includes('title')).length*rowSize*mediumSpaceFactor;
    //Filtro todos los tipo list y concateno todos los values de esto, de esa forma obtengo un array con todos los values, cada value ocupa rowSize
    total += textToAdd.filter(currentText => currentText.type == 'list').length*rowSize;
    total +=[].concat.apply([],textToAdd.filter(currentText => currentText.type == 'list' && Array.isArray(currentText.value)).map(currentText => currentText.value)).length*rowSize;
    return total;
}

var newAddText = function(textToAdd, doc, top){
    for (var i = 0; i < textToAdd.length;i++){
        text = textToAdd[i];
        var currentIncreaseTop = 0;
        switch (text.type){
            case 'text':
                var scale = writeTextNormalAndBold(fontSize,fontType, text.name + ":", text.value, top,doc);
                currentIncreaseTop = rowSize*scale;
                break;
            case 'title':
                top = increaseTop(top,rowSize,doc);
                var scale = writeTextNormalAndBold(20,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle1':
                top = increaseTop(top,rowSize,doc);
                var scale = writeTextNormalAndBold(18,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle2':
                top = increaseTop(top,rowSize/2,doc);
                var scale = writeTextNormalAndBold(16,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
                case 'subtitle3':
                top = increaseTop(top,rowSize/2,doc);
                var scale = writeTextNormalAndBold(14,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle4':
                top = increaseTop(top,rowSize/2,doc);
                var scale = writeUnderlinedText(12,fontType,text.name, top, doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle5':
                var scale = writeTextNormalAndBold(fontSize,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*scale;
                break;
            case 'subtitle6':
                var scale = writeTextNormalAndBold(12,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle3price':
                top = increaseTop(top,rowSize/2,doc);
                var scale = writeTextNormalAndBold(14,fontType,text.name, text.value, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle4price':
                top = increaseTop(top,rowSize/2,doc);
                var scale = writeTextNormalAndBold(13,fontType,text.name, text.value, top, doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle5price':
                var scale = writeItalicText(12,fontType,text.name, top,doc);
                currentIncreaseTop = rowSize*scale;
                break;
            case 'subtitle6price':
                var scale = writeTextNormalAndBold(11,fontType,text.value,text.name, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'subtitle7price':
                var scale = writeUnderlinedText(10,fontType,text.name, top,doc);
                currentIncreaseTop = rowSize*mediumSpaceFactor*scale;
                break;
            case 'list':
                if (Array.isArray(text.value)){
                    var scale = writeTextNormalAndBoldWithSeparation(fontSize, fontType, '    •  ' , '',text.name,top, doc);
                    currentIncreaseTop = rowSize*scale;
                    for (var j = 0; j < text.value.length;j++){
                        if(Array.isArray(text.value[j])){
                            scale = writeTextNormalAndBoldWithSeparation(fontSize, fontType,'        »  ', text.value[j][0] + ':',text.value[j][1],top + currentIncreaseTop, doc);
                            currentIncreaseTop += rowSize*scale;
                        }else{
                            scale = writeTextNormalWithSeparation(fontSize, fontType,'        »  ', text.value[j],top + currentIncreaseTop, doc);
                            currentIncreaseTop += rowSize*scale;
                        }
                    }
                }else if (text.value && text.value.length>0){
                    var scale = writeTextNormalAndBoldWithSeparation(fontSize, fontType,'    •  ', text.name +  ":", text.value, top, doc);
                    currentIncreaseTop = rowSize*scale;
                }else{
                    var scale = writeTextNormalWithSeparation(fontSize, fontType, '    •  ' , text.name,top, doc);
                    currentIncreaseTop = rowSize*scale;
                }
                break;
        }
        top = increaseTop(top,currentIncreaseTop,doc);
    }
    return top;
}

var groupFinishes = function(finishesToGroup){
    var finishes = [];
    for (var i = 0; i < finishesToGroup.length; i++){
        var currentFinishes = [];
        var finish = {};
        var price = {};
        finish.price = [];
        for (var key in finishesToGroup[i]) {
            if(key != "workId" && key!= "optionalFinishes" && key !="items"){
                price[key] = finishesToGroup[i][key];
            }
        }
        var optionalFinishPrice = finishesToGroup[i].optionalFinishes;
        if (optionalFinishPrice){
            for (var j = 0; j < optionalFinishPrice.length;j++){
                finish.item = -1;
                var currentFinish = JSON.parse(JSON.stringify(finish));
                var currentPrice = JSON.parse(JSON.stringify(price));
                var currentOptionalFinish = optionalFinishPrice[j];
                for (var key in currentOptionalFinish) {
                    if (key !="price"){
                        currentFinish[key] = currentOptionalFinish[key];
                    }else{
                        currentPrice[key] = currentOptionalFinish[key];
                    }
                }
                currentFinish.price.push(currentPrice);
                currentFinishes.push(currentFinish);
            }
        }
        if (finishesToGroup[i].items){
            for (var j = 0; j < finishesToGroup[i].items.length;j++){
                if(finish.item = finishesToGroup[i].items[j]){
                    finish.item = finishesToGroup[i].items[j].id;
                    var optionalFinishPrice = finishesToGroup[i].items[j].optionalFinishes;
                    if (optionalFinishPrice){
                        for (var k = 0; k < optionalFinishPrice.length;k++){
                            var currentFinish = JSON.parse(JSON.stringify(finish));
                            var currentPrice = JSON.parse(JSON.stringify(price));
                            var currentOptionalFinish = optionalFinishPrice[k];
                            for (var key in currentOptionalFinish) {
                                if (key !="price"){
                                    currentFinish[key] = currentOptionalFinish[key];
                                }else{
                                    currentPrice[key] = currentOptionalFinish[key];
                                }
                            }
                            currentFinish.price.push(currentPrice);
                            currentFinishes.push(currentFinish);
                        }
                    }  
                }
            }
        }
        //reviso si hay algún finish así ya agregado
        var alreadyExist = false;
        for (var k = 0; k < currentFinishes.length;k++){
            var currentFinish = currentFinishes[k];
            for (var j = 0; j < finishes.length; j++){
                if (finishes[j].item == currentFinish.item && finishes[j].finish == currentFinish.finish && finishes[j].finishComment == currentFinish.finishComment &&
                    finishes[j].showToClientFinish == currentFinish.showToClientFinish){
                    finishes[j].price.push(currentFinish.price[0]);
                    alreadyExist = true;
                    break;
                }
            }
            if (!alreadyExist){
                finishes.push(currentFinish);
            }
        }
    }
    return finishes;
}

var addHeaderToCurrentPage = function(doc){
    doc.addImage(diagonalLogo, 'JPEG', leftMargin, rowSize, 48, 13); 
    var width = doc.internal.pageSize.width;
    doc.line(leftMargin,rowSize+13+5,width-leftMargin,rowSize+13+5);
}

var addFooterToCurrentPage = function(doc){
    var height = doc.internal.pageSize.height;
    var width = doc.internal.pageSize.width;
    var currentTop = height-marginBottom+5;
    doc.line(leftMargin,currentTop ,width-leftMargin,currentTop);
    currentTop += rowSize*mediumSpaceFactor;
    doc.text("imprentadiagonal.com.uy | +598 2 901 2151",leftMargin,currentTop);
    currentTop += rowSize;
    doc.text("Nesta Ltda - RUT 21 338291 0014",leftMargin,currentTop);
    currentTop += rowSize;
    doc.text("Convención 1319 C.P. 11300, Montevideo, UY",leftMargin,currentTop);
}

var increaseTop = function(top,add,doc){
    if (top+add > doc.internal.pageSize.height - marginBottom){
        addHeaderToCurrentPage(doc);
        addFooterToCurrentPage(doc);
        top = marginTop + 10;
        doc.addPage();
    }else{
        top +=add;
    }
    return top;
}

var checkIfEnoughSpace = function(top,totalSpaceNeeded,doc){
    return (top+totalSpaceNeeded > doc.internal.pageSize.height - marginBottom?false:true);
}

var addNewPage = function(doc){
    addHeaderToCurrentPage(doc);
    addFooterToCurrentPage(doc);
    doc.addPage();
    return marginTop + 10;
}
  
var newAddTextToDoc = function(textToAdd,doc,top){
    if(textToAdd && textToAdd.length>0){
        if(!checkIfEnoughSpace(top,newGetTotalSpaceNeededForText(textToAdd),doc)){
            top = addNewPage(doc);
        }
        top = newAddText(textToAdd,doc,top);
        top = increaseTop(top,rowSize,doc);
    }
    return top;
}

var generateEstimatePDF = function(estimate){
    var doc = new jsPDF();
    var top = marginTop;
    doc.setFont(fontType);
    doc.setFontSize(fontSize);


    var width = doc.internal.pageSize.width;
    var day = new Date();
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    doc.text('Montevideo, ' + day.toLocaleDateString('es-UY', options),width-leftMargin,top,'right');
    top = increaseTop(top,rowSize*tripleSpaceFactor,doc);

    var contactAndBusinessInfo = estimate.customer?[estimate.customer.comercialName, estimate.customer.businessName, estimate.customer.contactName]:[];
    var textToAdd = [];
    textToAdd.push(createText('subtitle5','', contactAndBusinessInfo.filter(Boolean).join(' - ')));
    textToAdd.push(createText('subtitle5','Presente',''));
    textToAdd.push(createText('subtitle5',"A continuación detallamos el presupuesto solicitado.",''));
    top = newAddTextToDoc(textToAdd,doc,top);

    textToAdd = createGeneralText(estimate,false,true);
    for (var i = 0; i < estimate.items.length;i++){
        textToAdd = textToAdd.concat(createItemText(estimate, estimate.items[i], false, false, false,true));
    }
    top = newAddTextToDoc(textToAdd,doc,top);
   
    textToAdd = createCompletePriceText(estimate);
    top = newAddTextToDoc(textToAdd,doc,top);

    textToAdd = createOptionalFinishesText(estimate,true);
    top = newAddTextToDoc(textToAdd,doc,top);

    /*if(!checkIfEnoughSpace(top,rowSize*mediumSpaceFactor + rowSize*5,doc)){
        top = addNewPage(doc);
    };*/
    textToAdd = [];
    textToAdd.push(createText('subtitle2', "Condiciones generales", ''));
    textToAdd.push(createText('list', "Mantenimiento de oferta 20 días.", ''));
    textToAdd.push(createText('list', "Forma de pago " + ((estimate.customer && estimate.customer.paymentWay && estimate.customer.paymentWay!="")?estimate.customer.paymentWay:'Seña del 50% y saldo contra-entrega.'), ''));
    textToAdd.push(createText('list', "Precio unitario basado en unidades descritas o más.", ''));
    textToAdd.push(createText('list', "El precio no incluye el costo de diseño o gráficos de banco de imágenes.", ''));
    textToAdd.push(createText('list', "Precios NO incluyen IVA.", ''));
    textToAdd.push(createText('list', "Entrega entre " + ((estimate.productionTime && estimate.productionTime!="")?estimate.productionTime:"10 y 15 días hábiles") + " una vez confirmada la seña y recibido el diseño en formato adecuado para impresión.", ''));
    top = newAddTextToDoc(textToAdd,doc,top);

    textToAdd = [];
    textToAdd.push(createText('subtitle2', "Formas de pago", ''));
    textToAdd.push(createText('list', "Por transferencia o Depósito:", ["BROU - C.C. en pesos 001555948-00002 a nombre de Nesta Ltda."]));
    textToAdd.push(createText('list', "Abitab o RedPagos:", ["Se debe concurrir a cualquiera de ellos y pedir para hacer un depósito en el BROU C.C. 188-0001815 a nombre de Nesta Ltda., esta forma de pago no tiene ningún costo para el cliente."]));
    top = newAddTextToDoc(textToAdd,doc,top);
    
    addHeaderToCurrentPage(doc);
    addFooterToCurrentPage(doc);

    var docName = "Presupuesto";
    var contactAndBusinessInfo = estimate.customer?[estimate.customer.comercialName, estimate.customer.businessName, estimate.customer.contactName]:[];
    contactAndBusinessInfo = contactAndBusinessInfo.filter(Boolean).join(' ');
    docName += (contactAndBusinessInfo?' ' + contactAndBusinessInfo+".pdf":".pdf");
    doc.save(docName);
}

var writeText = function(doc, text, top,extraSpace){
    var textSplited = doc.splitTextToSize(text,  doc.internal.pageSize.width - leftMargin*2 - (extraSpace?extraSpace:0));
    doc.text(textSplited,leftMargin + (extraSpace?extraSpace:0),top);
    return textSplited.length;
}

var writeTextNormalAndBold = function(fontSize, fontType, textNormal, textBold, top, doc){
    doc.setFont(fontType);
    doc.setFontSize(fontSize);
    writeText(doc,textNormal,top);
    var currentTextWidth = doc.getStringUnitWidth(textNormal, {fontName: fontType, fontStyle:'Normal'}) * fontSize / doc.internal.scaleFactor;
    doc.setFontType("bold");
    var scale = writeText(doc,(textNormal.length>0?' ':'')+textBold,top, currentTextWidth);
    doc.setFontType("normal");
    return scale;
}


var writeTextNormalWithSeparation = function(fontSize, fontType, textSeparator, text, top, doc){
    doc.setFont(fontType);
    doc.setFontSize(fontSize);
    writeText(doc,textSeparator,top);
    var currentTextWidth = doc.getStringUnitWidth(textSeparator, {fontName: fontType, fontStyle:'Normal'}) * fontSize / doc.internal.scaleFactor;
    return writeText(doc,text,top, currentTextWidth);
}

var writeTextNormalAndBoldWithSeparation = function(fontSize, fontType, textSeparator, text, textBold, top, doc){
    doc.setFont(fontType);
    doc.setFontSize(fontSize);
    writeText(doc,textSeparator,top);
    var currentTextWidth = doc.getStringUnitWidth(textSeparator, {fontName: fontType, fontStyle:'Normal'}) * fontSize / doc.internal.scaleFactor;
    writeText(doc,text,top, currentTextWidth);
    doc.setFontType("bold");
    var currentTextWidth = currentTextWidth + doc.getStringUnitWidth(text, {fontName: fontType, fontStyle:'Normal'}) * fontSize / doc.internal.scaleFactor;
    var scale = writeText(doc,textBold,top, currentTextWidth);
    doc.setFontType("normal");
    return scale;

}

var writeUnderlinedText = function(fontSize, fontType, text, top, doc){
    doc.setFontSize(fontSize);
    var scale = writeText(doc,text,top);
    var currentTextWidth = doc.getStringUnitWidth(text, {fontName: fontType, fontStyle:'Normal'}) * (fontSize / doc.internal.scaleFactor);
    doc.line(leftMargin,top+1,leftMargin+currentTextWidth,top+1);
    doc.setFontSize(fontSize);
    return scale;
}

var writeItalicText = function(fontSize, fontType, text, top, doc){
    doc.setFontSize(fontSize);
    doc.setFontType("italic");
    var scale = writeText(doc,text,top);
    //var currentTextWidth = doc.getStringUnitWidth(text, {fontName: fontType, fontStyle:'italic'}) * (fontSize / doc.internal.scaleFactor);
    //doc.line(leftMargin,top+1,leftMargin+currentTextWidth,top+1);
    doc.setFontSize(fontSize);
    doc.setFontType("Normal");
    return scale;
}

var workOrderPDF = function(estimate){
    var firstColumn = leftMargin;
    var secondColumn = (separation+normalBoxLength)+leftMargin
    var thirdColumn = 2*(separation+normalBoxLength)+leftMargin;
    var fourthColumn = 3*(separation+normalBoxLength)+leftMargin;
    var fifthColumn = 4*(separation+normalBoxLength)+leftMargin;
    var sixthColumn = 5*(separation+normalBoxLength)+leftMargin;
    var doc = new jsPDF();
    doc.setFont(fontType);
    doc.setFontSize(fontSize);

    doc.addImage(diagonalLogo, 'JPEG', leftMargin, 5, 97, 26); 
    writeTextInDoc(doc,"Prometido","<Prometido>",fifthColumn,8,normalBoxLength*2+separation);
    writeTextInDoc(doc,"Orden N°","<Orden n°>",fifthColumn,19,normalBoxLength);
    writeTextInDoc(doc,"Fecha de Ingreso","<Fecha de Ingreso>",sixthColumn,19,normalBoxLength);

    var height = heightSeparation*3;

    var selectedOption = estimate.selectedOption?estimate.selectedOption:0;
    var selectedEstimate = estimate.prices[selectedOption];
    writeTextInDoc(doc,"Nombre / Empresa",(estimate.customer?estimate.customer.comercialName:'') + " / " + (estimate.customer?estimate.customer.businessName:'') ,firstColumn,height,normalBoxLength*4+separation*3);
    writeTextInDoc(doc,"Cantidad",selectedEstimate.quantity,fifthColumn,height,normalBoxLength*2+separation);
   

    for (var i = 0; i < estimate.items.length;i++){
        var item = estimate.items[i];
        var selectedItem = selectedEstimate.items[i];
        var inksFront;
        var inksBack;
        var faces;
        var inksQuantity = selectedItem.inksQuantity + '';
        if(inksQuantity.indexOf("/")>0){
            inksFront = inksQuantity.split("/")[0];
            inksBack= inksQuantity.split("/")[1];
            faces = inksBack>0?1:2;
        }else{
            inksFront = inksQuantity;
            inksBack= selectedItem.faces?(selectedItem.faces=="Simple Faz"?0:inksQuantity):0;
            faces = (selectedItem=="Simple Faz"?1:2);
        }
        var coefficient = faces/selectedItem.quantityOfPages;
        var sheets = Math.ceil(selectedEstimate.quantity/selectedItem.quantityPerPaper)*coefficient;
      
        height += heightSeparation;
        writeTextInDoc(doc,"","Trabajo " + item.name + " " + (faces==1?"Simple Faz":"Doble Faz"),firstColumn, height, normalBoxLength*2+separation,[0,0,0],[255,255,255]);
        doc.line(firstColumn, height+rowSize, firstColumn + normalBoxLength*6+separation*5, height+rowSize); 

        height += heightSeparation;
        writeTextInDoc(doc,"Armado x Pliego",selectedItem.quantityPerPaper,firstColumn,height,normalBoxLength);
        writeTextInDoc(doc,"Tamaño Abierto",selectedItem.openedSize, secondColumn, height, normalBoxLength);
        writeTextInDoc(doc,"Tamaño Cerrado",estimate.closedSize, thirdColumn,height, normalBoxLength);
        writeTextInDoc(doc,"Páginas",selectedItem.quantityOfPages,fifthColumn,height,normalBoxLength);
        writeTextInDoc(doc,"Vías",selectedItem.quantityOfVias,sixthColumn,height,normalBoxLength);

        height += heightSeparation;
        writeTextInDoc(doc,"","Papel",firstColumn, height, normalBoxLength*2+separation,[0,0,0],[255,255,255]);
        doc.line(firstColumn, height+rowSize, firstColumn + normalBoxLength*6+separation*5, height+rowSize); 

        height += heightSeparation;
        writeTextInDoc(doc,"Tipo de Papel",selectedItem.paper ,firstColumn,height,normalBoxLength*3 + separation*2);
        writeTextInDoc(doc,"Gr.",selectedItem.gr,fourthColumn ,height, normalBoxLength);
        writeTextInDoc(doc,"Tamaño de papel",selectedItem.sheetSize,fifthColumn, height, normalBoxLength*2 + separation);

        height += heightSeparation;
        writeTextInDoc(doc,"Cantidad de hojas a cortar x cada vía",((sheets + selectedItem.excess)/selectedItem.cutsPerSheet)+"",firstColumn,height, normalBoxLength*2 + separation);
        writeTextInDoc(doc,"Cortado en",selectedItem.cutsPerSheet,thirdColumn, height, normalBoxLength);
        writeTextInDoc(doc,"Tamaño del Pliego",selectedItem.paperSize,fourthColumn, height, normalBoxLength);
        writeTextInDoc(doc,"Cantidad de trozos x cada vía",sheets + " + Demasía",fifthColumn, height, normalBoxLength*2 + separation);

        height += heightSeparation;
        writeTextInDoc(doc,"","Impresión  " + selectedItem.machine,firstColumn, height, normalBoxLength*2+separation,[0,0,0],[255,255,255]);
        doc.line(firstColumn, height+rowSize, firstColumn + normalBoxLength*6+separation*5, height+rowSize); 

        height += heightSeparation;
        writeTextInDoc(doc,"Armado",selectedItem.quantityPerPaper,firstColumn,height,normalBoxLength);
        writeTextInDoc(doc,"Tamaño del pliego",selectedItem.paperSize,secondColumn ,height, normalBoxLength);
        writeTextInDoc(doc,"Demasía",selectedItem.excess,thirdColumn, height, normalBoxLength);
        writeTextInDoc(doc,"Tiraje con Demasía",sheets + "",fourthColumn,height, normalBoxLength);
        doc.text(fifthColumn, height+rowSize + rowSize-1.5, "Por cada vía y color");

        height += heightSeparation;
        writeTextInDoc(doc,"Tamaño final abierto",selectedItem.openedSize,firstColumn,height,normalBoxLength*2 + separation);
        writeTextInDoc(doc,"Cantidad final de pasadas de máquina por color con demasía","<Cantidad final de pasadas de máquina por color con demasía>",thirdColumn ,height, normalBoxLength*2 + separation);
        
        height += heightSeparation;
        writeTextInDoc(doc,"Tintas",selectedItem.inksQuantity,firstColumn, height, normalBoxLength);
        writeTextInDoc(doc,"Chapas",inksBack + inksFront + "",secondColumn,height, normalBoxLength);

        height += heightSeparation;
        writeTextInDoc(doc,"","Terminaciones",firstColumn, height, normalBoxLength*2+separation,[0,0,0],[255,255,255]);
        doc.line(firstColumn, height+rowSize, firstColumn + normalBoxLength*6+separation*5, height+rowSize); 

        height += heightSeparation - rowSize;
    }

    writeTextInDoc(doc,"","Comentarios",firstColumn, height, normalBoxLength*2+separation,[0,0,0],[255,255,255]);
    doc.line(firstColumn, height+rowSize, firstColumn + normalBoxLength*6+separation*5, height+rowSize); 
    height += rowSize;
    if(estimate.comments){
        doc.text(firstColumn, height+rowSize + rowSize-1.5, estimate.comments.internalComments);
    }
    doc.save('OrdenDeTrabajo.pdf');
    return true;
};

var writeTextInDoc = function(doc,name,value,x,y,boxLength,boxBackgroundColor,fontColor){
    var fill;
    value = value+'';
    doc.text(x, y + rowSize-1.5, name);

    if (boxBackgroundColor && boxBackgroundColor.length === 3){
        fill = 'F';
        doc.setFillColor(boxBackgroundColor[0],boxBackgroundColor[1],boxBackgroundColor[2]);
    }
    doc.rect(x, y+rowSize, boxLength, rowSize,fill);

    doc.setFontType("bold");
    if(fontColor && fontColor.length === 3){
        doc.setTextColor(fontColor[0],fontColor[1],fontColor[2]);
    }
    doc.text(x+boxLength/2, y+rowSize + rowSize-1.5, value, null, null, 'center');

    resetDocProperties(doc);
    return doc;
};

var resetDocProperties = function (doc){
    doc.setFillColor(255,255,255);
    doc.setFontType("normal");
    doc.setTextColor(0,0,0);

}

var getWorkOrderPDFCallBack = function(t){
    var cardInfoKey = 'pappira.cardInfo';
    return t.get('card', 'shared', cardInfoKey)
    .then(function(cardInfo){  
        return workOrderPDF(deTranslateEstimate(JSON.parse( LZString.decompress(cardInfo))));
    });
};

var getEstimateCallBack = function(t){
    var cardInfoKey = 'pappira.cardInfo';
    return t.get('card', 'shared', cardInfoKey)
    .then(function(cardInfo){
        return generateEstimatePDF(deTranslateEstimate(JSON.parse( LZString.decompress(cardInfo))));
    });
};

