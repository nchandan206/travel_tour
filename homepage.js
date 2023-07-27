
//for typing slowly inthe webpage we use typing effect
const speed=300;
const  text1="Wanderlust CSR Pvt ltd";
let ty=0;

function typing()
{
    if(ty<text1.length)
    {
        document.getElementById('typingeffect').innerHTML+=text1.charAt(ty);
        setTimeout(typing,speed);
        ty++;
    }
}

//Darkmode light mode functionality
function darkmod()
{

    const dk=document.getElementById('dark-btn');
    if(dk.className=='fa-solid fa-moon')
    {
    const el=document.body;
    el.classList.toggle("dark-mode");
    dk.className='fa-sharp fa-solid fa-moon';
    dk.style.color='orange';
    }
    else{
        const el=document.body;
        el.classList.toggle("dark-mode");
        dk.className='fa-solid fa-moon';
        dk.style.color='white';
    }


 }

 //logout 
 function logout()
 {
    const text='are you want to logout';
    if(confirm(text)==true)
    {
   localStorage.removeItem('token');
   localStorage.removeItem('username');
   localStorage.removeItem('password');
   window.location.href='./landingpage.html';
    }
 }


//  for using swiper of offer
 var swiper = new Swiper(".offer-slider", {
    spaceBetween: 10,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});
//  for using swiper of company/sponsered
var swiper = new Swiper (".brand-slider", {
    spaceBetween: 20,
    autoloop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        910: {
          slidesPerView: 4,
        }
      },
});




