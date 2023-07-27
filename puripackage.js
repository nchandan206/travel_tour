const localemail=window.localStorage.getItem('email');
const email=document.getElementById('email');
email.value=localemail;

function book()
{
const url="http://localhost:3000/packages";

fetch(url)
.then(response=>response.json())
.then(data=>{
    console.log(data);
    display(data);
})

.catch(error=>{
    console.log(error);
})

function display(data){
    const users=document.getElementById('guest');
    const destination=document.getElementById('location');
    const cupon=document.getElementById('myselect');
    const email=document.getElementById('email');
    console.log(email.value);
    let flag=0;

    data.map((item)=>{

        if(item.package==destination.value)
        {
            flag++;
            let i=0;
            let c=0;
            let price;
            if(users.value<item.limit)
            {
                users.value=item.limit;
                
            }
            price=(item.bill/item.limit)*users.value;
            document.getElementById('person').value=users.value;
            document.getElementById('username').value=document.getElementById('name').value;
            document.getElementById('goa-pack').innerText=destination.value;

            while(i<item.cupon.length)
            {
                var discount=item.cupon[i];
                console.log(discount);
    
                if(discount==cupon.value)
                {
                    // alert("ok");
                    c++;

                    switch(discount)
                    {
                        case 'FIRST USER':{
                    

                             check(price);
                                break;
                         }


                         case '2ND USER':{
                          
                            check1(price);
                            break;
                     }



                     case 'STUDENT18':{
                          
                        price=price-(price*.30);
                        // document.getElementById('price').innerHTML=price;
                        break;
                 }


                 case 'HONEYMOON20':{
                          
                    price=price-(price*.25);
                    // document.getElementById('price').innerHTML=price;
                    break;
             }


             case 'CSR':{
                          
                price=price-(price*.15);
                // document.getElementById('price').innerHTML=price;
                break;
              }
                    }
                    break;
                    
                }
            i++;
            }
            if(c==0 && cupon.value!='none')
                alert('not eligible for offer real cost will be charged');
            alert('bill on proceesing');
            // document.getElementById('price').innerHTML=price;
            document.getElementById('totalbill').value=price;
        }

        
    })
    if(flag==0)
    {
        alert("package is not available");
    }


}
}

function check(price)
{    const email=document.getElementById('email');
    const url1="http://localhost:3000/userpackage";
    let count=0;
    fetch(url1)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    data.map((item)=>{
        if(item.email1==email.value && item.package1.length==0)
        {
            price=price-(price*.5);
            count++;
            
        }
       
    })
    if(count==0)
    {
        alert("you are not a new user");
    }
    
    // document.getElementById('price').innerHTML=price;
    document.getElementById('totalbill').value=price;
    // alert('billgenerated');


})
}

function check1(price)
{
    let count=0;
    const email=document.getElementById('email');
    const url1="http://localhost:3000/userpackage";
    fetch(url1)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    data.map((item)=>{
        if(item.email1==email.value && item.package1.length==1)
        {
            price=price-(price*.25);
            count++;
            
        }
       
    })
    if(count==0)
    {
        alert("you are not eligible for  offer actual cost will charged");
    }
    // document.getElementById('price').innerHTML=price;
    document.getElementById('totalbill').value=price;
    // alert('billgenerated');


    

})

}

function pay()
{
   const a=document.getElementById('totalbill');
   const b= document.getElementById('username');
   const c= document.getElementById('person');
    if(a.value=="" || b.value=="" || c.value=="")
    {
        alert("bill still not generated properly");
    }
    else{
    if(confirm('pay for confirm book')==true)
    {

        userpack();

        alert('successfuuly booked');
        // a.value="";
        // b.value="";
        // c.value="";
    }
    else{
        a.value="";
        b.value="";
        c.value="";
        closepopup();
        }
}
}
function userpack()
{
    // alert('chandn');
    const pack=document.getElementById('goa-pack');
    const purchase1=document.getElementById('totalbill');
     const url3="http://localhost:3000/userpackage";
    fetch(url3)
    .then(response =>response.json())
    .then(data=>{
    console.log(data);
        data.map((item)=>{
        const arr=[];
        let purchase=[];
        if(item.email1==localemail)
        {
           
            let i=0;
            while(i<item.package1.length){
                arr.push(item.package1[i]);
               
                i++;
            } 
            arr.push(pack.innerText);

            let j=0;
            while(j<item.price.length){
                purchase.push(item.price[j]);
               
                j++;
            }
            purchase.push(purchase1.value);
           
            addpackage(item.id,arr,purchase);
            
        }
    })
    })
}


//add booked package
function addpackage(id,arr,purchase){
    // alert('ok');
    const url=`http://localhost:3000/userpackage/${id}`;
    
    const bookpackage={
        email1:localemail,
        package1:arr,
        price:purchase}
    fetch(url,{
        method:'PUT',
        headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify(bookpackage)
   })

}



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

 //for bill to pop out

function openpopup()
{
    document.getElementById('popup-container').style.display='block';
    document.getElementById('overlay').style.display='block';
}
function closepopup(){
    document.getElementById('popup-container').style.display='none';
    document.getElementById('overlay').style.display='none';
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
