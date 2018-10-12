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


export { submit, getAllPeople };
