import axios from 'axios';

const BASE_URL = 'http://localhost';

function registerPeople(body){
  const promise = axios.post(`${BASE_URL}/`, body);
  return promise;
}

function listPeople(){
  const promise = axios.get(`${BASE_URL}/?path=listOfPeople`);
  return promise;
}

function listPhone(){
  const promise = axios.get(`${BASE_URL}/?path=listOfPhone`);
  return promise;
}

function listUserById(id){
  const promise = axios.get(`${BASE_URL}/?path=people&id=${id}`);
  return promise;
}

function deleteById(id){
  const promise = axios.delete(`${BASE_URL}/?path=${id}`);
  return promise;
}

function updateById(body, id){
  const promise = axios.update(`${BASE_URL}/?path=${id}`, body);
  return promise;
}


export { registerPeople, listPeople, listPhone, listUserById, deleteById, updateById };