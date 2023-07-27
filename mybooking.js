
const email=window.localStorage.getItem('email');
const url="http://localhost:3000/userpackage";
fetch(url)
.then(response=>response.json())
.then(data=>{
    console.log(data);
    display(data);
})

.catch(error=>{
    console.log(error);
})

function display(data)
{
    
        const container=document.getElementById('div');
    
        data.map((item)=>{

            if(item.email1==email)
            {
                
            let i=0;
            while(i<item.package1.length)
            {
                const iner=document.createElement('fielset');
                const iner5=document.createElement('legeng');
                const iner1=document.createElement('h5');
                const iner4=document.createElement('h5');
                iner.style.height='300px';
                iner.style.width='400px';
                iner.style.backgroundColor='orange';
                iner.style.marginLeft='80px';
                iner5.style.textAlign='center';
                iner5.innerText='Booked';
                const d = new Date();
                
                const iner2=document.createElement('h5');
                const iner3=document.createElement('br');
                iner1.innerText="Package:"+item.package1[i];
                iner2.innerHTML="bill:$"+item.price[i];
                iner4.innerText="User:"+item.email1;
                iner.append(iner5,iner4,iner1,iner2);

                container.append(iner,iner3);
               
                i++;
            } 
            }
        })
    
}


//logout from system
function logout()
{
   const text='are you want to logout';
   if(confirm(text)==true)
   {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  window.location.href='./landingpage.html';
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