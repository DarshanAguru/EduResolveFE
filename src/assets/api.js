import axios  from 'axios';



const api = axios.create({
    // baseURL: 'https://appbackendserver.onrender.com',
    baseURL: "http://localhost:9000/v1",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    }
});


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
  

export default api;