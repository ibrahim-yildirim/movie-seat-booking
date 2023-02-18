// Definition of DOM's
const movieSelect = document.querySelector("#movieSelect");
const seats = document.querySelectorAll(".seatRow .seat:not(.occupied)");
const pickSeat = document.querySelector("#pickSeat");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

// Seat select click event
pickSeat.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateTotalCount();
  }
});

// Update count and total price
function updateTotalCount() {
  let selectedSeats = document.querySelectorAll(".seatRow .seat.selected");
  count.innerText = selectedSeats.length;

  let totalPrice = movieSelect.value * selectedSeats.length;
  total.innerText = +totalPrice;

  // Get seats index to array (for local storage)
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// Save selected movie index and price (for local strage)
function setSelectedMovie(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Use saved data to UI (for local storage)
function getData() {
  // seat part
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // movie select part
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  // count and total part update
  updateTotalCount();
}

// Movie select change event
movieSelect.addEventListener("change", (e) => {
  totalPrice = e.target.value;
  updateTotalCount();
  setSelectedMovie(e.target.selectedIndex, e.target.value);
});

// Get from saved data (for local storage)
getData();
