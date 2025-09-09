const categoriesContainer=document.getElementById('Categories-container');
const cardContainer=document.getElementById('card-container');
const cartContainer=document.getElementById('cart-container');
const modalContainer =document.getElementById('modal-container');

const loadcategories =()=>{
    url='https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data=>loadCategoriesDisplay(data.categories))
}

const loadCategoriesDisplay =(data)=>{
   for(const dt of data){
   const newcategories=document.createElement('div');
   newcategories.innerHTML=`
     <div class="rounded-sm p-1 hover:bg-[#15803c35] ">
             <h1 id="${dt.id}" class="text-[13px] opacity-90">${dt.category_name}</h1>
            </div>
   
   `
   categoriesContainer.appendChild(newcategories);
   }
}

loadcategories();

// tree section

const loadAutotree =()=>{
    url='https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res=>res.json())
    .then(data =>displayAutotree(data.plants));
}

const displayAutotree =(data)=>{
   for(const dt of data){
   const newcategories=document.createElement('div');
   newcategories.innerHTML=`
    <div  class="md:h-full md:w-[260px] bg-white p-8 rounded-2xl flex flex-col">
  <div>
    <img class="w-full h-[120px] mb-2 rounded-[5px]" src="${dt.image}" alt="">
  </div>
  <h1 id="${dt.id}" class="text-[15px] ">${dt.name}</h1>
  <p class="text-[10px] mb-2">${dt.description}</p>
  <div class="flex-1"></div>
  <div class="flex justify-between items-center mb-2">
     <div class="bg-[#dcfce7] rounded-md text-[10px] p-1">${dt.category}</div>
     <div class="text-[12px]">$<span>${dt.price}</span></div>
  </div>
  <button class="btn bg-[#15803d] btn-active rounded-3xl w-full text-white">Add to cart</button>
</div>


   
   `
   cardContainer.appendChild(newcategories);
   }
}
loadAutotree ()

//clicked categories to load start here
categoriesContainer.addEventListener('click',(event)=>{
   const allli=document.querySelectorAll('h1');
    allli.forEach((li)=>{
        li.classList.remove('bg-[#15803d]', 'rounded-sm', 'p-1')
    })
    if(event.target.localName==='h1'){
     event.target.classList.add('bg-[#15803d]', 'rounded-sm', 'p-1' ,"hover:");

        clickeddisplayCategories(event.target.id)
    }
})

const clickeddisplayCategories =(id)=>{
   url=`https://openapi.programming-hero.com/api/category/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayclickedtree(data.plants))
}

const displayclickedtree =(data)=>{
   cardContainer.innerHTML='';
   for(const dt of data){
   const newcategories=document.createElement('div');
   newcategories.innerHTML=`
    <div  class="md:h-full md:w-[260px] bg-white p-8 rounded-2xl flex flex-col">
  <div>
    <img class="w-full h-[120px] mb-2 rounded-[5px]" src="${dt.image}" alt="">
  </div>
  <h1 id="${dt.id}" class="text-[15px] ">${dt.name}</h1>
  <p class="text-[10px] mb-2">${dt.description}</p>
  <div class="flex-1"></div>
  <div class="flex justify-between items-center mb-2">
     <div class="bg-[#dcfce7] rounded-md text-[10px] p-1">${dt.category}</div>
     <div class="text-[12px]">$<span>${dt.price}</span></div>
  </div>
  <button class="btn bg-[#15803d] btn-active rounded-3xl w-full text-white">Add to cart</button>
</div>


   
   `
   cardContainer.appendChild(newcategories);
   }
}

// cart-section
cardContainer.addEventListener("click", (event) => {
  if(event.target && event.target.tagName === "BUTTON") {
    const button = event.target;

    const card = button.parentNode;

    let productName = "";
    let productPrice = "";

    card.childNodes.forEach(node => {
      if(node.tagName === "H1") {
        productName = node.innerText;
      }
      if(node.tagName === "DIV") {
        const span = node.querySelector("span");
        if(span) {
          productPrice = span.innerText;
        }
      }
    });
    const  newcart=document.createElement('div');
    newcart.innerHTML=''
    newcart.innerHTML=`
      <div class="flex justify-between items-center bg-[#f0fdf4] p-2 rounded-1xl mb-2 ">
                 <div>
                  <h1 class="text-[14px]">${productName}</h1>
                  <p  class="text-[10px]">$<span>${productPrice}</span> ❌1</p>
                 </div>
                 <div>
                  <button>❌</button>
                 </div>
               </div>
    
    `
   cartContainer.appendChild(newcart);
   const tprice=document.getElementById('total-price')
   const price=Number(tprice.innerText)+Number(productPrice);
   tprice.innerText=price;




  }
});

cartContainer.addEventListener("click", (event) => {
  if(event.target && event.target.tagName === "BUTTON") {
    const button = event.target;

    const itemDiv = button.closest("div.flex");

    if(itemDiv) {
      const sprice = itemDiv.querySelector('span');
      const priceValue = Number(sprice.innerText);
      const tpriceEl = document.getElementById('total-price');
      tpriceEl.innerText = Number(tpriceEl.innerText) - priceValue;

      itemDiv.remove();
    }
  }
});


// modal part start here 

cardContainer.addEventListener("click", (event) => {
   loadmodal(event.target.id);
})

const loadmodal =(id)=>{
     url=`https://openapi.programming-hero.com/api/plant/${id}`
     fetch(url)
     .then(res=>res.json())
     .then(data=>showmodal(data.plants))  // এখানে data.plants না, একটিমাত্র plant object আসবে
}

const showmodal =(data)=>{
  modalContainer.innerHTML='';
   const newcategories=document.createElement('div');
   newcategories.innerHTML=`
   <div class="bg-white rounded-xl p-5 flex flex-col items-center text-center space-y-3">
  <!-- Image -->
  <div class="w-full h-[160px]">
    <img class="w-full h-full object-cover rounded-lg" src="${data.image}" alt="${data.name}">
  </div>

  <!-- Title -->
  <h1 id="${data.id}" class="text-lg font-semibold text-gray-800">${data.name}</h1>

  <!-- Description -->
  <p class="text-sm text-gray-600 leading-relaxed">${data.description}</p>

  <!-- Category & Price -->
  <div class="flex justify-between items-center w-full mt-2">
    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
      ${data.category}
    </span>
    <span class="text-base font-bold text-gray-800">$${data.price}</span>
  </div>
</div>

   `
   modalContainer.appendChild(newcategories);

   // modal open
   document.getElementById('my_modal_2').showModal();
}


    
    
