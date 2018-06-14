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

window.onload = function(){

    const XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 && XHR.status == 200) {

            const content = JSON.parse(XHR.responseText);
           newsArr = content.news;

            newsTitle.textContent=newsArr[0].title;
            firstParagraph.textContent=newsArr[0].p1;
            secondParagraph.textContent=newsArr[0].p2;
            thirdParagraph.textContent=newsArr[0].p3;
            newsImage.setAttribute("src",newsArr[0].imageSrc);  
            
           
            arrowLeft.disabled = true;
            arrowLeft.classList.add('disabledBtn');
           console.log(activePage);
        }


        
	}

	XHR.open("GET", url);
    XHR.send();

    
    
};


arrowLeft.addEventListener("click",function(){
    activePage -- ;
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
});

arrowRight.addEventListener("click",function(){
    activePage ++ ;
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
});


