const categoriesContainer=document.getElementById('Categories-container');
const cardContainer=document.getElementById('card-container');

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
    <div class="h-full w-[260px] bg-white p-8 rounded-2xl flex flex-col">
  <div>
    <img class="w-full h-[120px] mb-2 rounded-[5px]" src="${dt.image}" alt="">
  </div>
  <h1 class="text-[15px]">${dt.name}</h1>
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
    <div class="h-full w-[260px] bg-white p-8 rounded-2xl flex flex-col">
  <div>
    <img class="w-full h-[120px] mb-2 rounded-[5px]" src="${dt.image}" alt="">
  </div>
  <h1 class="text-[15px]">${dt.name}</h1>
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