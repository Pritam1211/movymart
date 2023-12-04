import axios from "axios";

const BASE_PATH = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


export const fetchData = async(route: string, params?: any) => {
  try {
    const { data } = await axios.get(BASE_PATH + route, {
      params: {
        api_key: API_KEY,
        ...params
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};