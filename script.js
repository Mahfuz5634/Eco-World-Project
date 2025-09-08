const categoriesContainer=document.getElementById('Categories-container');

const loadcategories =()=>{
    url='https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data=>loadCategoriesDisplay(data.categories))
}

const loadCategoriesDisplay =(data)=>{
   console.log(data)

   for(const dt of data){
   const newcategories=document.createElement('div');
   newcategories.innerHTML=`
     <div class="mb-1">
             <h1 class="text-[13px] opacity-90">${dt.category_name}</h1>
            </div>
   
   `
   categoriesContainer.appendChild(newcategories);
   }
}

loadcategories();