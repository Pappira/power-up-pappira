var Promise = TrelloPowerUp.Promise;
var bibliomanagerGateHost = "https://bibliomanager-gate.lad.uy/api";
var ERROR_ICON = "./images/error.svg";

var getCardStatus = function(cardId) {
  return Promise.resolve(
    $.get(bibliomanagerGateHost + "/trello/card/" + cardId + "/status")
  );
};

var getLadStatusBadge = function(cardId, t, cardBmgStatus, detailed) {
  var badge = {
    text: cardBmgStatus,
    refresh: 60
  };
  if (detailed) {
    badge.title = "Estado BMG";
  }
  return getCardStatus(cardId)
    .then(function(cardStatus) {
      t.set("card", "shared", "pappira.bmgStatus", cardStatus);
      badge.text = cardStatus;
      return badge;
    })
    .catch(function(error) {
      console.error(
        "No se ha podido actualizar el estado de la tarjeta " + cardId
      );
      console.error(error);
      badge.color = "red";
      if (detailed) {
        badge.text = "ÚLTIMO ESTADO CONOCIDO: " + cardBmgStatus;
      } else {
        badge.icon = ERROR_ICON;
      }
      return badge;
    });
};
