const videoContainer= document.getElementsByTagName("iframe")[0];
let videoId= sessionStorage.getItem("videoId");

videoContainer.src=`https://www.youtube.com/embed/${videoId}?autoplay=1`;