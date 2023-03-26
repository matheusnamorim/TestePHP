import axios from 'axios';

const BASE_URL = 'http://localhost';

function registerPeople(body){
  const promise = axios.post(`${BASE_URL}/`, body);
  return promise;
}

function list(){
  const promise = axios.get(`${BASE_URL}/`);
  return promise;
}


export { registerPeople, list };