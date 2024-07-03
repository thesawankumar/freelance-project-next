import axios from 'axios';

const getAxiosInstance = () => {
  const baseURL = window._env_ ? window._env_.BACKEND_URL : 'http://aacounty.oops-something-broke.gov';
  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default getAxiosInstance;




// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: `${(window as any)._env_.BACKEND_URL}`,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// export default axiosInstance;

// "use client";
// import axios from 'axios';

// const env=process.env

// const axiosInstance = axios.create({
//   baseURL: env.NEXT_PUBLIC_APP_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;
