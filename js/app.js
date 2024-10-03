console.log("testinggg")
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
const displayData = (categories) => {
    const categoriesID = document.getElementById('catagories-id')
   categories.forEach(item =>{
    
    const btn = document.createElement('button')
    btn.classList.add('btn')
    btn.innerText = item.category
    categoriesID.append(btn)
   })
    
   
}
//  video part

const loadvideos = async() =>{
    try{
        const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    const data = await res.json()
    displayVideos(data.videos)
   
    }
    catch(err){
        console.log("ERROR:",err)
    }
}

const displayVideos = (videos) =>{
    const videosid = document.getElementById("videos")
    
    videos.forEach(video =>{
        console.log(video)
        const card = document.createElement("div")
        card.classList.add("card","card-compact")
        card.innerHTML = `
        
  <figure class="h-[200px]">
    <img
      src="${video.thumbnail}"
      class="w-full h-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

        
        
        `

    videosid.append(card)
    
})
}






loadData()
loadvideos()