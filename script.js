const movieSelect=document.getElementById("movie");
const container=document.querySelector(".container");
const seats=container.querySelectorAll(".row .seat:not(.sold)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movieImg=document.querySelector(".screen");

const movieOptions={
    "220":"images/img1.jpeg",
    "320":"images/img2.jpg",
    "250":"images/img3.jpg",
    "260":"images/img4.jpg",
    "270":"images/img5.jpg"

    
    
};


populateUI();

let ticketPrice=movieSelect.nodeValue;

const setMovieData = (movieIndex,moviePrice) =>{
    localStorage.setItem("selectedMovieIndex",movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);
}

const updateSelectedCount = () => {
    const selectedSeats=document.querySelectorAll(".row .seat.selected");
    
    const seatsIndex=[...selectedSeats].map(seat => [...seats].indexOf(seat))
   

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount=selectedSeats.length;
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;

    setMovieData(movieSelect.selectedIndex,movieSelect.value);
}

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > -1){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex=selectedMovieIndex;
    }
}


movieSelect.addEventListener('change', e =>{
    const selectedMovie=movieSelect.value;
  
    const moviImgSrc=movieOptions[selectedMovie];
   
    movieImg.src=moviImgSrc;
    ticketPrice =+ e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();

});


container.addEventListener("click", e => {

    if(e.target.classList.contains("seat") && !e.target.classList.contains("sold"))
    {
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
}
)


