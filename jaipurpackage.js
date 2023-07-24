const buttons = document.querySelectorAll('button');

buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.children[1];

        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
} )


//darkmode light mode code with chane in icon
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
