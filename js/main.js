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
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

const openModal = () => {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
};

let newReading = new Reading(1, 1614866400000, "2021-03-04", "15:00", 120, 80, 82, 1,);
console.log(newReading);

addReadingBtn.addEventListener('click', openModal);
