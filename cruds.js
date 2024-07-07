
// __________ INPUT SECTION ________

// get total 

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let temp ;
let mood = 'create';
function gettotal(){
    if(price.valuee !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background  = 'red';
    }
}

// create product 

// ____ 01 -- CHECK IF STORAGE 
let datapro
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product) ;
    
}else{
    datapro= [] ;
}
// ____ 02 -- CREATION _____ 
if(datapro != '')
     document.getElementById('deleteall').style.display = 'block' ;
submit.onclick = function (){

    let newpro = {
        title : title.value.toUpperCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads   : ads.value   ,
        discount: discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toUpperCase() ,
    }
    if(mood === 'create'){
     // count
    if(newpro.count > 1){
        for(let i= 0 ; i< newpro.count ; i++){
            datapro.push(newpro);
        }
    }else{
        datapro.push(newpro);
    }
        
    }else{

        datapro[temp] = newpro ;
        submit.textContent = 'create';
        mood = 'create';
        count.style.display = 'block';
        showDATA();
    }

   
    // save data in local storrage
    localStorage.setItem('product' , JSON.stringify(datapro) );
    cleardata();
    showDATA();
    document.getElementById('deleteall').style.display = 'block' ;

};

// clear inputs 

function cleardata(){
    title.value = '' ;
    price.value = '' ;
    ads.value = '' ;
    taxes.value = '' ;
    discount.value = '' ;
    count.value = '' ;
    total.innerHTML = '' ;
    category.value = '' ;
    total.style.background  = 'red';

};

// read

function showDATA(){
    let table = '' ;
    for(i=0 ; i<datapro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td> 
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
         </tr>` ; 
    }
    document.getElementById('tbody').innerHTML = table ;
};
showDATA();

// delete
 function deletedata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showDATA();
 };
 function DELETEALL(){
    localStorage.clear();
    datapro.splice(0);
    showDATA();
    document.getElementById('deleteall').style.display = 'none' ;
 }

// update 

function updatedata(i){
   
    submit.textContent = 'update';
    title.value = datapro[i].title ;
    price.value = datapro[i].price ;
    taxes.value = datapro[i].taxes ;
    ads.value   = datapro[i].ads ;
    discount.value = datapro[i].discount ;
    gettotal();
    count.style.display = 'none';
    category.value = datapro[i].category ;
   mood = 'update';
   temp = i ;
   scroll({
    top:0,
    behavior:'smooth',
   })

};

// search 
let searchMOOD = 'title';

function whichmood(id){
    let search = document.getElementById('search');

    if(id == 'bycategory'){
        searchMOOD='category';
        search.Placeholder = 'by category';
    }
   else {
        searchMOOD='title';
        search.Placeholder = 'SEARCH BY TITLE';
    }
    search.focus();
    search.value = '';
    showDATA();
};

function searchData(val){
    let table ='';
    if(searchMOOD === 'title'){
       
        for(i=0 ; i < datapro.length ; i++){
            if(datapro[i].title.includes(val.toUpperCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                 </tr>` ; 
            }
        }

    }else{
        for(i=0 ; i < datapro.length ; i++){
            if(datapro[i].category.includes(val.toUpperCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                 </tr>` ; 
            }
        }

    }
    document.getElementById('tbody').innerHTML = table ;
};

// clean data 