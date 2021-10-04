// Show average readings in table
import { calcAvg } from "./calcAvg.js";

export const showAvg = (readings) => {
  const firstRowElem = document.querySelector('.first-row-elem');
  const secRowElem = document.querySelector('.sec-row-elem');
  const message = document.querySelector('.average--message');
  const readingsCalculated = [readings.slice(0,14), readings.slice(0,6)];
  const avgReadingValues = [];
  const avgReadingElem = [firstRowElem, secRowElem];

  readingsCalculated.forEach(arr => avgReadingValues.push(calcAvg(arr)));

  avgReadingElem.forEach((arr, i) => {
    arr.innerText = avgReadingValues[i].heartrate;
    arr.previousElementSibling.innerText = 
      `${avgReadingValues[i].systolic} / ${avgReadingValues[i].diastolic}`;
    arr.nextElementSibling.innerText = avgReadingValues[i].stress;

    if(avgReadingValues[i].risk === 0) {
      arr.parentElement.classList.add('risk--low');

    } else if(avgReadingValues[i].risk === 2) {
      arr.parentElement.classList.add('risk--high');

      message.innerText = 'You should visit a doctor! Show him this table.';
      message.classList.add('risk--high')
      
    } else {
      arr.parentElement.classList.add('risk--mid');

      if(!message.classList.contains('risk--high')){
        message.innerText = 'Be carefull! Keep measuring Your pressure';
        message.classList.add('risk--mid');
      }
    }
  });
};