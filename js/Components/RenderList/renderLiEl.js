export const renderReadingElement = (reading, target) => {
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
      stressString = 'LOW';
      break;
    case(2):
      stressString = 'MID';
      break;
    case(3):
      stressString = 'HIGH';
      break;
  }

  stressReading.innerText = stressString;

  switch(reading.risk) {
    case(0):
      elementReadings.classList.add('risk--low');
      break;
    case(1):
      elementReadings.classList.add('risk--mid');
      break;
    case(2):
      elementReadings.classList.add('risk--high');
      break;
  }
 
  target.appendChild(newLiElement);

  newLiElement.appendChild(elementHeading);
  elementHeading.appendChild(headingDate);
  elementHeading.appendChild(headingTime);

  newLiElement.appendChild(elementReadings);
  elementReadings.appendChild(pressureReading);
  elementReadings.appendChild(heartrateReading);
  elementReadings.appendChild(stressReading);
};
