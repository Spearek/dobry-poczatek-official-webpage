    const screen = document.querySelector('.background-image');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.links');
    const sections = document.querySelectorAll('main section');

    
 //  console.log('section 0 height is ' + sections[0]);

   // const topOfNav = header.offsetTop;
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
    

    function resizeNav(){
        screenHeight = screen.offsetHeight;
        console.log('resize is ' + screenHeight);

        for(i=0;i<=5;i++){
          //console.log('sections[' + i +'] offset = ' + sections[i].offsetHeight);
          //console.log('Currents Array status is: ' + sectionHeights);
      }
    };
    function fixNav(){


       // console.log('scrollY is ' + window.scrollY);
      //  console.log('VIewportHeight is ' + window.innerHeight);
        if(window.scrollY >= screenHeight / 2 ){
            header.classList.add('fixedNav');

        }
        else {
            header.classList.remove('fixedNav');

        }

    };
      //dodać responsywność zmiany tabel na resize
    window.addEventListener('scroll',fixNav);
    window.addEventListener('scroll',colorNav);

    window.addEventListener('resize',debounce(resizeNav, 20));

    const sectionHeights = [];

    for(i=0;i<=5;i++){
        sectionHeights.push(sections[i].offsetHeight);
        //console.log('sections[' + i +'] offset = ' + sections[i].offsetHeight);
        //console.log('Currents Array status is: ' + sectionHeights);
    }
    console.log(window.innerHeight);
    console.log(sectionHeights);

    const heightSummary = [];

    function heightSummarizing(arr1,arr2) {
      let n;
      for (i=0;i<=5;i++){      
        if (i===0){
          n = window.innerHeight;
          arr2.push(n);
        }
        else{
          n = n + arr1[i-1];
          arr2.push(n);
        }
      }

      return arr2;
    }
    heightSummarizing(sectionHeights,heightSummary);
    console.log(heightSummary);




function colorNav(){

  for(i=0;i<=5;i++){
    // zrobić wyjątek dla 5 sekcji żeby gasiła się tylko powyżej



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
  /*console.log(window.scrollY);
  if (window.scrollY >= heightSummary[0] && window.scrollY < heightSummary[1] ){
    links[0].classList.add('orangered');
  }
  else{
    links[0].classList.remove('orangered'); 
  }

  if(window.scrollY >= heightSummary[1] && window.scrollY < heightSummary[2] ){
    links[1].classList.add('orangered');
  }
  else{
    links[1].classList.remove('orangered');
  }
  if(window.scrollY >= heightSummary[2] && window.scrollY < heightSummary[3] ){
    links[2].classList.add('orangered');
  }
  else{
    links[2].classList.remove('orangered');
  }
  if(window.scrollY >= heightSummary[3] && window.scrollY < heightSummary[4] ){
    links[3].classList.add('orangered');
  }
  else{
    links[3].classList.remove('orangered');
  }
  if(window.scrollY >= heightSummary[4] && window.scrollY < heightSummary[5] ){
    links[4].classList.add('orangered');
  }
  else{
    links[4].classList.remove('orangered');
  }
  if (window.scrollY >= heightSummary[5] && heightSummary[5] ){
    links[5].classList.add('orangered');}
    else{
      links[5].classList.remove('orangered');
    }*/


};

// na resize żeby te heighty sekcji się przemieniły

/*
[1310, 595, 1298, 1083, 737, 750]
[651, 1961, 2556, 3854, 4937, 5674]
* */
