import io from "socket.io-client";
export const BASE_URL_NOTIF = "https://asset.ut.ac.id:3012";
export const BASE_URL = "https://asset.ut.ac.id:3012/notif/testing";
export const BASE_URL_HRIS = "https://be2.ut.ac.id/hrd";
export const BASE_PATH_NOTIF = {
  create_collection: `${BASE_URL}/collection/`,
  get_by_from: `${BASE_URL}/messages/from/`,
  get_by_recieve: `${BASE_URL}/messages/to/`,
  get_by_id: `${BASE_URL}/message/`,
  post_message: `${BASE_URL}/message/`,
  get_all: `${BASE_URL}/message/`,
  read_message: `${BASE_URL}/read_message/`,
  post_single_message: `${BASE_URL}/testing/message/`,
  post_many_message: `${BASE_URL}/messages/Many/`,
};
export const BASE_PATH_HRIS = {
  userdatabyniparray: `${BASE_URL_HRIS}/pegawai/get-nip-array`,
  get_pegawai: `${BASE_URL_HRIS}/pegawai/`,
  get_pegawai_by_nama: `${BASE_URL_HRIS}/pegawai/get-nama`,
};

export const socketNotif = io(BASE_URL_NOTIF, {
  autoConnect: false,
  secure: true,
});
