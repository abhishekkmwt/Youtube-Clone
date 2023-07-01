const videoContainer= document.getElementsByTagName("iframe")[0];
let x= document.cookie;
const arr=x.split(";");
const arr1=arr[0].split("=");
const videoId=arr1[1];
console.log(videoId);

videoContainer.src=`https://www.youtube.com/embed/${videoId}?autoplay=1`;