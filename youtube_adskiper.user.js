// ==UserScript==
// @name         YouTube Ad Skipper
// @version      0.1.10
// @description  YouTube Ad Skipper
// @namespace    https://github.com/laksa19/youtube_adskiper
// @updateURL    https://github.com/laksa19/youtube_adskiper/raw/master/youtube_adskiper.user.js
// @downloadURL  https://github.com/laksa19/youtube_adskiper/raw/master/youtube_adskiper.user.js
// @author       Laksamadi Guko
// @match        https://*.youtube.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

//"top-container"
(function() {
    'use strict';
    var timeoutAdSkip = 6; // video ad
    var timeoutAdClose = 3; // banner ad
    var elc = [".ytp-ad-skip-button",".ytp-ad-overlay-close-button"];
    var elh = [".ytd-promoted-sparkles-web-renderer","#player-ads",".ytp-ad-overlay-slot","ytd-player-legacy-desktop-watch-ads-renderer"];

    function hideAd(obj){
        if($(obj).length > 0){
            setTimeout(function(){
                $(obj).hide();
                changeIt(obj);
            },timeoutAdClose*1000);
        }
    }
    function clickAd(obj){
        if($(obj).length > 0){
            setTimeout(function(){
                $(obj).click();
                changeIt(obj);
            },timeoutAdSkip*1000);
        }
    }
    function changeIt(obj){
        if(obj.substring(0,1) == "."){
            $(obj).removeClass(obj.split(".")[1]);
            $(obj).addClass(obj.split(".")[1]+"_");
        }else if(obj.substring(0,1) == "#"){
            $(obj).attr("id",obj.split("#")[1]+"_");
        }
    }
    //setInterval(function(){
     //   $.each( elc, function( i, el ){
     //       clickAd(el);
    //    });
     //   $.each( elh, function( i, el ){
     //       hideAd(el);
    //    });
    //},500)

    // https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return

            for (var i = 0; i < mutation.addedNodes.length; i++) {
                // do things to your newly added nodes here
                $.each( elc, function( i, el ){
                    clickAd(el);
                });
                $.each( elh, function( i, el ){
                    hideAd(el);
                });
                var node = mutation.addedNodes[i]
                }
        })
    })

    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    })
})();
