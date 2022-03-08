const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

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