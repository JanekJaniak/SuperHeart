//Remove error message and class
export const removeErrorMsg = (inputId) => {
  inputId.classList.replace('invalid', 'valid');
  inputId.nextElementSibling.textContent='null';
  inputId.nextElementSibling.classList.add('invisible');
};