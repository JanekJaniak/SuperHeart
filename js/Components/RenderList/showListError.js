export const showError = (target) => {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = `Sorry, I couldn't get data. Try again later`;
  errorMessage.classList.add('readings--error--txt')
  target.appendChild(errorMessage);
}