import axios from 'axios';
const baseURL = 'http://localhost:3001/persons'


const getAll = () =>{
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = (contact) =>{
    const request = axios.post(baseURL,contact);
    return request.then(response => response.data);
}

const update = (contact, id) =>{
    const request = axios.put( `${baseURL}/${id}` , contact)
    return request.then(response => response.data);
}

const remove = (id) =>{
    const request = axios.delete( `${baseURL}/${id}`)
    return request.then(response => response.data);
}

const contactService = {
    getAll,
    create,
    update,
    remove
}

export default contactService;
