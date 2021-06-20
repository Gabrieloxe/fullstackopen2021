import axios from 'axios';
const baseURL = '/api/notes';

const getAll = () => {
  const request = axios.get(baseURL);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then(response => response.data);
};

const remove = (id) =>{
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response=> response.data);
}

const noteService = {
    getAll,
    create,
    update,
    remove
};

export default noteService;