import axios from 'axios'
const baseURL = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const config = {
      headers: { Authorization: token},
  }

  const response = await axios.post(baseURL, newObject, config);
  console.log('response', response)
  return response.data;
}

export default { 
  getAll,
  create,
}