import { people } from './mockData';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(1000) // simulate server latency
    .then();
}


function getAllPeople() {
  return sleep(1000)
    .then(
      () => people
    );
}

function updatePerson(values) {
  return new Promise((resolve, reject) => {
    let person = people.find(p => p.id === values.id),
        idx = people.indexOf(person),
        newPerson = Object.assign({}, person, values);
    people.splice(idx, 1, newPerson);
    return resolve({ok:true});
  });
}
export { submit, getAllPeople, updatePerson };
