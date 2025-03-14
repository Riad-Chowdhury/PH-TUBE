
const showLoader = ()=>{
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}

const hideLoader = ()=>{
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('video-container').classList.remove('hidden')
}

function remove(){
  const activeBtn = document.getElementsByClassName('active');
  for(let btn of activeBtn){
    btn.classList.remove('active')
  }
 
}

function loadCategoris() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json()
    ).then((data) => diasplyCategories(data.categories)
    )
}

function loadVideos(searchText = '') {
  showLoader()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) =>{
      document.getElementById("btn-all").classList.add('active')
      
      diasplyVideos(data.videos)})
}

const loadVideoDatails = (videoId) =>{
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
  `
  fetch(url)
  .then((res) => res.json())
  .then((data) => displayVideos(data.video))
}
const displayVideos = (video)=>{
  console.log(video);
  document.getElementById('video_details').showModal()
  const detailContainer = document.getElementById('details-container')
  detailContainer.innerHTML =`
  
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="${video}">Card Title</h2>
    <p>     ${video.description} </p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  `


}


const loadCategorisVideos = (id) => {
  showLoader()
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id} `
  // console.log(url);
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    remove()
    const clickedButton = document.getElementById(`btn-${id}`)
    clickedButton.classList.add('active')
    // console.log(clickedButton);
    
    
    diasplyVideos(data.category)
  })
}


function diasplyCategories(categories) {
  const categoryContainer = document.querySelector('.category-container')

  for (let cat of categories) {
    const categoriDiv = document.createElement('div')
    categoriDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategorisVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `


    categoryContainer.append(categoriDiv)
  }
}

const diasplyVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById('video-container')
  videoContainer.innerHTML=''

  if (videos.length == 0) {
    videoContainer.innerHTML=`
    <div class="col-span-full text-center flex justify-center items-center flex-col py-20">
    <img class="w-[120px] h-[]" src="assets/Icon.png" alt="">
    <h2 class="text-2xl font-bold ">Oops!! Sorry, There is no content here</h2>
</div>
    `
    hideLoader()
  return;
}

  videos.forEach(video => {

    const videoCard = document.createElement('div')
    videoCard.innerHTML = `
   <div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${video.thumbnail}"alt="Shoes" />
            <span class="absolute bottom-2 right-2 bg-black text-white text-sm">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img  src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
            </div>
            <div class="intro">
                <h2 class="text-sm font-semibold">MIdnigth Serenade</h2>
                <p class="text-gray-400 flex gap-1 ">
                   ${video.authors[0].profile_name} 
                   ${video.authors[0].verified == true ? `
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">

                    `: ``}

                </p>
                <p class="text-gray-400 flex gap-1">${video.others.views}</p>
            </div>


        </div>
        <button onclick=loadVideoDatails('${video.video_id}') class="btn btn-block">Show Details</button>
      </div>

        `
    videoContainer.append(videoCard)
  });
hideLoader()
}
document.getElementById('search-inp').addEventListener('keyup',function(e){
  const inp = e.target.value
  loadVideos(inp)
  
})

loadCategoris()



















// {
//     "category_id": "1003",
//     "video_id": "aaae",
//     "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//     "title": "Inside Amy Schumer",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//             "profile_name": "Amy Schumer",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "3.6K",
//         "posted_date": "15147"
//     },
//     "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }