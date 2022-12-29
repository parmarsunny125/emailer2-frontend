import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://emailer2-api.onrender.com',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('Token') || ''}`,
  },
});

export const addUser = async (data) => {
  try {
    return await instance.post('/add', data);
  } catch (error) {
    console.log('Api error');
  }
};

export const getUsers = async () => {
  try {
    return await instance.get('/');
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    return await instance.get(`/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (user, id) => {
  try {
    return await instance.post(`/${id}`, user);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await instance.delete(`/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const sendData = async (extractedData) => {
  try {
    const response = await instance.post('/send-data', { data: extractedData });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
