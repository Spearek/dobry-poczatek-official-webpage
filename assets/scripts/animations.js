
    const nav = document.querySelector('.head');
    const header = document.querySelector('header');
    const topOfNav = nav.offsetTop;
    const logo = document.querySelector('.page_logo');

    function fixNav(){
       // console.log(topOfNav, window.scrollY);

        if(window.scrollY >= 500){
            header.classList.add('fixedNav');

        }
        else {
            header.classList.remove('fixedNav');

        }

    }

    window.addEventListener('scroll', fixNav);
