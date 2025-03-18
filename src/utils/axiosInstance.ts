import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://leezhenwang.website',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 404:
          console.error('资源未找到');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('未知错误');
      }
    }
    return Promise.reject(error);
  }
);

// 封装 GET 方法
export const get = (url: string, params?: Record<string, any>) => {
  return instance.get(url, { params });
};

// 封装 POST 方法
export const post = (url: string, data?: Record<string, any>) => {
  return instance.post(url, data);
};

// 封装 JSONP 方法
export const jsonp = (url: string, callbackName: string = 'callback') => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${url}?${callbackName}=jsonpCallback`;
    document.body.appendChild(script);

    // 定义全局回调函数
    (window as any).jsonpCallback = (data: any) => {
      resolve(data);
      document.body.removeChild(script);
      delete window.jsonpCallback;
    };

    script.onerror = (error) => {
      reject(error);
      document.body.removeChild(script);
      delete window.jsonpCallback;
    };
  });
};

export const request = instance;