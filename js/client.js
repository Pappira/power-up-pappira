"use strict";

/* global TrelloPowerUp */
// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var ID_ICON = './images/fingerprint.svg';
var ERROR_ICON = './images/error.svg';
var OK_ICON = './images/check.svg';
var SNOOZE_ICON = './images/notifications_active.svg';
var ERROR_COLOR = 'red';
var SUCCESS_COLOR = 'green';
var emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

var setPappiraCardId = function(t, id){
  t.set('card', 'shared', 'pappira.id', id);
};
var getPappiraCardId = function(t){
  return t.get('card', 'shared', 'pappira.id');
};
var removePappiraCardId = function(t){
  return t.remove('card', 'shared', 'pappira.id');
};
var isAuthorized = function(t){
  return t.get('member', 'private', 'token')
  .then(function(token){
    if(token){
      if(!Trello.token()){
        setTrelloToken(token);
      }
      return { authorized: true };
    } 
    return { authorized: false };
  });  
};
var setTrelloToken = function(token){
  Trello.setToken(token);
};
var setTrelloCardName = function(t, card, name){
  return isAuthorized(t).then(function(authorized){
    if(authorized.authorized){
      return Trello.put("/cards/"+card.id, {name: name});
    }
  });
};
var getTrelloCard = function(t, cardId){
  return isAuthorized(t).then(function(authorized){
    if(authorized.authorized){
      return Trello.get("/cards/"+cardId,{fields: "name,desc,idChecklists,dateLastActivity",checklists: "all"}, function(retrievedCard){return retrievedCard;});
    }
  });
};
var validateCard = function(t, card){
  var valid = false;
  var invalidations = [];
  return Promise.all([
    t.get('board', 'shared', 'pappira.validationTitle', false),
    t.get('board', 'shared', 'pappira.validationDescription', false),
    t.get('board', 'shared', 'pappira.validationChecklist'),
    t.get('board', 'shared', 'pappira.validationEnabled', false),
    t.get('board', 'shared', 'pappira.validationWorkOrder', false),
    getPappiraCardId(t),
    t.get('board', 'shared', 'pappira.validationEmail', false),
    t.get('board', 'shared', 'pappira.idPrefix'),
    t.get('board', 'shared', 'pappira.idSuffix'),
  ])
  .spread(function(
    validationTitle, validationDescription, validationChecklist, validationEnabled, validationWorkOrder, pappiraCardId, validationEmail, idPrefix, idSuffix){
    if(!validationEnabled){
      return false;
    }
    if(validationWorkOrder && pappiraCardId) {
      var foundWO = false;
      var cardIdNumber = pappiraCardId.replace(new RegExp(idPrefix),'').replace(new RegExp(idSuffix+"$"),'');
      var patt = new RegExp("("+pappiraCardId+"|"+cardIdNumber+"){1}(,|\\.)?(\\d){0,2}(\\.pdf){1}", "i");
      if(card.attachments && card.attachments.length){
        for(var i=0;i<card.attachments.length;i++){
          if(patt.test(card.attachments[i].name)) {
            foundWO = true;
            break;
          }
        }
      }
      if(!foundWO){
        invalidations.push("No hay orden de trabajo");
      }
    }
    if(card) {
      if(validationDescription && !card.desc){
        invalidations.push("No hay descripción");
      }
      if(validationTitle && !card.name){
        invalidations.push("No hay título");
      }
      if(validationEmail && card.desc) {
        var match = card.desc.match(/(?:mail:\s*\*\*){1}\s*(\S+)(?:\s*\*\*)?/i);
        if(!match || (match && !match.length) || (match && match.length && !emailRegexp.test(match[match.length-1].trim()))) {
          invalidations.push("No hay email");
        }
      }
      if(validationChecklist && (!card.checklists || (card.checklists && !card.checklists.length))){
        invalidations.push("No hay " + validationChecklist);
      } else if(validationChecklist && card.checklists && card.checklists.length){
        var found = false;
        var patt = new RegExp("("+validationChecklist+"){1}", "i");
        for(var i=0;i<card.checklists.length;i++){
          if(card.checklists[i].checkItems && card.checklists[i].checkItems.length && patt.test(card.checklists[i].name)){
            found = true;
            break;
          }
        }
        if(!found){
          invalidations.push("No hay elementos en " + validationChecklist);
        }
      }
      return invalidations;
    } else {
      return false;
    }
  });
};

var createValidationBadge = function(invalidations, detailed) {
  var badge = {}, text = '', refresh = 60, color = SUCCESS_COLOR, icon = OK_ICON, title = 'Validaciones';
  if(invalidations && invalidations.length){
    if(detailed) {
      if(invalidations.length > 1) {
        text = invalidations.length + ' errores';
      } else {
        text = invalidations[0];
      }
      refresh = 10;
    } else {
      text = invalidations.length;
    }
    color = ERROR_COLOR;
    icon = ERROR_ICON;
    title = 'Errores';
  } else if(invalidations && invalidations.length === 0){
    text = detailed ? 'Completa' : '';
  } else {
    return;
  }
  return {
    title: title,
    text: text,
    icon: icon,
    color: color,
    refresh: refresh,
    invalidations: invalidations
  };
};

var getValidationBadge = function(t, card, detailed) {
  if(card.badges.checkItems > 0) {
    return getTrelloCard(t, card.id).then(function(retrievedCard) {
      card.checklists = retrievedCard.checklists;
      return Promise.all([
        validateCard(t, card, detailed),
        detailed,
      ]).spread(createValidationBadge);
    });
  } else {
    return Promise.all([
      validateCard(t, card, detailed),
      detailed,
    ]).spread(createValidationBadge);
  }
};

var getIdBadge = function(){
  return {
    title: 'Número', // for detail badges only
    text: '',
    icon: ID_ICON, // for card front badges only
    color: null
  };
}; 

var getIdBadgeText = function(idPrefix, idStartNumber, idSuffix, cardId, card){
  if(!cardId){
    var badgeText = "";
    if(idPrefix) {
      badgeText += idPrefix;
    }
    var cardNumber = Number(idStartNumber) + card.idShort;
    badgeText += cardNumber.toString();
    if(idSuffix) {
      badgeText += idSuffix;
    } 
    cardId = badgeText;
  }
  return cardId;
};

var getInactivityBadgeText = function(inactivity, detailed) {
  var day = 1000*60*60*24, text = detailed ? 'Hace ' : '';
  var inactivityInDays = Math.round(inactivity / day);
  if( inactivityInDays > 6) {
    var inactivityInWeeks = Math.round(inactivityInDays/7);
    if(inactivityInWeeks > 4) {
      var inactivityInMonths = Math.round(inactivityInWeeks/4.52);
      if(inactivityInMonths > 12) {
        var inactivityInYears = Math.round(inactivityInMonths / 12);
        text += inactivityInYears;
        text += inactivityInYears > 1 ? ' años' : ' año';
      } else {
        text += inactivityInMonths;
        text += inactivityInMonths > 1 ? ' meses' : ' mes';
      }
    } else {
      text += inactivityInWeeks;
      text += inactivityInWeeks > 1 ? ' semanas' : ' semana';
    }
  } else {
    text += inactivityInDays;
    text += inactivityInDays > 1 ? ' días' : ' día';
  }
  return text;
};

var getInactivityBadge = function(card, inactivityShowDays, inactivityCriticalDays, detailed){
  var day = 1000*60*60*24;
  var inactivityCriticalMillis = Number(inactivityCriticalDays) * day;
  var inactivityShowMillis = Number(inactivityShowDays) * day;
  var color = 'orange', refresh = 60, text = '';
  var badge = {
    title: 'Inactivo',
    text: text,
    icon: SNOOZE_ICON,
    color: color,
    refresh: refresh
  };
  if(!card.dateLastActivity) {
    console.error("No dateLastActivity found on card "+card.id);
    return;
  }

  var dateLastActivity = new Date(card.dateLastActivity).getTime();
  var inactivity = Date.now() - dateLastActivity;
  if(inactivity >= inactivityCriticalMillis) {
    badge.color = 'red';
    badge.text = getInactivityBadgeText(inactivity, detailed);
    return {
      dynamic: function(){
        return badge;
      }
    };
  } else if(inactivity >= inactivityShowMillis) {
    badge.text = getInactivityBadgeText(inactivity, detailed);
    badge.refresh = (inactivityCriticalMillis - inactivity) / 1000;
    return {
      dynamic: function(){
        return badge;
      }
    };
  }
};

var getBadges = function(t, card, detailed){
  var badges = [];
  return Promise.all([
    t.get('board', 'shared', 'pappira.idPrefix'),
    t.get('board', 'shared', 'pappira.idStartNumber', 0),
    t.get('board', 'shared', 'pappira.idSuffix'),
    t.get('board', 'shared', 'pappira.idEnabled', false),
    t.get('board', 'shared', 'pappira.idRemove', false),
    getPappiraCardId(t),
    getValidationBadge(t, card, detailed),
    t.get('board', 'shared', 'pappira.inactivityEnabled', false),
    t.get('board', 'shared', 'pappira.inactivityShowDays'),
    t.get('board', 'shared', 'pappira.inactivityCriticalDays'),
    t.get('board', 'shared', 'pappira.bmgStatusEnabled'),
    t.get('card', 'shared', 'pappira.bmgStatus')
  ])
  .spread(function(idPrefix, idStartNumber, idSuffix, idEnabled, idRemove, cardId, validationBadge, inactivityEnabled, inactivityShowDays, inactivityCriticalDays, bmgStatusEnabled, cardBmgStatus){
    if (idEnabled || cardId) {
      var idBadge = getIdBadge();
      if (idEnabled) {
        idBadge.text = getIdBadgeText(idPrefix, idStartNumber, idSuffix, cardId, card);
        if (idBadge.text !== cardId) {
          setPappiraCardId(t, idBadge.text);
          setTrelloCardName(t, card, idBadge.text + " - " + card.name);
        }
      } else {
        idBadge.text = cardId;
      }
      badges.push(idBadge);
    } 
    if(idRemove){
      removePappiraCardId(t);
    }
    if(validationBadge){
      if(detailed){
        if(validationBadge.invalidations && validationBadge.invalidations.length && validationBadge.invalidations.length > 1){
          validationBadge.callback = function(context) { // function to run on click
            return context.popup({
              title: 'Errores',
              url: './invalidations.html',
              args: { invalidations: validationBadge.invalidations },
              height: 50
            });
          };
        }
      }
      badges.push(validationBadge);
    }
    if(inactivityEnabled && !card.closed) {
      var snoozeBadge = getInactivityBadge(card, inactivityShowDays, inactivityCriticalDays, detailed);
      if(snoozeBadge) {
        badges.push(snoozeBadge);
      }
    }
    if(bmgStatusEnabled || cardBmgStatus) {
      badges.push({
        dynamic: function(){return getLadStatusBadge(card.id, t, cardBmgStatus, detailed);}
      });
    }
    return badges;
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return t.card('all')
    .then(function (card) {
       return getBadges(t, card, false);
    });
  },
  'card-detail-badges': function(t, options) {
    return t.card('all')
    .then(function (card) {
       return getBadges(t, card, true);
    });
  },
  'card-from-url': function (t, options) {
    // options.url has the url in question
    // if we know cool things about that url we can give Trello a name and desc
    // to use when creating a card. Trello will also automatically add that url
    // as an attachment to the created card
    // As always you can return a Promise that resolves to the card details
    
    return new Promise(function (resolve) {
      resolve({
        name: '💻 ' + options.url + ' 🤔',
        desc: 'This Power-Up knows cool things about the attached url'
      });
    });
    
    // if we don't actually have any valuable information about the url
    // we can let Trello know like so:
    // throw t.NotHandled();
  },
  'show-settings': function(t, options){
    // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
    // what should Trello show. We highly recommend the popup in this case as
    // it is the least disruptive, and fits in well with the rest of Trello's UX
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
    });
  },
  
  /*        
      
      🔑 Authorization Capabiltiies 🗝
      
      The following two capabilities should be used together to determine:
      1. whether a user is appropriately authorized
      2. what to do when a user isn't completely authorized
      
  */
  'authorization-status': function(t, options){
    // Return a promise that resolves to an object with a boolean property 'authorized' of true or false
    // The boolean value determines whether your Power-Up considers the user to be authorized or not.
    
    // When the value is false, Trello will show the user an "Authorize Account" options when
    // they click on the Power-Up's gear icon in the settings. The 'show-authorization' capability
    // below determines what should happen when the user clicks "Authorize Account"
    
    // For instance, if your Power-Up requires a token to be set for the member you could do the following:
    return isAuthorized(t);
    // You can also return the object synchronously if you know the answer synchronously.
  },
  'show-authorization': function(t, options){
    // Returns what to do when a user clicks the 'Authorize Account' link from the Power-Up gear icon
    // which shows when 'authorization-status' returns { authorized: false }.
    
    // If we want to ask the user to authorize our Power-Up to make full use of the Trello API
    // you'll need to add your API from trello.com/app-key below:
    let trelloAPIKey = '338a0019b5eb47ced79413a71191f169';
    // This key will be used to generate a token that you can pass along with the API key to Trello's
    // RESTful API. Using the key/token pair, you can make requests on behalf of the authorized user.
    
    // In this case we'll open a popup to kick off the authorization flow.
    if (trelloAPIKey) {
      return t.popup({
        title: 'My Auth Popup',
        args: { apiKey: trelloAPIKey }, // Pass in API key to the iframe
        url: './authorize.html', // Check out public/authorize.html to see how to ask a user to auth
        height: 140,
      });
    } else {
      console.log("🙈 Looks like you need to add your API key to the project!");
    }
  }
});
