var isWebkitBrowser = function() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    return isChrome || isSafari;
};

var goToHashtag = function(hashtag){
    if ( !isWebkitBrowser() ) {
        window.location.hash = hashtag;
    } else {
        window.location.href = hashtag;
    }
};

var startLoader = function(){
    document.getElementById('loader').classList.add("loader");
}


var onEnter = function(f){
    var f2 = function(e, f){
        if(e.keyCode == 13){
            f();
        }
    };
    f2.bind(null, f);
    return f2;
};