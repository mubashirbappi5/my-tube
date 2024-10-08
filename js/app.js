


//  time function

const getTime = time =>{
    const hours = parseInt(time/3600)
    const remainingtimes =time%3600
    const min =parseInt(remainingtimes/60)
    remain = remainingtimes%60
    
    return `${hours}hrs ${min}min ${remain}sec ago`
}
//  categories type
const loadData = async() => {
   try{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    const data = await res.json()
    displayData(data.categories)
   }
   catch(err){
    console.log("ERROR:",err)

   }
    
}

//  catagories function for btn
const displaycategore = (id) => {
   
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data =>{
        const activebtn = document.getElementById(`btn-${id}`)
        removeActivebtn()
       
        activebtn.classList.add("bg-red-400","text-white")
      
        displayVideos(data.category)

    } )
    .catch(err => console.log("ERROR:",err))
}
const removeActivebtn =() => {
    const removebtn = document.getElementsByClassName('btndactive')
    for (let btn of removebtn){
        btn.classList.remove("bg-red-400","text-white")
    }
}
const displayData = (categories) => {
    const categoriesID = document.getElementById('catagories-id')
   categories.forEach(item =>{
    
    const btncontainer = document.createElement('div')
    
    btncontainer.innerHTML = `<button id="btn-${item.category_id}" onclick="displaycategore(${item.category_id})" class="btn btndactive">${item.category} </button>`
    categoriesID.append(btncontainer)
   })
    
   
}
// load details
const loadDetails = (videoid) =>{
    console.log(videoid)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`)
    .then(res => res.json())
    .then(data => dispayDetails(data.video))

}
// dispay details
const dispayDetails = (video) => {
    console.log(video)
    const modalitem = document.getElementById('modalItem')
    modalitem.innerHTML = `
    <img src="${video.thumbnail}">
    <h2 class="font-bold text-lg">${video.title} </h2>
    <p>${video.description} </p>
    
    `
    document.getElementById('showmodalData').click()
}
//  video part

const loadvideos = (searchText="") =>{
    
        fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data=> displayVideos(data.videos) )
        .catch(error => console.log(error));
    
   
   
    
    
}

const displayVideos = (videos) =>{
    const videosid = document.getElementById("videos")
    videosid.innerHTML =""
    if(videos.length ===0){
        videosid.classList.remove("grid")
        videosid.innerHTML =`<div class="h-screen flex flex-col justify-center items-center gap-5"> 
        <img src="./asset/icon.png">
          <h2 class="text-center font-bold text-xl">
          Oops!! Sorry, There is no content here
          <h2>
        
        </div>`
        return

    }
    else{
        videosid.classList.add("grid")

    }

    
    videos.forEach(video =>{
       
        const card = document.createElement("div")
        card.classList.add("card","card-compact")
        card.innerHTML = `
        
  <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      class="w-full h-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length ===0 ? "" :`<span class="absolute right-2 bottom-2 bg-black text-white p-2 rounded-md">${getTime(video.others.posted_date)} </span>`}
  </figure>
  <div class="px-0 py-2  gap-2">
<div class="flex  items-center gap-4">
<img
      src="${video.authors[0].profile_picture}"
      class="w-10 h-10 object-cover rounded-full"
      alt="profile">
 <div>
     <div>
         <h2 class="font-bold text-xl">${video.title} </h2>
     </div>

     <div class="flex gap-2">
           <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? ' <img class="w-5" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000">': ""}
     </div>
    <p class="text-gray-400">${video.others.views}</p>
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm mt-2 btn-error text-white">detailes</button>
</div>

 



</div>


   
    
    
  </div>


        
        
        `

    videosid.append(card)
    
})
}
document.getElementById('searchid').addEventListener("keyup",function(e){
    console.log(e.target.value)
   
    loadvideos(e.target.value)
})
document.getElementById("searchid2").addEventListener("keyup",function(e){
    loadvideos(e.target.value)
})






loadData()
loadvideos()