import { renderReadings } from './Components/RenderList/renderLi.js';
import { showError } from './Components/RenderList/showListError.js';
import { showAvg } from './Components/AverageComponent/showAvg.js';
import { removeValidationInfo } from './Components/NewReadingForm/Validations/removeValidInfo.js';
import { realtimeValidation } from './Components/NewReadingForm/Validations/realTimeValid.js';

// Reading class
export class Reading {
  constructor(id, millidate, date, time, systolic, diastolic, heartrate, stress, risk) {
    this.id = id;
    this.millidate = millidate;
    this.date = date;
    this.time = time;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.heartrate = heartrate;
    this.stress = stress;
    this.risk = risk;
  }
}

//Readings display selectors
const readingsList = document.querySelector('.readings-list');
const readingsError = document.querySelector('.readings--error');

//Selectors for buttons and backdrop
const addReadingBtn = document.querySelector('.readings--add-button');
const cancelNewReadingBtn = document.querySelector('.new-reading-btn--cancel');
const newReadingModal = document.querySelector('.new-reading-modal');
const backdrop = document.querySelector('.backdrop');
const statsBtn = document.querySelector('.main-btn--stats');
const averageModal = document.querySelector('.average');
const averageBtnClose = document.querySelector('.average--btn--cancel');
const averageBtnSave = document.querySelector('.average--btn--save');

//Readings array
let readings =[
  {
    id: 100,
    millidate: 1632316200000,
    date: "2021-09-22",
    time: "15:10",
    systolic: 170,
    diastolic: 121,
    heartrate: 104,
    stress: 3,
    risk: 2
  }
];

//Get data from server
const sendRequest = (method, url) => {
  return fetch(url)
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        return response.json();
      } else  {
          throw new Error(`Server error. Status: ${response.status} Message: ${response.statusText}`);
        }
    })
    .catch(error => {
      throw new Error(error);
    })
};

async function getData() {
  try {
    const responseData = await sendRequest(
      'GET', 
      'http://janjaniak.pl/AppsData/SuperHeart/readingsData.json'
    );

    responseData.map(reading => readings.push(reading));

    readingsError.innerHTML = '';

    renderReadings(readings,readingsList);
  } catch (error) {
    console.log(error.message);
    showError(readingsError);  
  }
}

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

//Open newReadingModal 
const openNewReadingModal = () => {
  newReadingModal.style.display = 'flex';
  backdrop.style.display = 'block';
  setNowTimeAndDate();
};

//Close newReadingModal
const closeModals = () => {
  newReadingModal.style.display = 'none';
  averageModal.style.display = 'none';
  backdrop.style.display = 'none';
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

//Submit form
const submitForm = (event) => {
  event.preventDefault();
  
  const fullDate = (date, time) => {
    const concatDate = date.concat('T',time);
    const fullDate = new Date(concatDate);
    const millisecDate = fullDate.getTime();

    return millisecDate;
  };

  const risk = () => {
    if(parseInt(systolic.value) < 130 && parseInt(diastolic.value) < 130 && parseInt(heartrate.value) <130) {
      return 0
    } else if(parseInt(systolic.value) > 140 || parseInt(diastolic.value) > 140 || parseInt(heartrate.value) > 140) {
      return 2
    } else {
      return 1
    }
  };

  if(isFromValid()) {
    let newReading = new Reading(
      '_' + Math.random().toString(36).substr(2, 9),
      fullDate(date.value, time.value),
      date.value,
      time.value,
      parseInt(systolic.value),
      parseInt(diastolic.value),
      parseInt(heartrate.value),
      parseInt(stress.value),
      risk()
    );

    readings.push(newReading);
    closeModals();
    removeValidationInfo();
    form.reset();
    renderReadings(readings, readingsList);
  }
};

//Cancel new reading
const cancelNewReading = (event) => {
  event.preventDefault();
  removeValidationInfo();
  closeModals();
  form.reset();
};

//Stats modal
const openStats = () => {
  averageModal.style.display = 'flex';
  backdrop.style.display = 'block';
  showAvg(readings);
};

const closeStats = () => {
  closeModals();
};

const saveAverage = () => {
  console.log('Save average');
  closeModals();
}

//Event listeners 
addReadingBtn.addEventListener('click', openNewReadingModal);
form.addEventListener('submit', submitForm);
form.addEventListener('input', realtimeValidation);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);
statsBtn.addEventListener('click', openStats);
averageBtnClose.addEventListener('click', closeStats);
averageBtnSave.addEventListener('click', saveAverage);


getData();
