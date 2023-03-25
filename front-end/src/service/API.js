import axios from 'axios';

const BASE_URL = 'https://localhost:8000';

function register(body){
  const promise = axios.post(`${BASE_URL}/index.php`, body);
  return promise;
}

function list(){
  const promise = axios.get(`${BASE_URL}/index.php`);
  return promise;
}


export { register, list };