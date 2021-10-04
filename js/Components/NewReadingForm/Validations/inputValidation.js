//Inputs validation
export const isRequired = (value) => value === '' ? false : true;
export const areValuesValid = (value, min, max) => value >= min && value <= max ? true : false; 