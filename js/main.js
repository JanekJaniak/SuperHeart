// Reading class
class Reading {
  constructor(id, millidate, date, time, systolic, diastolic, heartrate, stress) {
    this.id = id;
    this.millidate = millidate;
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
const readingsError = document.querySelector('.readings--error');

//Selectors for buttons and backdrop
const addReadingBtn = document.querySelector('.readings--add-button');
const cancelNewReadingBtn = document.querySelector('.new-reading-btn--cancel');
const newReadingModal = document.querySelector('.new-reading-modal');
const backdrop = document.querySelector('.backdrop');
const statsBtn = document.querySelector('.main-btn--stats');
const testBtn = document.querySelector('.main-btn--test');
const averageModal = document.querySelector('.average');
const averageBtnClose = document.querySelector('.average--btn--close');

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
    stress: 3
  }
];

//Get data from server using XMLHttpRequest
const sendRequest = (method, url) => {
  // const promise = new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  
  //   xhr.open(method, url);
  //   xhr.responseType = 'json'; // Parse automatically

  //   xhr.onload = () => {
  //     if(xhr.status >= 200 && xhr.status <= 300) {
  //       resolve(xhr.response);
  //     } else {
  //       reject(new Error(
  //         `Server error: Status: ${xhr.status} Message: ${xhr.statusText}`
  //       ));
  //     }
  //   };

  //   xhr.onerror = () => {
  //     reject(new Error('Client side error'));
  //   };

  //   xhr.send();
  // });
  // return promise;
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
}

async function getData() {
  try {
    const responseData = await sendRequest(
      'GET', 
      'http://janjaniak.pl/AppsData/SuperHeart/readingsData.json'
    );

    responseData.map(reading => readings.push(reading));

    readingsError.innerHTML = '';

    renderReadings();
  } catch (error) {
    console.log(error.message);
    showError();  
  }
}

  //Update list on server!!!

  //Show error in error readings list
const showError = () => {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = `Sorry, I couldn't get data. Try again later`;
  errorMessage.classList.add('readings--error--txt')
  readingsError.appendChild(errorMessage);
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
  //Sort readings by date
  readings.sort((a, b) => b.millidate - a.millidate );

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

//Open newReadingModal 
const openNewReadingModal = () => {
  newReadingModal.style.display = 'block';
  backdrop.style.display = 'block';
  setNowTimeAndDate();
};

//Close newReadingModal
const closeModals = () => {
  newReadingModal.style.display = 'none';
  averageModal.style.display = 'none';
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
  
  const fullDate = (date, time) => {
    const concatDate = date.concat('T',time);
    const fullDate = new Date(concatDate);
    const millisecDate = fullDate.getTime();

    return millisecDate;
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
      parseInt(stress.value)
    );

    readings.push(newReading);
    closeModals();
    removeValidationInfo();
    form.reset();
    renderReadings();
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
  averageModal.style.display = 'block'
  backdrop.style.display = 'block'
  console.log('STATS');
};

const closeStats = () => {
  showAvg();
  // closeModals();
};

// Calculate average values of readings
const calcAvg = (arr) => {
  const keys = ['systolic', 'diastolic', 'heartrate', 'stress'];
  const avgValues = [];
  keys.forEach(key => {

    const allValues = arr.map(el => el[key]);
    const sumValues = allValues.reduce((acc, cur) => acc + cur );
    const avgValue = Math.round(sumValues / arr.length);

    avgValues.push(avgValue);
  });
  return avgValues;
};

const showAvg = () => {
  const firstRowElem = document.querySelector('.first-row-elem');
  const secRowElem = document.querySelector('.sec-row-elem');
  const readingsCalculated = [readings.slice(0,14), readings.slice(0,6)];
  const avgReadingValues = [];

  

  readingsCalculated.forEach((arr) => {
    avgReadingValues.push([calcAvg(arr)]);
    console.log(avgReadingValues);
  });
};

// Test button - temporary
const test = () => {
  console.log('test');
};

//Event listeners 
addReadingBtn.addEventListener('click', openNewReadingModal);
form.addEventListener('submit', submitForm);
form.addEventListener('input', realtimeValidation);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
backdrop.addEventListener('click', cancelNewReading);
statsBtn.addEventListener('click', openStats);
averageBtnClose.addEventListener('click', closeStats);

testBtn.addEventListener('click', test)

getData();
