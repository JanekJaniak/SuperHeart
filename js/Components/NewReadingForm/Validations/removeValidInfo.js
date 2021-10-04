//Input error snd success messages and classes remover
export const removeValidationInfo = () => {
  const messagesElements = document.getElementsByTagName('small');

  for (let i = 0; i < messagesElements.length; i++) {
    let element = messagesElements[i];

    element.innerText='null';
    element.classList.add('invisible');
    element.previousElementSibling.classList.remove('invalid', 'valid')
  }
};