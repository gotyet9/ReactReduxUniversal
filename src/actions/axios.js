import axios from 'axios';
const config = {
  baseURL: "https://gotyet-bookshop.herokuapp.com:3001",
};

export default axios.create(config);
