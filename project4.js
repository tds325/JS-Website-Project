const ul = document.getElementById('stars');
const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=';
const date_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=';
const goButton = document.querySelector("#go");
let photos;
// f7ef0b9a-ddfa-4746-8729-8f7dee3cbc9b
const demo = "DEMO_KEY";
const api_key = "5snrWGpoERqoOiObjbUv9GcjxHCyIaFuOte3mZU4";

function main(){
  fetchNormal();
  goButton.addEventListener("click", fetchByDate);
  }

function makeNode(element){
  return document.createElement(element);
}

function concat(parent, element){
  return parent.appendChild(element);
}

function getDateString(){
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  var day = document.getElementById("date").value;
  if (parseInt(month) < 10){
    month = '0' + month;
  }
  if (parseInt(day) < 10){
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
}

function fetchNormal(){
  fetch(url+api_key)
    .then((response)=> {
        return response.json()
        .then((json) => {
          photos = json.photos;
          var pic_num = Math.floor(Math.random() * photos.length);
        const div = document.getElementById("container");
        let img = makeNode('img');
        img.src = photos[pic_num].img_src;
        concat(div, img);
        })
    })
    .catch((error) => {
      console.log("");
    });
}

function fetchByDate(){
  const div = document.getElementById("container");
  removeImage();
  var date = getDateString();
  console.log(date);
  fetch(date_url + date + '&api_key=' + demo)
    .then((response)=> {
      console.log(response);
        if(response.ok == false){
          let img = makeNode('img');
          var pic_num = Math.floor(Math.random() * photos.length);
          img.src = photos[pic_num].img_src;
          concat(div, img);
        }
        else {
        return response.json()
        .then((json) => {
          photos = json.photos;
          var pic_num = Math.floor(Math.random() * photos.length);
        let img = makeNode('img');
        img.src = photos[pic_num].img_src;
        concat(div, img);
        })
      }
    });
}

function removeImage(){
  document.getElementById("container").innerHTML = "";
}
main()
