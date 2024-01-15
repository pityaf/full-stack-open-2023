import axios from 'axios'
const baseURL = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  const request = axios.delete(`${baseURL}/${blog.id}`)
  return request.then(response => response.data)
}

const updateBlog = (blog) => {
  const request = axios.put(`${baseURL}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const config = {
      headers: { Authorization: token},
  }

  const response = await axios.post(baseURL, newObject, config);
  return response.data;
}

export default { 
  getAll,
  create,
  deleteBlog,
  updateBlog,
}