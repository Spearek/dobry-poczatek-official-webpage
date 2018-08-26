"use strict";

var offers = document.querySelectorAll(".offer_dynamic_content");
var btns = document.querySelectorAll(".offerBtn");

btns.forEach(function (btn, btnIndex) {

    btn.addEventListener("click", function () {

        btns.forEach(function (currentBtn, btnPosition) {

            btnPosition === btnIndex ? currentBtn.classList.add('transformedBtn') : currentBtn.classList.remove('transformedBtn');
        });

        offers.forEach(function (offer, offerIndex) {

            offerIndex === btnIndex ? offer.classList.remove('offer_content_hidden') : offer.classList.add('offer_content_hidden');
        });
        resizeHeightsSummarizing();
    });
});