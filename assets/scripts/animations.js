    const header = document.querySelector('header');
    const links = document.querySelectorAll('.links');
    const sections = document.querySelectorAll('main section');

    const sectionHeights = [];
    const heightSummary = [];


    
    const fixNav = () =>  window.scrollY >= window.innerHeight / 2 ? header.classList.add('fixedNav') : header.classList.remove('fixedNav');

      
    window.addEventListener('scroll',fixNav);
    window.addEventListener('scroll',colorNav);
    window.addEventListener('resize',resizeHeightsSummarizing);

      
    
    const countingHeights = arr =>{
      for(let i=0;i<=5;i++){
        arr[i] = (sections[i].offsetHeight);
     }
        }

    countingHeights(sectionHeights);


    const heightSummarizing = (arr1,arr2) =>{
      let n;
      for (let i=0;i<=5;i++){      
        if (i===0){
          n = window.innerHeight;
          arr2[i] = n;
        }
        else{
          n = n + arr1[i-1];
          arr2[i]=n;
        }
      }
      return arr2;
    }

    heightSummarizing(sectionHeights,heightSummary);

    function resizeHeightsSummarizing(){
      countingHeights(sectionHeights);
      heightSummarizing(sectionHeights,heightSummary);
      colorNav();
    }

function colorNav(){

  for(let i=0;i<=5;i++){

    window.scrollY >=heightSummary[i] && window.scrollY < heightSummary[i+1] ?  links[i].classList.add('orangered') : links[i].classList.remove('orangered');

    window.scrollY >= heightSummary[5] ? links[5].classList.add('orangered') : links[5].classList.remove('orangered');

  }
 

};


