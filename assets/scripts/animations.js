    const screen = document.querySelector('.background-image');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.links');
    const sections = document.querySelectorAll('main section');

    let screenHeight = screen.offsetHeight;
//screen.offsetHeight dla obrazka pierwszego wynosi tyle samo co window.innerHeight
  //  console.log(window.innerHeight);


    function debounce(func, wait = 40, immediate = true) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };
    

    function fixNav(){


        if(window.scrollY >= window.innerHeight / 2 ){
            header.classList.add('fixedNav');

        }
        else {
            header.classList.remove('fixedNav');

        }

    };
      //dodać responsywność zmiany tabel na resize
    window.addEventListener('scroll',fixNav);
    window.addEventListener('scroll',colorNav);
    window.addEventListener('resize',resizeHeightsSummarizing);
   // window.addEventListener('resize',debounce(resizeNav, 20));

    const sectionHeights = [];

    function countingHeights(arr){
      for(i=0;i<=5;i++){
        arr[i] = (sections[i].offsetHeight);
     }
        }
    countingHeights(sectionHeights);


    const heightSummary = [];

    function heightSummarizing(arr1,arr2) {
      let n;
      for (i=0;i<=5;i++){      
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

    function resizeHeightsSummarizing(){
      countingHeights(sectionHeights);
      heightSummarizing(sectionHeights,heightSummary);
      colorNav();
    }

    heightSummarizing(sectionHeights,heightSummary);




function colorNav(){

  for(i=0;i<=5;i++){

   if (window.scrollY >=heightSummary[i] && window.scrollY < heightSummary[i+1]){
      links[i].classList.add('orangered');
    }

    else {
      links[i].classList.remove('orangered');
    }
    if (window.scrollY >= heightSummary[5]){
      links[5].classList.add('orangered');
    }
    else {links[5].classList.remove('orangered');}

  }
 

};


