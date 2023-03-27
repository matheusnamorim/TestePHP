import axios from 'axios';

const BASE_URL = 'http://localhost';

function registerPeople(body){
  const promise = axios.post(`${BASE_URL}/?path='people'`, body);
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

function listPhoneById(id){
  const promise = axios.get(`${BASE_URL}/?path=listOfPhoneById&id=${id}`);
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
  const promise = axios.put(`${BASE_URL}/?path=people&id=${id}`, body);
  return promise;
}

function updatePhoneById(body, id){
  const promise = axios.put(`${BASE_URL}/?path=phone&id=${id}`, body);
  return promise;
}

function addPhone(body, id){
  const promise = axios.post(`${BASE_URL}/?path=phone&id=${id}`, body);
  return promise;
}

export { registerPeople, listPeople, listPhone, listUserById, deleteById, updateById, listPhoneById, updatePhoneById, addPhone };