import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function FindImages(url) {
  const response = await axios.get(url);
  return response.data;
}
