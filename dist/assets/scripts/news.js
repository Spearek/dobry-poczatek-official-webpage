'use strict';

var url = '/news.json';
var arrowLeft = document.querySelector('.arrowLeft');
var arrowRight = document.querySelector('.arrowRight');

var newsTitle = document.querySelector('.newsTitle');
var firstParagraph = document.querySelector('.firstParagraph');
var secondParagraph = document.querySelector('.secondParagraph');
var thirdParagraph = document.querySelector('.thirdParagraph');
var newsImage = document.querySelector('.imageRef');

var newsArr = void 0;
var activePage = 1;
var currentNews = activePage - 1;

window.onload = function () {

    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var content = JSON.parse(XHR.responseText);
            newsArr = content.news;

            newsChanging(currentNews);
            arrowLeft.disabled = true;
            arrowLeft.classList.add('disabledBtn');
        }
    };

    XHR.open("GET", url);
    XHR.send();
};

arrowLeft.addEventListener("click", function () {

    activePage--;
    currentNews--;
    newsChanging(currentNews);
    resizeHeightsSummarizing();

    arrowRight.disabled = false;
    arrowRight.classList.remove('disabledBtn');

    if (activePage === 1) {
        arrowLeft.disabled = true;
        arrowLeft.classList.add('disabledBtn');
    } else {
        arrowLeft.disabled = false;
        arrowLeft.classList.remove('disabledBtn');
    }
});

arrowRight.addEventListener("click", function () {
    activePage++;
    currentNews++;

    newsChanging(currentNews);
    resizeHeightsSummarizing();

    arrowLeft.disabled = false;
    arrowLeft.classList.remove('disabledBtn');

    if (activePage === newsArr.length) {
        arrowRight.disabled = true;
        arrowRight.classList.add('disabledBtn');
    } else {
        arrowRight.disabled = false;
        arrowRight.classList.remove('disabledBtn');
    }
});

var newsChanging = function newsChanging(num) {
    newsTitle.textContent = newsArr[num].title;
    firstParagraph.textContent = newsArr[num].p1;
    secondParagraph.textContent = newsArr[num].p2;
    thirdParagraph.textContent = newsArr[num].p3;
    newsImage.setAttribute("src", newsArr[num].imageSrc);
    newsImage.setAttribute("alt", newsArr[num].alternative);
    newsImage.setAttribute("title", newsArr[num].title);
};