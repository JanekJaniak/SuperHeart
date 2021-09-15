// Reading class
class Reading {
  constructor(id, date, time, systolic, diastolic, heartRate, stress) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.heartRate = heartRate;
    this.stress = stress;
  }
}

//Readings array
const readings =[];

//Selectors for buttons and backdrop
const addReadingBtn = document.querySelector('.readings__addButton');
const cancelNewReadingBtn = document.querySelector('.newReadingBtn__cancel');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

//Form handling
const form = document.querySelector('.newReadingInputs__form');

// Form inputs selectors
const date = form.elements['date'];
const time = form.elements['time'];
const systolic = form.elements['systolic'];
const diastolic = form.elements['diastolic'];
const heartrate = form.elements['heartrate'];
const stress = form.elements['stress'];

//Get now date 
const getNowDate = new Date().toISOString().split('T')[0];

//Get now time
const getNowTime = new Date().toTimeString().substring(0,5);

//Set now date and time in inputs
const setNowTimeAndDate = () => {
  date.value = getNowDate;
  time.value = getNowTime;
};

//Open modal 
const openModal = () => {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  setNowTimeAndDate();
};

//Close modal
const closeModal = () => {
  modal.style.display = 'none';
  backdrop.style.display = 'none';
};

//Inputs validation
const isRequired = (value) => value === '' ? false : true;
const areValuesValid = (value, min, max) => value >= min && value <= max ? true : false; 

//Show error message and class
const showErrorMsg = (inputId, message) => {
  inputId.classList.add('invalid');
  inputId.nextElementSibling.classList.remove('invisible');
  inputId.nextElementSibling.textContent=message;
};

//Remove error message and class
const removeErrorMsg = (inputId) => {
  inputId.classList.replace('invalid', 'valid');
  inputId.nextElementSibling.textContent='null';
  inputId.nextElementSibling.classList.add('invisible');
};

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
  
  if (!isRequired(systolic.value.trim())) {
    showErrorMsg(systolic, 'ENTER VALUE');
  } else if (!areValuesValid(systolic.value.trim(), min, max)) {
    showErrorMsg(systolic, `ENTER VALUE BETWEEN ${min} AND ${max}`)
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
  
  if (!isRequired(diastolic.value.trim())) {
    showErrorMsg(diastolic, 'ENTER VALUE');
  } else if (!areValuesValid(diastolic.value.trim(), min, max)) {
    showErrorMsg(diastolic, `ENTER VALUE BETWEEN ${min} AND ${max}`)
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
  
  if (!isRequired(heartrate.value.trim())) {
    showErrorMsg(heartrate, 'ENTER VALUE');
  } else if (!areValuesValid(heartrate.value.trim(), min, max)) {
    showErrorMsg(heartrate, `ENTER VALUE BETWEEN ${min} AND ${max}`)
  } else {
    removeErrorMsg(heartrate);
    isValid = true;
  }
  return isValid;
};

//Check form validity
const isFromValid = () => {
  const validations = [
    isDateValid(),
    isTimeValid(),
    isSystolicValid(),
    isDiastolicValid(),
    isHeartRateValid()
  ];

  return validations.every(validation => validation === true);
};

//Realtime validation
const realtimeValidation = (event) => {
  switch(event.target.id) {
    case 'date':
      isDateValid();
      break;
    case 'time':
      isTimeValid();
      break;
    case 'systolic':
      isSystolicValid();
      break;
    case 'diastolic':
      isDiastolicValid();
      break;
    case 'heartrate':
      isHeartRateValid();
      break;
  }
};

//Input error snd success messages and classes remover
const removeValidationInfo = () => {
  const messagesElements = document.getElementsByTagName('small');

  for (let i = 0; i < messagesElements.length; i++) {
    let element = messagesElements[i];

    element.innerText='null';
    element.classList.add('invisible');
    element.previousElementSibling.classList.remove('invalid', 'valid')
  }
};

//Submit form
const submitForm = (event) => {
  event.preventDefault();

  if(isFromValid()) {
    let newReading = new Reading(
      '_' + Math.random().toString(36).substr(2, 9),
      date.value,
      time.value,
      systolic.value,
      diastolic.value,
      heartrate.value,
      stress.value
    )
    
    readings.push(newReading);
    closeModal();
    removeValidationInfo();
  } 
};

//Cancel new reading
const cancelNewReading = (event) => {
  event.preventDefault();
  removeValidationInfo();
  closeModal();
  form.reset();
};

//Event listeners 
addReadingBtn.addEventListener('click', openModal);
form.addEventListener('submit', submitForm);
form.addEventListener('input', realtimeValidation);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);
