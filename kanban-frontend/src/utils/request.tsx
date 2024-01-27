import axios from "axios";
import Cookies from "js-cookie";

let mainUrl:any;
let user_token;
let config:any;

if (import.meta.env.DEV) {
  mainUrl = 'http://localhost:8000/api/';
  user_token = Cookies.get('token');
  config = {
    'headers' : {
    'Content-Type': 'application/json',
    'Authorization': `Token ${user_token}`
      }
  }
}

export const loginRequest = async (data) => {
  const url = mainUrl + 'auth/login/';
  const response = await axios.post(url, data, config);
  return response;
}

export const fetchBoardList = async () => {
  const url = mainUrl + 'boards/';
  const response = await axios.get(url, config);
  return await response.data;
}

export const fetchBoardDetail = async (id) => {
  const url = mainUrl + `board/${id}`;
  const response = await axios.get(url, config);
  return await response.data;
}

export const sendBoardEdit = async (id, data) => {
  const url = mainUrl + `board/${id}`;
  const response = await axios.put(url, data, config);
  return await response
}

// sendBoardDelete

export const sendColumnAdd = async (data) => {
  const url = mainUrl + 'column/create';
  const response = await axios.post(url, data, config);
  return await response
}

export const sendColumnEdit = async (id, data) => {
  const url = mainUrl + `column/${id}`;
  const response = await axios.put(url, data, config);
  return response;
}

export const sendColumnDelete = async (id) => {
  const url = mainUrl + `column/${id}`;
  const response = await axios.delete(url, config);
  return response;
}

export const sendTaskAdd = async (columnId, data) => {
  const url = mainUrl + 'task/create';
  data.column = columnId;
  const response = await axios.post(url, data, config);
  return response;
}

export const sendTaskEdit = async (id, data) => {
  const url = mainUrl + `task/${id}`;
  const response = await axios.put(url, data, config);
  return response;
}

export const sendTaskDelete = async (id) => {
  const url = mainUrl + `task/${id}`;
  const response = await axios.delete(url, config);
  return response;
}

export const sendTaskMove = async (columnId, data) => {
  const url = mainUrl + `task/${data.id}`;
  data.column = columnId;
  const response = await axios.put(url, data, config);
  return response;
}