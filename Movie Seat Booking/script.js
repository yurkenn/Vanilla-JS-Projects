const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();


let ticketPrice = +movieSelect.value; //+ekleyerek string degeri numbera cevirdik

//Save Selected Movie Index and Price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    //secilen koltuk sayisinin uzunlugunu bir degiskene atiyoruz boylece kac koltuk sectigimizi gorebiliyoruz
    const selectedSeatsCount = selectedSeats.length;

    // counta sectigimiz koltuk sayisini atiyoruz
    count.innerText = selectedSeatsCount;
    // sectigimiz koltuk sayisi ile bilet fiyatini carpiyoruz ve fiyati buluyoruz.
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get Data from Localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Select Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

// Seat Click Event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

//Initial Count and total set
updateSelectedCount();