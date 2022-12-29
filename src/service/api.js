 import axios from 'axios'
const URL='https://emailer2-api.onrender.com'
 export const addUser=async(data)=>{
    try{
        return await axios.post(`${URL}/add`,data)
    }catch(error){
        console.log('Api error');
    }
 }

 export const getUsers = async () =>{
    try{

        return await axios.get(`${URL}/`)
    }catch(error){
        console.log(error);
    }
 }

 export const getUser= async(id)=>{
    try{
        return await axios.get(`${URL}/${id}`)
    }catch(error){
        console.log(error);
    }
 }

 export const editUser= async(user,id)=>{
    try{
        return await axios.post(`${URL}/${id}`,user)
    }catch(error){
        console.log(error);
    }
 }
 export const deleteUser= async(id)=>{
    try{
        return await axios.delete(`${URL}/${id}`)
    }catch(error){
        console.log(error);
    }
 }

 export const sendData = async (extractedData) => {
    try {
      const response = await axios.post(`${URL}/send-data`, { data:extractedData });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
