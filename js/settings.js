/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var idPrefix = document.getElementById('idPrefix');
var idStartNumber = document.getElementById('idStartNumber');
var idSuffix = document.getElementById('idSuffix');
var idEnabled = document.getElementById('idEnabled');
var idSaveButton = document.getElementById('idSave');
var idRemoveButton = document.getElementById('idRemove');
var idEnableButton = document.getElementById('idEnable');
var idDisableButton = document.getElementById('idDisable');

var validationEnabled = document.getElementById('validationEnabled');
var validationSaveButton = document.getElementById('validationSave');
var validationEnableButton = document.getElementById('validationEnable');
var validationDisableButton = document.getElementById('validationDisable');
var validationTitle = document.getElementById('validationTitle');
var validationDescription = document.getElementById('validationDescription');
var validationChecklist = document.getElementById('validationChecklist');
var validationWorkOrder = document.getElementById('validationWorkOrder');
var validationEmail = document.getElementById('validationEmail');

var inactivityEnabled = document.getElementById('inactivityEnabled');
var inactivitySaveButton = document.getElementById('inactivitySave');
var inactivityEnableButton = document.getElementById('inactivityEnable');
var inactivityDisableButton = document.getElementById('inactivityDisable');
var inactivityShowDays = document.getElementById('inactivityShowDays');
var inactivityCriticalDays = document.getElementById('inactivityCriticalDays');

var bmgStatusEnabled = document.getElementById('bmgStatusEnabled');
var bmgStatusEnableButton = document.getElementById('bmgStatusEnable');
var bmgStatusDisableButton = document.getElementById('bmgStatusDisable');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'pappira.idPrefix'),
    t.get('board', 'shared', 'pappira.idStartNumber'),
    t.get('board', 'shared', 'pappira.idSuffix'),
    t.get('board', 'shared', 'pappira.idEnabled', false),
    t.get('board', 'shared', 'pappira.validationTitle', false),
    t.get('board', 'shared', 'pappira.validationDescription', false),
    t.get('board', 'shared', 'pappira.validationChecklist'),
    t.get('board', 'shared', 'pappira.validationEnabled', false),
    t.get('board', 'shared', 'pappira.validationWorkOrder', false),
    t.get('board', 'shared', 'pappira.validationEmail', false),
    t.get('board', 'shared', 'pappira.inactivityEnabled', false),
    t.get('board', 'shared', 'pappira.inactivityShowDays'),
    t.get('board', 'shared', 'pappira.inactivityCriticalDays'),
    t.get('board', 'shared', 'pappira.bmgStatusEnabled'),
  ])
  .spread(function(savedPrefix, savedStartedNumber, savedSuffix, savedEnabled, 
                  savedValidationTitle, savedValidationDescription, savedValidationChecklist, savedValidationEnabled, savedValidationWorkOrder, savedValidationEmail,
                  savedInactivityEnabled, savedInactivityShowDays, savedInactivityCriticalDays, savedBmgStatusEnabled) {
    if(savedPrefix){
      idPrefix.value = savedPrefix;
    }
    if(savedSuffix){
      idSuffix.value = savedSuffix;
    }
    idEnabled.value = savedEnabled;
    if(savedEnabled){
      idEnableButton.parentNode.removeChild(idEnableButton);
    } else {
      idDisableButton.parentNode.removeChild(idDisableButton);
    }
    if(savedStartedNumber && /[0-9]+/.test(savedStartedNumber)){
      idStartNumber.value = savedStartedNumber;
    }

    if(savedValidationTitle){
      validationTitle.checked = savedValidationTitle;
    }
    if(savedValidationDescription){
      validationDescription.checked = savedValidationDescription;
    }
    validationEnabled.value = savedValidationEnabled;
    if(savedValidationEnabled){
      validationEnableButton.parentNode.removeChild(validationEnableButton);
    } else {
      validationDisableButton.parentNode.removeChild(validationDisableButton);
    }
    if(savedValidationChecklist){
      validationChecklist.value = savedValidationChecklist;
    }
    if(savedValidationWorkOrder){
      validationWorkOrder.checked = savedValidationWorkOrder;
    }
    if(savedValidationEmail){
      validationEmail.checked = savedValidationEmail;
    }

    inactivityEnabled.value = savedInactivityEnabled;
    if(savedInactivityEnabled){
      inactivityEnableButton.parentNode.removeChild(inactivityEnableButton);
    } else {
      inactivityDisableButton.parentNode.removeChild(inactivityDisableButton);
    }
    if(savedInactivityShowDays){
      inactivityShowDays.value = savedInactivityShowDays;
    }
    if(savedInactivityCriticalDays){
      inactivityCriticalDays.value = savedInactivityCriticalDays;
    }

    bmgStatusEnabled.value = savedBmgStatusEnabled;
    if(savedBmgStatusEnabled){
      bmgStatusEnableButton.parentNode.removeChild(bmgStatusEnableButton);
    } else {
      bmgStatusDisableButton.parentNode.removeChild(bmgStatusDisableButton);
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  });
});

idSaveButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.idPrefix', idPrefix.value)
  .then(function(){
    return t.set('board', 'shared', 'pappira.idStartNumber', idStartNumber.value);
  })
  .then(function(){
    return t.set('board', 'shared', 'pappira.idSuffix', idSuffix.value);
  })
  .then(function(){
    t.closePopup();
  });
});

idRemoveButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.idEnabled', false)
  .then(function(){
    return t.set('board', 'shared', 'pappira.idRemove', true);
  })
  .then(function(){
    t.closePopup();
  });
});
idEnableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.idEnabled', true)
  .then(function(){ 
    return t.set('board', 'shared', 'pappira.idRemove', false);
  })
  .then(function(){
    t.closePopup();
  });
});
idDisableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.idEnabled', false)
  .then(function(){ 
    return t.set('board', 'shared', 'pappira.idRemove', false);
  })
  .then(function(){
    t.closePopup();
  });
});


validationSaveButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.validationTitle', validationTitle.checked)
  .then(function(){
    return t.set('board', 'shared', 'pappira.validationDescription', validationDescription.checked);
  })
  .then(function(){
    return t.set('board', 'shared', 'pappira.validationChecklist', validationChecklist.value);
  })
  .then(function(){
    return t.set('board', 'shared', 'pappira.validationWorkOrder', validationWorkOrder.checked);
  })
  .then(function(){
    return t.set('board', 'shared', 'pappira.validationEmail', validationEmail.checked);
  })
  .then(function(){
    t.closePopup();
  });
});
validationEnableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.validationEnabled', true)
  .then(function(){
    t.closePopup();
  });
});
validationDisableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.validationEnabled', false)
  .then(function(){
    t.closePopup();
  });
});

inactivitySaveButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.inactivityShowDays', inactivityShowDays.value)
  .then(function(){
    return t.set('board', 'shared', 'pappira.inactivityCriticalDays', inactivityCriticalDays.value);
  })
  .then(function(){
    t.closePopup();
  });
});
inactivityEnableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.inactivityEnabled', true)
  .then(function(){
    t.closePopup();
  });
});
inactivityDisableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.inactivityEnabled', false)
  .then(function(){
    t.closePopup();
  });
});

bmgStatusEnableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.bmgStatusEnabled', true)
  .then(function(){
    t.closePopup();
  });
});
bmgStatusDisableButton.addEventListener('click', function(){
  return t.set('board', 'shared', 'pappira.bmgStatusEnabled', false)
  .then(function(){
    t.closePopup();
  });
});