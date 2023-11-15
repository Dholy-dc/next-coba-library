import axios from "axios";

export const axiosGet = async (url: string, dataauthusman: object) => {
  try {
    const res = await axios.get(url, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};

export const axiosPost = async (
  url: string,
  data: any,
  dataauthusman: object
) => {
  try {
    const res = await axios.post(url, data, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};
export const axiosDel = async (url: string, dataauthusman: object) => {
  try {
    const res = await axios.delete(url, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};

export const axiosPut = async (url: string, dataauthusman: object) => {
  try {
    const res = await axios.delete(url, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};
