import axios  from 'axios';


export const BaseUrl="http://127.0.0.1:8000/api/";
export const MediaUrl="http://127.0.0.1:8000"
let token;
if(localStorage.getItem('tokens')){
  token=JSON.parse(localStorage.getItem('tokens'))
  console.log("token in axios");
}else{
  token=""
}
const instance = axios.create({
    baseURL: BaseUrl,
    headers:{
      Authorization:`Bearer ${token.access}`
    }
  });

  instance.interceptors.request.use(
    (config) => {
      const token=JSON.parse(localStorage.getItem('tokens'))
      if (token) {
        config.headers.Authorization = `Bearer ${token.access}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default instance;