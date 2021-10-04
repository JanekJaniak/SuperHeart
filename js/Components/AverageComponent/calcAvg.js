// Calculate average values of readings
import { Reading } from "../../main.js";

export const calcAvg = (arr) => {
  const keys = ['systolic', 'diastolic', 'heartrate', 'stress'];
  const avgValues = [];
  
  keys.forEach(key => {
    const allValues = arr.map(el => el[key]);
    const sumValues = allValues.reduce((acc, cur) => acc + cur );
    const avgValue = Math.round(sumValues / arr.length);
    
    avgValues.push(avgValue);
  });
  
  //Check risk value 
  const risk = () => {
    if(avgValues.every(el => el < 130)) {
      return 0;
    } else if(avgValues.some(el => el > 130) && avgValues.every(el => el < 140)) {
      return 1;
    } else {
      return 2;
    }
  };

  const avgReading = new Reading(
    '_' + Math.random().toString(36).substr(2, 9),
    Date.now(),
    '',
    '',
    avgValues[0],
    avgValues[1],
    avgValues[2],
    avgValues[3],
    risk()
  )
  return avgReading;
};