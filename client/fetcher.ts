import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const fetcher = async (method, url, ...rest) => {
  const response = await axios[method](url, ...rest);
  return response.data;
};
export default fetcher;

/*
* ...rest : get/ delete , post/put 과 같은 두가지 형태의 인자를 모두 대응하기 위해서 ... 연산자 사용
  get: axios.get(url[,config])
  delete : axios.delete(url[,config])
  post : axios.post(url, data[, config])
  put : axios.put(url, data[, config])
*/
