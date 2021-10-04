import { showErrorMsg } from "./Validations/showErrorMsg.js";
import { removeErrorMsg } from "./Validations/removeErrorMsg.js";
import { isRequired, areValuesValid } from './Validations/inputValidation.js';
import { closeModals } from "../Helpers/closeModals.js";
import { Reading } from "../../main.js";
import { renderReadings } from "../RenderList/renderLi.js";
import { removeValidationInfo } from "./Validations/removeValidInfo.js";
import { readingsList } from "../../main.js";
import { readings } from "../../main.js";

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
export const setNowTimeAndDate = () => {
  date.value = getNowDate;
  time.value = getNowTime;
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

//Realtime validation
export const realtimeValidation = (event) => {
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

//Check form validity
export const isFormValid = () => {
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
export const submitForm = (event) => {
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

  if(isFormValid()) {
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