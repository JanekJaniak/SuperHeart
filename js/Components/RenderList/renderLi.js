import { renderReadingElement } from "./renderLiEl.js"
//Render elements from reading array
export const renderReadings = (readings, target) => {
  //Clear list before rendering
  target.innerHTML = '';
  //Sort readings by date
  readings.sort((a, b) => b.millidate - a.millidate );

  for(let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    renderReadingElement(reading, target);
  }
};