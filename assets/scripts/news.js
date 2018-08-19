const url = '/news.json';
const arrowLeft = document.querySelector('.arrowLeft');
const arrowRight = document.querySelector('.arrowRight');

const newsTitle = document.querySelector('.newsTitle');
const firstParagraph = document.querySelector('.firstParagraph');
const secondParagraph = document.querySelector('.secondParagraph');
const thirdParagraph = document.querySelector('.thirdParagraph');
const newsImage = document.querySelector('.imageRef');

let newsArr;
let activePage = 1;
let currentNews = activePage - 1;

window.onload = function(){

    const XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 && XHR.status == 200) {

            const content = JSON.parse(XHR.responseText);
           newsArr = content.news;

           newsChanging(currentNews);
          /*  newsTitle.textContent=newsArr[currentNews].title;
            firstParagraph.textContent=newsArr[currentNews].p1;
            secondParagraph.textContent=newsArr[currentNews].p2;
            thirdParagraph.textContent=newsArr[currentNews].p3;
            newsImage.setAttribute("src",newsArr[currentNews].imageSrc);  */
            arrowLeft.disabled = true;
            arrowLeft.classList.add('disabledBtn');
        }


        
	}

	XHR.open("GET", url);
    XHR.send();

    
    
};


arrowLeft.addEventListener("click",function(){

    activePage -- ;
    currentNews -- ;
    newsChanging(currentNews);

    arrowRight.disabled = false;
    arrowRight.classList.remove('disabledBtn');

    if (activePage === 1){
        arrowLeft.disabled = true;
        arrowLeft.classList.add('disabledBtn');  
    }
    else {
        arrowLeft.disabled = false;
        arrowLeft.classList.remove('disabledBtn');
    }
    
    console.log("ActivePage wynosi: " + activePage);
    console.log("Currrent News wynosi: " + currentNews);
});

arrowRight.addEventListener("click",function(){
    activePage ++ ;
    currentNews ++;

    newsChanging(currentNews);

    arrowLeft.disabled = false;
    arrowLeft.classList.remove('disabledBtn');

    if (activePage === newsArr.length){
        arrowRight.disabled = true;  
        arrowRight.classList.add('disabledBtn'); 
    }
    else {
        arrowRight.disabled = false;
        arrowRight.classList.remove('disabledBtn');
    }
    
    console.log("ActivePage wynosi: " + activePage);
    console.log("Currrent News wynosi: " + currentNews);
});


newsChanging = function(num){ 
    newsTitle.textContent=newsArr[num].title;
    firstParagraph.textContent=newsArr[num].p1;
    secondParagraph.textContent=newsArr[num].p2;
    thirdParagraph.textContent=newsArr[num].p3;
    newsImage.setAttribute("src",newsArr[num].imageSrc);
    newsImage.setAttribute("alt",newsArr[num].alternative);
    newsImage.setAttribute("title",newsArr[num].title);
}


