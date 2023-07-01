const Base_URL="https://www.googleapis.com/youtube/v3";
const API_KEY="AIzaSyAVZsjcpWbllma0i5xG5aXOblM_TrK3Ml4";

const container =document.getElementsByClassName("main-video-container")[0];
const input =document.getElementsByTagName("input")[0];



async function fetchVideos(string){
    const url=`${Base_URL}/search?key=${API_KEY}&q=${string}&type=video&maxResults=20`;
    const response =await fetch(url);
    const result=await response.json();
    const finalResult=result.items;
    getVideosData(finalResult);

} 

function onClickSearch(){
    const searchString=input.value;
   container.innerHTML=``;
   fetchVideos(searchString);
}

fetchVideos("");

async function fetchVideoDetails(videoId){
    const url=`${Base_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    const response =await fetch(url);
    const result=await response.json();
    return result.items[0];
}

fetchVideoDetails("-HhnNXukOiQ");


async function getVideosData(videoArray){
    const videoDetailsArray=[];
    for(let i=0;i<videoArray.length;i++){
        const videoId=videoArray[i].id.videoId;
        videoDetailsArray.push(await fetchVideoDetails(videoId));
    }
    console.log(videoDetailsArray);
    renderVideo(videoDetailsArray);
}

function renderVideo(videoDataArray){
    for(let i=0;i<videoDataArray.length;i++){
        const a=document.createElement("a");
        a.className="video-content";
        a.href="about-details.html"
        let videoId=videoDataArray[i].id;
        document.cookie = `videoId=${videoId};  path=/about-details.html`; 
        a.innerHTML=`
            <div class="thumbnail">
                <img src="${videoDataArray[i].snippet.thumbnails.high.url}">
            </div>
            <div class="video-details">
                <div class="channel-logo">
                <img src="https://i.ytimg.com/vi/FoepniNiaW8/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCW0Hbd4LEKHA1Fj_E8W2YhftcOkQ">
                </div>
                <div class="video-name-like-views">
                    <div class="name">
                        ${videoDataArray[i].snippet.title}
                    </div>
                    <div class="channelName-time">
                        <div class="channel-name">${videoDataArray[i].snippet.channelTitle}</div>
                        <div class="views-time">
                            <div class="videos">${videoDataArray[i].statistics.viewCount}</div>
                            •
                            <div class="time">${videoDataArray[i].snippet.publishedAt}</div>
                        </div>
                    </div>
                </div>
            </div>`
            container.appendChild(a);
    }
}