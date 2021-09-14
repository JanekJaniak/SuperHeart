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
const showErrorMsg = (inputId, message) => {
  inputId.classList.add('invalid');
  inputId.nextElementSibling.textContent=message;
}

//Remove error message and class
const removeErrorMsg = (inputId) => {
  inputId.classList.replace('invalid', 'valid');
  inputId.nextElementSibling.textContent='';
}

//Inputs Validation
const isDateValid = () => {
  let isValid = false;
  
  if(!isRequired(date.value.trim())) {
    showErrorMsg(date, 'ENTER DATE OF READING');
  } else {
    removeErrorMsg(date);
    isValid = true;
  }
  return isValid;
};

const isTimeValid = () => {
  let isValid = false;
  
  if(!isRequired(time.value.trim())) {
    showErrorMsg(time, 'ENTER TIME OF READING');
  } else {
    removeErrorMsg(time);
    isValid = true;
  }
  return isValid;
};

const isSystolicValid = () => {
  let isValid = false;
  const min = 40;
  const max = 300;
  
  if(!isRequired(systolic.value.trim())) {
    showErrorMsg(systolic, 'ENTER VALUE');
  } else {
    removeErrorMsg(systolic);
    isValid = true;
  }
  return isValid;
};

const isDiastolicValid = () => {
  let isValid = false;
  const min = 40;
  const max = 300;
  
  if(!isRequired(diastolic.value.trim())) {
    showErrorMsg(diastolic, 'ENTER VALUE');
  } else {
    removeErrorMsg(diastolic);
    isValid = true;
  }
  return isValid;
};

const isHeartRateValid = () => {
  let isValid = false;
  const min = 40;
  const max = 200;
  
  if(!isRequired(heartrate.value.trim())) {
    showErrorMsg(heartrate, 'ENTER VALUE');
  } else {
    removeErrorMsg(heartrate);
    isValid = true;
  }
  return isValid;
};

//Submit form
const submitForm = (event) => {
  event.preventDefault()
  isDateValid();
  isTimeValid();
  isSystolicValid();
  isDiastolicValid();
  isHeartRateValid();
  console.log(event.target);
  console.log('submit');
  
}

const cancelNewReading = (event) => {
  event.preventDefault();
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  form.reset()
};

//Event listeners 
addReadingBtn.addEventListener('click', openModal);
form.addEventListener('submit', submitForm);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);
