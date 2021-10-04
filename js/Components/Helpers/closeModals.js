const newReadingModal = document.querySelector('.new-reading-modal');
const backdrop = document.querySelector('.backdrop');
const averageModal = document.querySelector('.average');

const elementsToClose = [newReadingModal, averageModal, backdrop];

export const closeModals = () => {
  elementsToClose.forEach(element =>element.style.display = 'none');
};