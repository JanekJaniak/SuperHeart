import { renderReadings } from './Components/RenderList/renderLi.js';
import { showError } from './Components/RenderList/showListError.js';
import { showAvg } from './Components/AverageComponent/showAvg.js';
import { removeValidationInfo } from './Components/NewReadingForm/Validations/removeValidInfo.js';
import { realtimeValidation, submitForm, setNowTimeAndDate } from './Components/NewReadingForm/formComponent.js';
import { closeModals } from './Components/Helpers/closeModals.js';

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
export const readingsList = document.querySelector('.readings-list');
const readingsError = document.querySelector('.readings--error');

//Form selector
const form = document.querySelector('.new-reading-inputs--form');

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
export let readings =[
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

//Open newReadingModal 
const openNewReadingModal = () => {
  newReadingModal.style.display = 'flex';
  backdrop.style.display = 'block';
  setNowTimeAndDate();
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
