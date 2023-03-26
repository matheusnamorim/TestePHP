import axios from 'axios';

const BASE_URL = 'http://localhost';

function registerPeople(body){
  const promise = axios.post(`${BASE_URL}/`, body);
  return promise;
}

function listPeople(){
  const promise = axios.get(`${BASE_URL}/?path=people`);
  return promise;
}

function listPhone(){
  const promise = axios.get(`${BASE_URL}/?path=phone`);
  return promise;
}


export { registerPeople, listPeople, listPhone };