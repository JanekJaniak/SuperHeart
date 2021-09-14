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
const saveNewReadingBtn = document.querySelector('.newReadingBtn__save');
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

// Form inputs selectors
const date = form.elements['date']
const time = form.elements['time']
const systolic = form.elements['systolic']
const diastolic = form.elements['diastolic']
const heartrate = form.elements['heartrate']
const stress = form.elements['stress']

//Inputs validation
const isRequired = (value) => value === '' ? false : true;
const areValuesValid = (lenght, min, max) => lenght >= min && lenght <= max ? true : false; 

//Show error message and class
const showErrorMsg = (input, message) => {
  input.classList.add('invalid');
  input.nextElementSibling.textContent=message;
}

//Remove error message and class
const removeErrorMsg = (input, message) => {
  input.classList.replace('invalid', 'valid');
  input.nextElementSibling.textContent=message;
}

//Validation function
const checkReadingValidity = (value) => {
  let isValid = false;
  const min = 40;
  const max = 300;
  // trim() !!!
}

const test = (event) => {
  event.preventDefault();
  console.log(systolic.nextElementSibling);
}

const cancelNewReading = (event) => {
  event.preventDefault();
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  form.reset()
};

//Event listeners 
addReadingBtn.addEventListener('click', openModal);

saveNewReadingBtn.addEventListener('click', test);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);


