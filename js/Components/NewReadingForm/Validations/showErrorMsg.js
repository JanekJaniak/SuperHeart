//Show error message and class
export const showErrorMsg = (inputId, message) => {
  inputId.classList.add('invalid');
  inputId.nextElementSibling.classList.remove('invisible');
  inputId.nextElementSibling.textContent=message;
};