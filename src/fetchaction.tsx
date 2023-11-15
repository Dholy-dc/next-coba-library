import { BASE_PATH_HRIS, BASE_PATH_NOTIF } from "./api";
import { axiosGet, axiosPost } from "./axiosaction";

export const getMessageRecieve = async (url: string, dataauthusman: object) => {
  const res = await axiosGet(url, dataauthusman);
  return res;
};

export const getDataPegawaiByNip = async (
  dataauthusman: object,
  data: any[]
) => {
  const body = {
    nip: data,
  };
  const res = await axiosPost(
    BASE_PATH_HRIS.userdatabyniparray,
    body,
    dataauthusman
  );
  return res;
};

export const getPegawaiByNama = async (dataauthusman: object, nama: string) => {
  const datanama = {
    nama: nama,
  };
  const res = await axiosPost(
    BASE_PATH_HRIS.get_pegawai_by_nama,
    datanama,
    dataauthusman
  );
  return res;
};

export const createColllection = async (dataauthusman: object, nip: string) => {
  const res = await axiosGet(
    BASE_PATH_NOTIF.create_collection + nip,
    dataauthusman
  );
  return res;
};

export const getPegawai = async (
  dataauthusman: object,
  limit: string,
  offset: string
) => {
  const res = await axiosGet(
    BASE_PATH_HRIS.get_pegawai + `${limit}/${offset}`,
    dataauthusman
  );
  return res;
};

export const postManyMessage = async (
  dataauthusman: object,
  body: any,
  nip: string
) => {
  const res = await axiosPost(
    BASE_PATH_NOTIF.post_many_message + nip,
    body,
    dataauthusman
  );
  return res;
};

export const fetchReadMessage = async (dataauthusman: object, id: string) => {
  const res = await axiosGet(BASE_PATH_NOTIF.read_message + id, dataauthusman);
  return res;
};
