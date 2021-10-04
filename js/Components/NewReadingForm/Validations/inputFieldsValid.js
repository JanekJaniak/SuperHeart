import { showErrorMsg } from "./showErrorMsg.js";
import { removeErrorMsg } from "./removeErrorMsg.js";
import { isRequired, areValuesValid } from './Components/NewReadingForm/Validations/inputValidation.js';

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