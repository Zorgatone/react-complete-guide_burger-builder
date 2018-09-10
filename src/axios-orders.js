import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-tomz.firebaseio.com/"
});

export default instance;
