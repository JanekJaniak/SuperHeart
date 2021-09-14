class Reading {
  constructor(id, dateCreated, date, time, systolic, diastolic, heartRate, stress) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.date = date;
    this.time = time;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.heartRate = heartRate;
    this.stress = stress;
  }
}

const addReadingBtn = document.querySelector('.readings__addButton');
const saveNewReadingBtn = document.querySelector('.newReadingBtn__save');
const cancelNewReadingBtn = document.querySelector('.newReadingBtn__cancel');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

const openModal = () => {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
};

const cancelNewReading = (e) => {
  e.preventDefault();
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  console.log('cancel');
  
};

const saveNewReading = (e) => {
  e.preventDefault();
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  console.log('save');
};

let newReading = new Reading(1, 1614866400000, "2021-03-04", "15:00", 120, 80, 82, 1,);
console.log(newReading);

addReadingBtn.addEventListener('click', openModal);
cancelNewReadingBtn.addEventListener('click', cancelNewReading);
saveNewReadingBtn.addEventListener('click', saveNewReading);
backdrop.addEventListener('click', cancelNewReading)
