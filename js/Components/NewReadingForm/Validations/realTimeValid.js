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