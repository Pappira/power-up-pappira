var works = [
    {
      'id':0,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'90x54mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['90x54mm']
            },
          ]
        },
        {
          'value':'90x50mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['90x50mm']
            },
          ]
        }
      ],
      'image':tarjetaImage,
      'name':'Tarjetas Personales',
      'quantity':[50,100,200,300,500,1000],
      "mandatoryFinishGroups":
      [
        {
          "groupName": "Variaciones",
          "finishes":
          [
            {
              "finish":"Todas iguales",
              "finishComment":"Todas las tarjetas personales a imprimir son idénticas, sin ningún tipo de variante",
              "showToClientFinish":false
            },
            {
              "finish":"Un cambio de nombre",
              "finishComment":"Todas las tarjetas personales tienen el mismo diseño base, y la única variante es que se tendrá datos personales de 2 personas",
              "showToClientFinish":true
            },
            {
              "finish":"Dos cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Tres cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Cuatro cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Cinco cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Seis cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Siete cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Ocho cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Nueve cambios de nombre",
              "finishComment":"",
              "showToClientFinish":true
            }
          ]
        }
      ],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            },
            {
              'inksDetails':'Tinta negra',
              'inksQuantity':1,
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'quantityOfVias':[1],
          'openedSize':[],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ],
          "optionalFinishes":
          [
            {
              "finish":"Laminado Mate",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Brillo",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Mate o Brillo a definir",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Puntas redondeadas",
              "finishComment":"",
              "showToClient":true
            }
          ]
        }
      ]
    },
    {
      "id":1,
      "workTypeId":1,
      "workType":"Encuadernados",
      "image":noImage,
      "name":"Cuaderno",
      "clossedSizes":["150x210mm"],
      "quantity":[50,100,200,300,500,1000],
      "mandatoryFinishGroups":
      [
        {
          "groupName": "Encuadernado",
          "finishes":
          [
            {
              "finish":"HotMelt",
              "finishComment":"",
              "showToClientFinish":true,
              "incidences":
              [
                {
                  "itemId":-1,
                  "type":"optionalFinishes",
                  "action":"add",
                  "values":
                  [
                    {
                      "finish":"Marca Páginas",
                      "finishComment":"",
                      "showToClientFinish":true
                    }
                  ]
                }
              ]
            },
            {
              "finish":"Rulo Wire-o",
              "finishComment":"",
              "showToClientFinish":true
            },
            {
              "finish":"Cosido con dos grapas",
              "finishComment":"",
              "showToClientFinish":true
            }
          ]
        }
      ],
      "items":
      [
        {
          "id":0,
          "name":"Tapa y contratapa",
          "bleedPrint":true,
          "inks":[
            {
              "inksDetails":"Full color",
              "inksQuantity":4
            }
          ],
          "openedSize":["150x210mm"],
          "allTheSame":false,
          "mandatoryFinishGroups":
          [
            {
              "groupName": "Tipo de Tapa",
              "finishes": 
              [
                {
                  "finish":"Tapa Flexible",
                  "finishComment":"",
                  "showToClientFinish":true,
                  "incidences":
                  [
                    {
                      "itemId":0,
                      "type":"materials",
                      "action":"replace",
                      "values":
                      [
                        {
                          "paper":"Cartulina Blanca/Blanca",
                          "gr":"250"
                        },
                        {
                          "paper":"Coteado",
                          "gr":"300"
                        }
                      ]
                    }
                  ]
                },
                {
                  "finish":"Tapa SemiDura",
                  "finishComment":"",
                  "showToClientFinish":true,
                  "incidences":
                  [
                    {
                      "itemId":0,
                      "type":"materials",
                      "action":"replace",
                      "values":
                      [{
                        "paper":"Cartulina Blanca/Blanca",
                        "gr":"250"
                      }]
                    },
                    {
                      "itemId":-1,
                      "type":"optionalFinishes",
                      "action":"add",
                      "values":
                      [
                        {
                          "finish":"Cierre Elástico",
                          "finishComment":"",
                          "showToClientFinish":true
                        }
                      ]
                    }
                  ]
                },
                {
                  "finish":"Tapa Dura",
                  "finishComment":"",
                  "showToClientFinish":true,
                  "incidences":
                  [
                    {
                      "itemId":0,
                      "type":"materials",
                      "action":"replace",
                      "values":
                      {
                        "paper":"Coteado",
                        "gr":"150"
                      }
                    },
                    {
                      "itemId":-1,
                      "type":"optionalFinishes",
                      "action":"add",
                      "values":
                      [
                        {
                          "finish":"Cierre Elástico",
                          "finishComment":"",
                          "showToClientFinish":true
                        }
                      ]
                    }
                  ]
                }
              ] 
            }
          ],
          "quantityOfPages":[2],
          "quantityOfVias":[1],
          "faces":["Simple Faz","Doble Faz"],
          "materials":[
            {
              "paper":"Cartulina Blanca/Blanca",
              "gr":"250"
            },
            {
              "paper":"Coteado",
              "gr":"300"
            },
            {
              "paper":"Coteado",
              "gr":"150"
            }
          ],
          "optionalFinishes":
          [
            {
              "finish":"Laminado Mate",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Brillo",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Mate o Brillo a definir",
              "finishComment":"",
              "showToClient":true
            }
          ]
        },
        {
          "id":1,
          "name":"Interior",
          "bleedPrint":true,
          "inks":
          [
            {
              "inksDetails":"Sin imprimir",
              "inksQuantity":0
            },
            {
              "inksDetails":"Tinta Negra",
              "inksQuantity":1
            },
            {
              "inksDetails":"2 tintas",
              "inksQuantity":2
            }
          ],
          "openedSize":["150x210mm"],
          "allTheSame":false,
          "quantityOfPages":[50,70,100],
          "quantityOfVias":[1],
          "faces":["Simple Faz","Doble Faz"],
          "materials":
          [
            {
              "paper":"Obra Blanco",
              "gr":"80"
            },
            {
              "paper":"Obra Blanco",
              "gr":"90"
            },
            {
              "paper":"Rayado estándar",
              "gr":"70"
            }
          ]
        } 
      ],
      "optionalFinishes":[]
    },
    {
      'id':2,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'100x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['100x150mm']
            },
          ]
        },  
        {
          'value':'150x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['150x150mm']
            },
          ]
        },        
        {
          'value':'130x170mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['130x170mm']
            },
          ]
        },        
        {
          'value':'120x180mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['120x180mm']
            },
          ]
        },        
        {
          'value':'130x190mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['130x190mm']
            },
          ]
        },        
        {
          'value':'150x220mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['150x220mm']
            },
          ]
        }
      ],
      'image':noImage,
      'name':'Tarjetas de invitación',
      'quantity':[10,50,100,300],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ],
          "optionalFinishes":
          [
            {
              "finish":"Laminado Mate",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Brillo",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Mate o Brillo a definir",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Puntas redondeadas",
              "finishComment":"",
              "showToClient":true
            }
          ]
        }
      ]
    },
    {
      'id':3,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'160x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['160x300mm']
            },
          ]
        },  
        {
          'value':'200x140mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['200x280mm']
            },
          ]
        }
      ],
      'image':noImage,
      'name':'Tarjetas de invitación díptico',
      'quantity':[10,50,100,300],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ],
          "optionalFinishes":
          [
            {
              "finish":"Laminado Mate",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Brillo",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Mate o Brillo a definir",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Puntas redondeadas",
              "finishComment":"",
              "showToClient":true
            }
          ]
        }
      ]
    },
    {
      'id':4,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'160x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['160x310mm']
            }
          ]
        },
        {
          'value':'200x140mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['200x290mm']
            }
          ]
        }
      ],
      'image':noImage,
      'name':'Tarjetas de invitación tríptico ventana',
      'quantity':[10,50,100,300],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ],
          "optionalFinishes":
          [
            {
              "finish":"Laminado Mate",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Brillo",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Laminado Mate o Brillo a definir",
              "finishComment":"",
              "showToClient":true
            },
            {
              "finish":"Puntas redondeadas",
              "finishComment":"",
              "showToClient":true
            }
          ]
        }
      ]
    },
    {
      'id':5,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'140x180mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['140x180mm']
            },
          ]
        }
      ],
      'image':noImage,
      'name':'Sobres de Invitación ya armados',
      'quantity':[10,50,100,300,500],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Sin Imprimir',
              'inksQuantity':0,
            },
            {
              'inksDetails':'Tinta Negra',
              'inksQuantity':1,
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz'],
          'materials':[
            {
              'paper':'Sobre Blanco Gallito',
              'gr':'110'
            },
            {
              'paper':'Sobre Tarjeta Colores',
              'gr':'120'
            },
            {
              'paper':'Sobre Tarjeta Colores',
              'gr':'180'
            }
          ]
        }
      ]
    },
    {
      'id':6,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'160x160mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['160x160mm']
            },
          ]
        },
        {
          'value':'140x180mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['140x180mm']
            },
          ]
        },
        {
          'value':'120x230mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['120x230mm']
            },
          ]
        }
      ],
      'image':noImage,
      'name':'Sobres de Invitación troquelados',
      'quantity':[50,100,300],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Sin Imprimir',
              'inksQuantity':0,
            },
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            },
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ]
        }
      ]
    },
    {
      'id':7,
      'workTypeId':0,
      'workType':'Tarjetería',
      'clossedSizes':[
        {
          'value':'150x130mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['160x320mm']
            },
          ]
        },
        {
          'value':'140x140mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['160x320mm']
            },
          ]
        },
        {
          'value':'200x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['230x150mm']
            },
          ]
        },
        {
          'value':'230x155mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['260x320mm']
            },
          ]
        },
        {
          'value':'220x220mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['250x480mm']
            },
          ]
        }
      ],
      'image':noImage,
      'name':'Sobres de Invitación pegados (sin troquelar)',
      'quantity':[10,50,100,300],
      'items':[
        {
          'id':0,
          'name':'Tarjeta',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Sin Imprimir',
              'inksQuantity':0,
            },
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            },
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':[
            {
              'paper':'Coteado',
              'gr':'300'
            },
            {
              'paper':'Opalinas',
              'gr':'230'
            },
            {
              'paper':'Magic',
              'gr':'180'
            },
            {
              'paper':'Ecoria Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Milenium Tipo Reciclado',
              'gr':'240'
            },
            {
              'paper':'Jazmin',
              'gr':'240'
            }
          ]
        }
      ]
    },
    {
      'id':8,
      'workTypeId':2,
      'workType':'Folletería',
      'image':noImage,
      'name':'Volantes Digital',
      'quantity':[200,500,1000,2000,4000],
      'items':
      [
        {
          'id':0,
          'name':'Volantes Digital',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Tinta Negra',
              'inksQuantity':1,
            },          
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            },
            {
              'inksDetails':'Full color frente - Tinta Negra dorso',
              'inksQuantity':4/1, 
              "mandatoryChanges":
              [
                {
                  "itemId":0,
                  "type":"faces",
                  "values":['Doble Faz']
                },
              ]
            },
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':
          [
            {
              'paper':'Coteado',
              'gr':'130',
              "incidences":
              [
                {
                  "itemId":-1,
                  "type":"clossedSizes",
                  "action":"add",
                  "values":
                  [
                    {
                      'value':'105x155mm',
                      "mandatoryChanges":
                      [
                        {
                          "itemId":0,
                          "type":"openedSize",
                          "values":['105x155mm']
                        },
                      ]
                    },
                    {
                      'value':'155x220mm',
                      "mandatoryChanges":
                      [
                        {
                          "itemId":0,
                          "type":"openedSize",
                          "values":['155x220mm']
                        },
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'paper':'Obra',
              'gr':'80',
              "incidences":
              [
                {
                  "itemId":-1,
                  "type":"inks",
                  "action":"add",
                  "values":
                  [
                    {
                      'inksDetails':'Tinta Negra fondo blanco sin grisados',
                      'inksQuantity':1,
                    }
                  ]
                }
              ]
            },
            {
              'paper':'Obra',
              'gr':'90',
              "incidences":
              [
                {
                  "itemId":-1,
                  "type":"clossedSizes",
                  "action":"add",
                  "values":
                  [
                    {
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      'clossedSizes':
      [
        {
          'value':'105x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['105x150mm']
            },
          ]
        },
        {
          'value':'120x190mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['120x190mm']
            },
          ]
        },
        {
          'value':'130x180mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['130x180mm']
            },
          ]
        },
        {
          'value':'150x220mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['150x220mm']
            },
          ]
        },
        {
          'value':'220x310mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['220x310mm']
            },
          ]
        }
      ]
    },
    {
      'id':9,
      'workTypeId':2,
      'workType':'Folletería',
      'image':noImage,
      'name':'Volantes Offset',
      'quantity':[500,1000,2000,4000,5000,10000],
      'items':
      [
        {
          'id':0,
          'name':'Volantes Offset',
          'bleedPrint':true, 
          'inks':[
            {
              'inksDetails':'Tinta Negra',
              'inksQuantity':1,
            },          
            {
              'inksDetails':'Full color',
              'inksQuantity':4,
            },
            {
              'inksDetails':'Tinta Color de lata',
              'inksQuantity':1, 
            },
            {
              'inksDetails':'Tinta Color Pantone',
              'inksQuantity':1, 
            }
          ],
          'allTheSame':false,
          'quantityOfPages':[1],
          'openedSize':[],
          'quantityOfVias':[1],
          'faces':['Simple Faz','Doble Faz'],
          'materials':
          [
            {
              'paper':'Coteado',
              'gr':'130',
            }
          ]
        }
      ],
      'clossedSizes':
      [
        {
          'value':'100x150mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['100x150mm']
            },
          ]
        },
        {
          'value':'150x200mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['150x200mm']
            },
          ]
        },
        {
          'value':'210x297mm',
          "mandatoryChanges":
          [
            {
              "itemId":0,
              "type":"openedSize",
              "values":['210x297mm']
            },
          ]
        }
      ]
    },

];