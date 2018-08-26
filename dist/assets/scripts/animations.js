'use strict';

var header = document.querySelector('header');
var links = document.querySelectorAll('.links');
var sections = document.querySelectorAll('main section');

var sectionHeights = [];
var heightSummary = [];

var fixNav = function fixNav() {
    return window.scrollY >= window.innerHeight / 2 ? header.classList.add('fixedNav') : header.classList.remove('fixedNav');
};

window.addEventListener('scroll', fixNav);
window.addEventListener('scroll', colorNav);
window.addEventListener('resize', resizeHeightsSummarizing);

var countingHeights = function countingHeights(arr) {
    for (var i = 0; i <= 5; i++) {
        arr[i] = sections[i].offsetHeight;
    }
};

countingHeights(sectionHeights);

var heightSummarizing = function heightSummarizing(arr1, arr2) {
    var n = void 0;
    for (var i = 0; i <= 5; i++) {
        if (i === 0) {
            n = window.innerHeight;
            arr2[i] = n;
        } else {
            n = n + arr1[i - 1];
            arr2[i] = n;
        }
    }
    return arr2;
};

heightSummarizing(sectionHeights, heightSummary);

function resizeHeightsSummarizing() {
    countingHeights(sectionHeights);
    heightSummarizing(sectionHeights, heightSummary);
    colorNav();
}

function colorNav() {

    for (var i = 0; i <= 5; i++) {

        window.scrollY >= heightSummary[i] && window.scrollY < heightSummary[i + 1] ? links[i].classList.add('orangered') : links[i].classList.remove('orangered');

        window.scrollY >= heightSummary[5] ? links[5].classList.add('orangered') : links[5].classList.remove('orangered');
    }
};