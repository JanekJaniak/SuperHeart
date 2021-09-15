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

//Form handling
const form = document.querySelector('.newReadingInputs__form');

// Form inputs selectors
const date = form.elements['date']
const time = form.elements['time']
const systolic = form.elements['systolic']
const diastolic = form.elements['diastolic']
const heartrate = form.elements['heartrate']
const stress = form.elements['stress']

//Get now date 
const getNowDate = new Date().toISOString().split('T')[0];

//Get now time
const getNowTime = new Date().toTimeString().substring(0,5);

//Set now date and time in inputs
const setNowTimeAndDate = () => {
  date.value = getNowDate;
  time.value = getNowTime;
}

//Open modal function
const openModal = () => {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  setNowTimeAndDate();
};

//Inputs validation
const isRequired = (value) => value === '' ? false : true;
const areValuesValid = (value, min, max) => value >= min && value <= max ? true : false; 

//Show error message and class
const showErrorMsg = (inputId, message) => {
  inputId.classList.add('invalid');
  inputId.nextElementSibling.classList.remove('invisible');
  inputId.nextElementSibling.textContent=message;
}

//Remove error message and class
const removeErrorMsg = (inputId) => {
  inputId.classList.replace('invalid', 'valid');
  inputId.nextElementSibling.textContent='null';
  inputId.nextElementSibling.classList.add('invisible');
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
  ]

  return validations.every(validation => validation === true)
}

//Submit form
const submitForm = (event) => {
  event.preventDefault()
  console.log(isFromValid())

}

//Cancel new reading
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
