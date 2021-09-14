// Reading class
class Reading {
  constructor(id, dateCreated, date, time, systolic, diastolic, heartRate, stress) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.date = date;
    this.time = time;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.heartRate = heartRate;
    this.stress = stress;
  }
}

//Selectors for buttons and backdrop
const addReadingBtn = document.querySelector('.readings__addButton');
const cancelNewReadingBtn = document.querySelector('.newReadingBtn__cancel');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

//Open modal function
const openModal = () => {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
};

//Form handling
const form = document.querySelector('.newReadingInputs__form');

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event.target);
  
  //Form input selectors
  const date = form.elements['date'].value
  const time = form.elements['time'].value
  const systolic = form.elements['systolic'].value
  const diastolic = form.elements['diastolic'].value
  const heartrate = form.elements['heartrate'].value
  const stress = form.elements['stress'].value
  
  console.log(systolic);
})

const cancelNewReading = (event) => {
  event.preventDefault();
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  form.reset()
};

//Event listeners 
addReadingBtn.addEventListener('click', openModal);

cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);
