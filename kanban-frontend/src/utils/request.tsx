import axios from "axios";
import Cookies from "js-cookie";

let mainUrl:any;

if (import.meta.env.DEV) {
  mainUrl = 'http://localhost:8000/api/';
}

type ConfigType = {
  'headers': {
    'Content-Type': string,
    'Authorization'?: string,
  }
}

const generateConfig = (isLogin=false) => {
  const config:ConfigType = {
    'headers': {
      'Content-Type': 'application/json',
    }
  }

  if (isLogin) {
    const user_token = Cookies.get('token');
    config.headers.Authorization = `Token ${user_token}`
  }

  return config;
}

export const loginRequest = async (data) => {
  const config = generateConfig()
  const url = mainUrl + 'auth/login/';
  const response = await axios.post(url, data, config);
  return response;
}

export const fetchBoardList = async () => {
  const config = generateConfig(true)
  const url = mainUrl + 'boards/';
  const response = await axios.get(url, config);
  return await response.data;
}

export const fetchBoardDetail = async (id) => {
  const config = generateConfig(true)
  const url = mainUrl + `board/${id}`;
  const response = await axios.get(url, config);
  return await response.data;
}

export const sendBoardEdit = async (id, data) => {
  const config = generateConfig(true)
  const url = mainUrl + `board/${id}`;
  const response = await axios.put(url, data, config);
  return await response
}

// sendBoardDelete

export const sendColumnAdd = async (data) => {
  const config = generateConfig(true)
  const url = mainUrl + 'column/create';
  const response = await axios.post(url, data, config);
  return await response
}

export const sendColumnEdit = async (id, data) => {
  const config = generateConfig(true);
  const url = mainUrl + `column/${id}`;
  const response = await axios.put(url, data, config);
  return response;
}

export const sendColumnDelete = async (id) => {
  const config = generateConfig(true);
  const url = mainUrl + `column/${id}`;
  const response = await axios.delete(url, config);
  return response;
}

export const sendTaskAdd = async (columnId, data) => {
  const config = generateConfig(true);
  const url = mainUrl + 'task/create';
  data.column = columnId;
  const response = await axios.post(url, data, config);
  return response;
}

export const sendTaskEdit = async (id, data) => {
  const config = generateConfig(true);
  const url = mainUrl + `task/${id}`;
  const response = await axios.put(url, data, config);
  return response;
}

export const sendTaskDelete = async (id) => {
  const config = generateConfig(true);
  const url = mainUrl + `task/${id}`;
  const response = await axios.delete(url, config);
  return response;
}

export const sendTaskMove = async (columnId, data) => {
  const config = generateConfig(true);
  const url = mainUrl + `task/${data.id}`;
  data.column = columnId;
  const response = await axios.put(url, data, config);
  return response;
}