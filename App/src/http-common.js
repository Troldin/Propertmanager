import axios from "axios";
import Cookies from 'js-cookie' 

export default axios.create({
  baseURL: "http://zettawhit.com:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": Cookies.get('key')
  }
});
