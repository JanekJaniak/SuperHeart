// Reading class
class Reading {
  constructor(id, date, time, systolic, diastolic, heartrate, stress) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.heartrate = heartrate;
    this.stress = stress;
  }
}

//Readings display selectors
const readingsList = document.querySelector('.readings-list');

//Selectors for buttons and backdrop
const addReadingBtn = document.querySelector('.readings--add-button');
const cancelNewReadingBtn = document.querySelector('.new-reading-btn--cancel');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const sendDataBtn = document.querySelector('.main-nav--send');

//Readings array
const readings =[
  {
    id: 100,
    date: "2021-09-22",
    time: "15:10",
    systolic: 120,
    diastolic: 80,
    heartrate: 70,
    stress: 1
  }
];

//Get data from server using XMLHttpRequest
const sendRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
  
    xhr.open(method, url);
    xhr.responseType = 'json'; // Parse automatically
    xhr.onload = () => resolve(xhr.response)
    xhr.send();
  });
  return promise;
};

async function getData() {
  const responseData = await sendRequest(
    'GET', 
    'http://janjaniak.pl/AppsData/SuperHeart/readingsData.json'
  );

  responseData.map(reading => readings.push(reading));

  renderReadings();
}

  //Update list on server
async function sendData() {
  const updatedData = readings
  console.log(updatedData);
  
  console.log('SEND');
  
} 

//Create readings list
const renderReadingElement = (reading) => {
  const newLiElement = document.createElement('li');
  newLiElement.classList.add('readings-list--element');

  const elementHeading = document.createElement('div');
  elementHeading.classList.add('element-heading');

  const headingDate = document.createElement('p');
  headingDate.classList.add('element-heading--date');
  headingDate.innerText = reading.date;
  
  const headingTime = document.createElement('p');
  headingTime.classList.add('element-heading--time');
  headingTime.innerText = reading.time;

  const elementReadings = document.createElement('div');
  elementReadings.classList.add('element-readings');

  const pressureReading = document.createElement('p');
  pressureReading.classList.add('element-readings--pressure');
  pressureReading.innerText = `${reading.systolic} / ${reading.diastolic}`;
  
  const heartrateReading = document.createElement('p');
  heartrateReading.classList.add('element-readings--heartrate');
  heartrateReading.innerText = reading.heartrate;
  
  const stressReading = document.createElement('p');
  stressReading.classList.add('element-readings--stress');
  let stressString = '';

  switch(reading.stress) {
    case(1):
      stressString = 'LOW'
      break;
    case(2):
      stressString = 'MID'
      break;
    case(3):
      stressString = 'HIGH'
      break;
  }

  stressReading.innerText = stressString;
  
  readingsList.appendChild(newLiElement);

  //APPEND MULTIPLE !!!
  newLiElement.appendChild(elementHeading);
  elementHeading.appendChild(headingDate);
  elementHeading.appendChild(headingTime);

  newLiElement.appendChild(elementReadings);
  elementReadings.appendChild(pressureReading);
  elementReadings.appendChild(heartrateReading);
  elementReadings.appendChild(stressReading);
};

//Render elements from reading array
const renderReadings = () => {
  //Clear list before rendering
  readingsList.innerHTML = '';

  for(let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    renderReadingElement(reading);
  }
};

//Form handling
const form = document.querySelector('.new-reading-inputs--form');

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

//Inputs Validation REAFCTOR !!!
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
    form.reset();
    renderReadings();
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
sendDataBtn.addEventListener('click', sendData);

getData();
