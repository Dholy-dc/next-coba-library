import React__default, { createElement, useState, useEffect } from 'react';
import { Button, Badge, Avatar, Alert, Spin, Divider, Modal, Select, Input, notification, Drawer, FloatButton } from 'antd';
import { SettingFilled, FolderOpenOutlined, MailOutlined, FileImageOutlined, ContactsOutlined, ExclamationCircleOutlined, SearchOutlined, SendOutlined, CloseCircleOutlined, MailFilled, PlusOutlined, BellOutlined } from '@ant-design/icons';
import moment from 'moment';
import io from 'socket.io-client';
import axios from 'axios';
import 'moment/locale/id';
import { Editor } from '@tinymce/tinymce-react';

const Roboto = "Roboto, sans-serif";
const DmSerif = "DM Sans, sans-serif";
const Poppins = "Poppins, sans-serif";

const BASE_URL_NOTIF = "https://asset.ut.ac.id:3012";
const BASE_URL = "https://asset.ut.ac.id:3012/notif/testing";
const BASE_URL_HRIS = "https://be2.ut.ac.id/hrd";
const BASE_PATH_NOTIF = {
  create_collection: `${BASE_URL}/collection/`,
  get_by_from: `${BASE_URL}/messages/from/`,
  get_by_recieve: `${BASE_URL}/messages/to/`,
  get_by_id: `${BASE_URL}/message/`,
  post_message: `${BASE_URL}/message/`,
  get_all: `${BASE_URL}/message/`,
  read_message: `${BASE_URL}/read_message/`,
  post_single_message: `${BASE_URL}/testing/message/`,
  post_many_message: `${BASE_URL}/messages/Many/`
};
const BASE_PATH_HRIS = {
  userdatabyniparray: `${BASE_URL_HRIS}/pegawai/get-nip-array`,
  get_pegawai: `${BASE_URL_HRIS}/pegawai/`,
  get_pegawai_by_nama: `${BASE_URL_HRIS}/pegawai/get-nama`
};
const socketNotif = io(BASE_URL_NOTIF, {
  autoConnect: false,
  secure: true
});

const axiosGet = async (url, dataauthusman) => {
  try {
    const res = await axios.get(url, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};
const axiosPost = async (url, data, dataauthusman) => {
  try {
    const res = await axios.post(url, data, dataauthusman);
    return res;
  } catch (err) {
    return err;
  }
};

const getMessageRecieve = async (url, dataauthusman) => {
  const res = await axiosGet(url, dataauthusman);
  return res;
};
const getDataPegawaiByNip = async (dataauthusman, data) => {
  const body = {
    nip: data
  };
  const res = await axiosPost(BASE_PATH_HRIS.userdatabyniparray, body, dataauthusman);
  return res;
};
const getPegawaiByNama = async (dataauthusman, nama) => {
  const datanama = {
    nama: nama
  };
  const res = await axiosPost(BASE_PATH_HRIS.get_pegawai_by_nama, datanama, dataauthusman);
  return res;
};
const createColllection = async (dataauthusman, nip) => {
  const res = await axiosGet(BASE_PATH_NOTIF.create_collection + nip, dataauthusman);
  return res;
};
const getPegawai = async (dataauthusman, limit, offset) => {
  const res = await axiosGet(BASE_PATH_HRIS.get_pegawai + `${limit}/${offset}`, dataauthusman);
  return res;
};
const postManyMessage = async (dataauthusman, body, nip) => {
  const res = await axiosPost(BASE_PATH_NOTIF.post_many_message + nip, body, dataauthusman);
  return res;
};
const fetchReadMessage = async (dataauthusman, id) => {
  const res = await axiosGet(BASE_PATH_NOTIF.read_message + id, dataauthusman);
  return res;
};

const findDataReadMessage = async (dataMessage, dataRead) => {
  const arrayDataMessage = dataMessage;
  const findIndexRead = dataMessage === null || dataMessage === void 0 ? void 0 : dataMessage.findIndex(a => a._id === (dataRead === null || dataRead === void 0 ? void 0 : dataRead._id));
  arrayDataMessage[findIndexRead] = dataRead;
  return arrayDataMessage;
};

const SeeWhoOnline = () => {
  return createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      height: "100%",
      fontFamily: DmSerif,
      fontSize: 20
    }
  }, createElement(SettingFilled, {
    style: {
      fontSize: 50,
      marginRight: 5
    },
    spin: true
  }), createElement("p", null, "Page On Progress"));
};

const GalleryPage = () => {
  return createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      height: "100%",
      fontFamily: DmSerif,
      fontSize: 20
    }
  }, createElement(SettingFilled, {
    style: {
      fontSize: 50,
      marginRight: 5
    },
    spin: true
  }), createElement("p", null, "Page On Progess"));
};

const LeftContent = ({
  dataMessageRecieve,
  dataMessageSender,
  setFocusMessage,
  focusMessage,
  dataPegawai,
  setFocusScreenContent,
  dataauthusman,
  setDataMessageReceive,
  setDataMessageSender,
  funtionGetDataPegawai,
  nip,
  setLoadingRightContent,
  setLoadingLeftContent,
  loadingLeftContent
}) => {
  const [focusMenuData, setFocusMenuData] = useState(1);
  const LoadingLeft = () => {
    return React__default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        color: 'white',
        fontSize: 20,
        fontFamily: DmSerif
      }
    }, React__default.createElement(Spin, {
      size: 'large'
    }), React__default.createElement("p", null, "Loading..."));
  };
  const RenderInbox = () => {
    if (loadingLeftContent) {
      return React__default.createElement(LoadingLeft, null);
    }
    return React__default.createElement("div", {
      style: {
        paddingRight: 5
      }
    }, dataMessageRecieve === null || dataMessageRecieve === void 0 ? void 0 : dataMessageRecieve.map((res, i) => {
      var _pegawai$TrxUnitKerja, _pegawai$TrxUnitKerja2;
      const pegawai = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(a => a.nip === res.from);
      return React__default.createElement(Badge.Ribbon, {
        text: res !== null && res !== void 0 && res.status_read ? '' : 'Pesan Baru',
        color: 'orange',
        key: i,
        placement: 'end',
        style: {
          marginRight: 6,
          fontSize: 12,
          display: res !== null && res !== void 0 && res.status_read ? 'none' : 'block'
        }
      }, React__default.createElement("div", {
        onClick: () => {
          setLoadingRightContent(true);
          fetchReadMessage(dataauthusman, res._id).then(data => {
            var _data$data;
            setLoadingRightContent(false);
            setFocusMessage(res._id);
            setFocusScreenContent('inbox');
            if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
              var _data$data2;
              const values = data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.data;
              const dataMessage = dataMessageRecieve;
              findDataReadMessage(dataMessage, values).then(data => {
                setDataMessageReceive(data);
              });
            }
          }).catch(err => {
            console.log(err);
            setFocusMessage(res._id);
            setFocusScreenContent('inbox');
            setLoadingRightContent(false);
          });
        },
        key: i,
        style: {
          padding: 10,
          borderBottomStyle: 'groove',
          cursor: 'pointer',
          backgroundColor: focusMessage === res._id ? 'lightgray' : 'white',
          borderRadius: 5,
          margin: 7,
          fontFamily: Poppins,
          textTransform: 'capitalize'
        }
      }, React__default.createElement("div", {
        style: {
          display: 'flex',
          gap: 5,
          alignItems: 'center',
          marginBottom: 5
        }
      }, React__default.createElement(Avatar, {
        src: pegawai === null || pegawai === void 0 ? void 0 : pegawai.foto_pegawai,
        alt: 'foto pegawai'
      }), React__default.createElement("div", null, React__default.createElement("p", {
        style: {
          fontWeight: '700',
          fontSize: 13,
          fontFamily: Roboto
        }
      }, (res === null || res === void 0 ? void 0 : res.name_sender) === undefined ? 'Unknowns' : res === null || res === void 0 ? void 0 : res.name_sender), React__default.createElement("p", {
        style: {
          fontSize: 11,
          fontFamily: Roboto
        }
      }, pegawai === null || pegawai === void 0 ? void 0 : (_pegawai$TrxUnitKerja = pegawai.TrxUnitKerjaPegawais[0]) === null || _pegawai$TrxUnitKerja === void 0 ? void 0 : (_pegawai$TrxUnitKerja2 = _pegawai$TrxUnitKerja.Unit) === null || _pegawai$TrxUnitKerja2 === void 0 ? void 0 : _pegawai$TrxUnitKerja2.nama_unit))), React__default.createElement("p", {
        style: {
          fontSize: 13,
          opacity: 0.7,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontFamily: Roboto
        }
      }, (res === null || res === void 0 ? void 0 : res.subject) === undefined ? 'No Subject Found' : res === null || res === void 0 ? void 0 : res.subject), React__default.createElement("p", {
        style: {
          fontSize: 10,
          opacity: 0.8,
          fontFamily: Roboto
        }
      }, moment(res === null || res === void 0 ? void 0 : res.createdAt).format('LLLL')), React__default.createElement("div", {
        style: {
          display: 'flex',
          marginTop: 10
        }
      }, React__default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 1
        }
      }, React__default.createElement(Button, {
        size: 'small'
      }, "Reply")))));
    }));
  };
  const RenderOutbox = () => {
    if (loadingLeftContent) {
      return React__default.createElement(LoadingLeft, null);
    }
    return React__default.createElement("div", null, dataMessageSender === null || dataMessageSender === void 0 ? void 0 : dataMessageSender.map((res, i) => {
      const pegawai = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(a => a.nip === res.to);
      return React__default.createElement("div", {
        onClick: () => {
          setFocusMessage(res._id);
          setFocusScreenContent('outbox');
        },
        key: i,
        style: {
          padding: 10,
          borderWidth: 1,
          borderBottomStyle: 'groove',
          cursor: 'pointer',
          backgroundColor: focusMessage === res._id ? 'lightgray' : 'white',
          borderRadius: 5,
          margin: 7
        }
      }, React__default.createElement("div", {
        style: {
          display: 'flex',
          gap: 5,
          alignItems: 'center',
          marginBottom: 5
        }
      }, React__default.createElement(Avatar, {
        src: pegawai === null || pegawai === void 0 ? void 0 : pegawai.foto_pegawai
      }), React__default.createElement("p", {
        style: {
          fontWeight: '700',
          fontSize: 13,
          fontFamily: Roboto
        }
      }, (res === null || res === void 0 ? void 0 : res.name_receiver) === undefined ? 'unknown' : res === null || res === void 0 ? void 0 : res.name_receiver)), React__default.createElement("p", {
        style: {
          fontSize: 13,
          opacity: 0.7,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontFamily: Roboto,
          textTransform: 'capitalize'
        }
      }, (res === null || res === void 0 ? void 0 : res.subject) === undefined ? 'No Subject Found' : res === null || res === void 0 ? void 0 : res.subject), React__default.createElement("p", {
        style: {
          fontSize: 10,
          opacity: 0.8
        }
      }, moment(res === null || res === void 0 ? void 0 : res.createdAt).format('LLLL')), React__default.createElement("div", {
        style: {
          display: 'flex',
          gap: 5,
          justifyContent: 'flex-end',
          marginTop: 10
        }
      }, React__default.createElement(Alert, {
        message: 'Terkirim',
        showIcon: true,
        type: 'success',
        style: {
          fontSize: 10,
          padding: 2
        }
      }), React__default.createElement(Alert, {
        message: res !== null && res !== void 0 && res.status_read ? 'Di Baca' : 'Belum Dibaca',
        type: res !== null && res !== void 0 && res.status_read ? 'success' : 'error',
        style: {
          fontSize: 10,
          padding: 2
        },
        showIcon: true
      })));
    }));
  };
  return React__default.createElement("div", {
    style: {
      height: '93vh',
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      overflowY: 'auto',
      backgroundColor: '#243F51',
      paddingBottom: 30,
      flex: 0.6
    }
  }, React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 10,
      borderBottom: 2,
      borderBottomStyle: 'groove',
      position: 'sticky',
      top: 0,
      backgroundColor: '#243F57',
      paddingLeft: 10,
      zIndex: 1,
      boxShadow: '1px 1px 5px #243F57'
    }
  }, React__default.createElement(Button, {
    onClick: () => {
      setFocusMenuData(1);
      setLoadingLeftContent(true);
      getMessageRecieve(BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50', dataauthusman).then(data => {
        var _data$data3;
        setLoadingLeftContent(false);
        if ((data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.status) === 'success') {
          var _data$data4, _data$data5, _data$data5$data;
          let val = data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : _data$data4.data;
          setDataMessageReceive(val);
          if ((data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : (_data$data5$data = _data$data5.data) === null || _data$data5$data === void 0 ? void 0 : _data$data5$data.length) > 0) {
            var _data$data6;
            funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.data);
          }
        } else {
          setDataMessageReceive([]);
        }
      }).catch(err => {
        console.log(err);
        setLoadingLeftContent(false);
        setDataMessageReceive([]);
      });
    },
    style: {
      opacity: focusMenuData === 1 ? 1 : 0.5,
      borderWidth: 0,
      boxShadow: 'none',
      marginBottom: 10,
      padding: 0,
      color: 'white'
    }
  }, React__default.createElement(FolderOpenOutlined, {
    style: {
      fontSize: 17
    }
  }), React__default.createElement("p", {
    style: {
      fontSize: 14,
      margin: 0,
      fontWeight: 500,
      fontFamily: DmSerif
    }
  }, "Inbox")), React__default.createElement(Button, {
    onClick: () => {
      setFocusMenuData(2);
      setLoadingLeftContent(true);
      getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(data => {
        var _data$data7;
        setLoadingLeftContent(false);
        if ((data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : _data$data7.status) === 'success') {
          var _data$data8, _data$data9, _data$data9$data;
          let val = data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.data;
          setDataMessageSender(val);
          if ((data === null || data === void 0 ? void 0 : (_data$data9 = data.data) === null || _data$data9 === void 0 ? void 0 : (_data$data9$data = _data$data9.data) === null || _data$data9$data === void 0 ? void 0 : _data$data9$data.length) > 0) {
            var _data$data10;
            funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data10 = data.data) === null || _data$data10 === void 0 ? void 0 : _data$data10.data);
          }
        } else {
          setDataMessageSender([]);
        }
      }).catch(err => {
        console.log(err);
        setLoadingLeftContent(true);
      });
    },
    style: {
      opacity: focusMenuData === 2 ? 1 : 0.5,
      borderWidth: 0,
      boxShadow: 'none',
      marginBottom: 10,
      padding: 0,
      color: 'white'
    }
  }, React__default.createElement(MailOutlined, {
    style: {
      fontSize: 15
    }
  }), React__default.createElement("p", {
    style: {
      fontSize: 14,
      margin: 0,
      fontWeight: 500,
      fontFamily: DmSerif
    }
  }, "Outbox")), React__default.createElement(Button, {
    title: 'Coming soon',
    onClick: () => {
      setFocusMenuData(3);
    },
    style: {
      opacity: focusMenuData === 3 ? 1 : 0.5,
      borderWidth: 0,
      boxShadow: 'none',
      marginBottom: 10,
      padding: 0,
      color: 'white'
    }
  }, React__default.createElement(FileImageOutlined, {
    style: {
      fontSize: 15
    }
  }), React__default.createElement("p", {
    style: {
      fontSize: 14,
      margin: 0,
      fontWeight: 500,
      fontFamily: DmSerif
    }
  }, "Galery")), React__default.createElement(Button, {
    onClick: () => {
      setFocusMenuData(4);
    },
    style: {
      borderWidth: 0,
      boxShadow: 'none',
      marginBottom: 10,
      padding: 0,
      color: 'white',
      opacity: focusMenuData === 4 ? 1 : 0.5
    }
  }, React__default.createElement(ContactsOutlined, {
    style: {
      fontSize: 17
    }
  }), React__default.createElement("p", {
    style: {
      fontSize: 14,
      margin: 0,
      fontWeight: 500,
      fontFamily: DmSerif
    }
  }, "who's online ?"))), focusMenuData === 1 ? React__default.createElement(RenderInbox, null) : focusMenuData === 2 ? React__default.createElement(RenderOutbox, null) : focusMenuData === 4 ? React__default.createElement(SeeWhoOnline, null) : React__default.createElement(GalleryPage, null));
};

const RightContent = ({
  dataMessageRecieve,
  dataMessageSender,
  focusMessage,
  loadingRightContent
}) => {
  let gabungDataMessage = [...dataMessageRecieve, ...dataMessageSender];
  let findMessageFocus = gabungDataMessage === null || gabungDataMessage === void 0 ? void 0 : gabungDataMessage.find(a => (a === null || a === void 0 ? void 0 : a._id) == focusMessage);
  let ref = React__default.useRef(null);
  if (findMessageFocus === undefined) {
    return React__default.createElement("div", {
      style: {
        height: '100vh',
        flex: 2,
        padding: 10,
        textAlign: 'center'
      }
    }, React__default.createElement("p", null, "Selamat Datang Di SIPPP Mail"));
  }
  if (loadingRightContent) {
    return React__default.createElement("div", {
      style: {
        height: '100vh',
        flex: 2,
        padding: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, React__default.createElement(ExclamationCircleOutlined, {
      style: {
        color: 'black',
        fontSize: 30
      },
      spin: true
    }), React__default.createElement("p", null, "Mohon Tunggu.."));
  }
  return React__default.createElement("div", {
    style: {
      height: '93vh',
      flex: 2,
      padding: 20,
      backgroundColor: 'whitesmoke',
      zIndex: 0,
      overflow: 'auto',
      fontFamily: Poppins,
      paddingBottom: 30
    }
  }, React__default.createElement("p", {
    style: {
      fontSize: 30,
      opacity: 0.5
    }
  }, "INBOX"), React__default.createElement(Divider, {
    style: {
      margin: 0,
      marginTop: 5,
      borderWidth: 2
    }
  }), React__default.createElement("div", {
    style: {
      padding: 20
    }
  }, React__default.createElement("p", {
    style: {
      fontSize: 14
    }
  }, findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.name_sender), React__default.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: '300',
      color: 'black',
      opacity: 0.6
    }
  }, moment(findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.createdAt).format('LLLL'))), React__default.createElement("div", {
    style: {
      padding: 10,
      display: 'flex',
      fontWeight: '400',
      textTransform: 'capitalize',
      fontSize: 13,
      backgroundColor: 'white',
      marginRight: '1%',
      marginLeft: '1%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomWidth: 1
    }
  }, React__default.createElement("p", null, ' ', "Subject :", ' ', (findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.subject) === undefined ? ' No Subject' : findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.subject)), React__default.createElement("div", {
    style: {
      display: 'flex',
      backgroundColor: 'white',
      marginRight: '1%',
      marginLeft: '1%',
      paddingTop: 10,
      padding: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  }, React__default.createElement("div", {
    style: {
      minWidth: '210mm'
    },
    ref: ref,
    dangerouslySetInnerHTML: {
      __html: findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.message
    }
  })));
};

const NewMail = ({
  open,
  setOpen,
  dataauthusman,
  name,
  nip,
  funtionGetDataPegawai,
  setDataMessageSender
}) => {
  const [loadingEditor, setLoadingEditor] = React__default.useState(true);
  const [valueEditor, setValueEditor] = React__default.useState('');
  const [dataPegawai, setDataPegawai] = React__default.useState([]);
  const [dataEmail, setDataEmail] = React__default.useState([]);
  const [valSubject, setValSubject] = React__default.useState('');
  const [valSearch, setValSearch] = React__default.useState('');
  const [loadingNewMail, setLoadingNewMail] = React__default.useState(false);
  const clearForm = () => {
    setValueEditor('');
    setDataEmail([]);
    setDataPegawai([]);
    setValSubject('');
    setValSearch('');
    setLoadingNewMail(false);
    setOpen(false);
  };
  const postMessageMany = () => {
    setLoadingNewMail(true);
    let y = [];
    dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.forEach(a => {
      y.push({
        from: a === null || a === void 0 ? void 0 : a.from,
        to: a === null || a === void 0 ? void 0 : a.to,
        name_sender: a === null || a === void 0 ? void 0 : a.name_sender,
        name_receiver: a === null || a === void 0 ? void 0 : a.name_receiver,
        message: valueEditor,
        subject: valSubject,
        status_read: false,
        kategori: 'pesan'
      });
    });
    let arrayMessage = {
      array_message: y
    };
    postManyMessage(dataauthusman, arrayMessage, nip).then(data => {
      var _data$data;
      if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
        getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(data => {
          var _data$data2;
          if ((data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.status) === 'success') {
            var _data$data3, _data$data4, _data$data4$data;
            clearForm();
            let val = data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.data;
            setDataMessageSender(val);
            if ((data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : (_data$data4$data = _data$data4.data) === null || _data$data4$data === void 0 ? void 0 : _data$data4$data.length) > 0) {
              var _data$data5;
              funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : _data$data5.data);
            }
          }
        }).catch(err => {
          console.log(err);
          clearForm();
          notification.error({
            message: 'Error Get Data Message Send'
          });
        });
      }
    }).catch(err => {
      console.log(err);
      clearForm();
      notification.error({
        message: 'Error Post Data Message'
      });
    });
  };
  return React__default.createElement(Modal, {
    open: open,
    onCancel: () => {
      clearForm();
    },
    bodyStyle: {
      padding: 10,
      paddingTop: 20,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footer: false,
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, React__default.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      flexDirection: 'column'
    }
  }, React__default.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React__default.createElement("p", null, "Select User"), React__default.createElement(Select, {
    disabled: loadingNewMail,
    style: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 0,
      width: '100%'
    },
    size: 'large',
    showSearch: true,
    value: dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.map(a => {
      return a === null || a === void 0 ? void 0 : a.to;
    }),
    onDeselect: e => {
      const j = dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.filter(a => (a === null || a === void 0 ? void 0 : a.to) !== e);
      setDataEmail(j);
    },
    searchValue: valSearch,
    onSearch: e => {
      setValSearch(e);
    },
    onSelect: e => {
      const g = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(a => a.nip === e);
      let o = {
        name_receiver: g === null || g === void 0 ? void 0 : g.nama_pegawai,
        to: g === null || g === void 0 ? void 0 : g.nip,
        name_sender: name,
        from: nip
      };
      setDataEmail(a => [...a, o]);
    },
    onDropdownVisibleChange: () => {
      getPegawai(dataauthusman, '100', '0').then(data => {
        var _data$data6;
        if ((data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.status) === 'Success') {
          var _data$data7;
          let val = data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : _data$data7.data;
          setDataPegawai(val);
        }
      });
    },
    mode: 'multiple',
    labelInValue: false,
    bordered: false,
    suffixIcon: React__default.createElement("div", null, React__default.createElement(Button, {
      icon: React__default.createElement(SearchOutlined, {
        style: {
          fontSize: 40
        }
      }),
      style: {
        borderWidth: 0,
        padding: 0,
        margin: 0
      },
      onClick: () => {
        getPegawaiByNama(dataauthusman, valSearch).then(data => {
          var _data$data8;
          if ((data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.status) === 'Success') {
            var _data$data9;
            setDataPegawai(data === null || data === void 0 ? void 0 : (_data$data9 = data.data) === null || _data$data9 === void 0 ? void 0 : _data$data9.data);
          }
        });
      }
    })),
    filterOption: false
  }, dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.map((a, i) => {
    return React__default.createElement(Select.Option, {
      key: i,
      value: a === null || a === void 0 ? void 0 : a.nip
    }, React__default.createElement(Avatar, {
      src: a === null || a === void 0 ? void 0 : a.foto_pegawai,
      size: 'small',
      style: {
        marginRight: 5
      }
    }), a.nama_pegawai);
  }))), React__default.createElement("div", {
    style: {
      width: '100%',
      marginBottom: 20
    }
  }, React__default.createElement("p", null, "Subject"), React__default.createElement(Input.TextArea, {
    disabled: loadingNewMail,
    maxLength: 300,
    placeholder: 'Max 300 character',
    autoSize: {
      minRows: 3,
      maxRows: 5
    },
    showCount: true,
    value: valSubject,
    onChange: e => {
      setValSubject(e.target.value);
    }
  })), loadingEditor ? React__default.createElement("div", {
    style: {
      height: '210mm',
      width: '297mm',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React__default.createElement(Spin, {
    size: 'large'
  })) : '', React__default.createElement(Editor, {
    disabled: loadingNewMail,
    value: valueEditor,
    apiKey: '36iqfcag9kzushye6d2mkf16270vqoj0k83nw2w516wzwozt',
    onEditorChange: e => {
      setValueEditor(e);
    },
    onInit: () => {
      setLoadingEditor(false);
    },
    init: {
      height: '297mm',
      width: '210mm',
      plugins: 'pagebreak | table ',
      table_tab_navigation: true,
      toolbar: 'undo | redo | bold | fontselect | fontsizeselect | aligncenter | alignjustify | alignleft | alignnone | alignright | pagebreak | table | forecolor backcolor'
    }
  }), React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      width: '100%',
      marginTop: 20
    }
  }, React__default.createElement(Button, {
    disabled: loadingNewMail,
    loading: loadingNewMail,
    icon: React__default.createElement(SendOutlined, null),
    style: {
      backgroundColor: 'lightblue',
      color: 'white',
      fontFamily: DmSerif
    },
    onClick: () => {
      postMessageMany();
    }
  }, "Send"), React__default.createElement(Button, {
    onClick: () => {
      clearForm();
    }
  }, "Cancel"))));
};

const RightContentOutbox = ({
  dataMessageRecieve,
  dataMessageSender,
  focusMessage
}) => {
  let gabungDataMessage = [...dataMessageRecieve, ...dataMessageSender];
  let findMessageFocus = gabungDataMessage === null || gabungDataMessage === void 0 ? void 0 : gabungDataMessage.find(a => (a === null || a === void 0 ? void 0 : a._id) == focusMessage);
  let ref = React__default.useRef(null);
  if (findMessageFocus === undefined) {
    return React__default.createElement("div", {
      style: {
        height: '100vh',
        flex: 2,
        padding: 10,
        textAlign: 'center'
      }
    }, React__default.createElement("p", null, "Selamat Datang Di SIPPP Mail"));
  }
  return React__default.createElement("div", {
    style: {
      height: '93vh',
      flex: 2,
      padding: 20,
      backgroundColor: 'whitesmoke',
      zIndex: 0,
      overflow: 'auto',
      fontFamily: Poppins,
      paddingBottom: 30
    }
  }, React__default.createElement("p", {
    style: {
      fontSize: 30,
      opacity: 0.5
    }
  }, "OUTBOX"), React__default.createElement(Divider, {
    style: {
      margin: 0,
      marginTop: 5,
      borderWidth: 2
    }
  }), React__default.createElement("div", {
    style: {
      padding: 20
    }
  }, React__default.createElement("p", {
    style: {
      fontSize: 14
    }
  }, findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.name_receiver), React__default.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: '200',
      color: 'black',
      opacity: 0.6
    }
  }, moment(findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.createdAt).format('LLLL'))), React__default.createElement("div", {
    style: {
      padding: 10,
      display: 'flex',
      fontWeight: '400',
      textTransform: 'capitalize',
      fontSize: 13,
      backgroundColor: 'white',
      marginRight: '1%',
      marginLeft: '1%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomWidth: 1
    }
  }, React__default.createElement("p", null, ' ', "Subject :", ' ', (findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.subject) === undefined ? ' No Subject' : findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.subject)), React__default.createElement("div", {
    style: {
      display: 'flex',
      backgroundColor: 'white',
      marginRight: '1%',
      marginLeft: '1%',
      paddingTop: 10,
      padding: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  }, React__default.createElement("div", {
    style: {
      minWidth: '210mm'
    },
    ref: ref,
    dangerouslySetInnerHTML: {
      __html: findMessageFocus === null || findMessageFocus === void 0 ? void 0 : findMessageFocus.message
    }
  })));
};

const Content = ({
  open,
  setOpen,
  dataMessageRecieve,
  dataMessageSender,
  focusMessage,
  setFocusMessage,
  datauser,
  dataPegawai,
  dataauthusman,
  name,
  nip,
  setDataMessageReceive,
  setDataMessageSender,
  funtionGetDataPegawai,
  loadingRightContent,
  setLoadingRightContent,
  loadingLeftContent,
  setLoadingLeftContent
}) => {
  const [openNewMail, setOpenNewMail] = React__default.useState(false);
  const [focusScreenContent, setFocusScreenContent] = React__default.useState("");
  return React__default.createElement(Drawer, {
    placement: "right",
    open: open,
    size: "large",
    width: "100%",
    closeIcon: React__default.createElement(CloseCircleOutlined, {
      style: {
        color: "lightgrey"
      }
    }),
    title: React__default.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, React__default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        marginLeft: 10,
        color: "white"
      }
    }, React__default.createElement("p", {
      style: {
        margin: 0,
        fontFamily: DmSerif,
        fontWeight: 800,
        fontSize: 27,
        padding: 0
      }
    }, "SIPPP", React__default.createElement(MailFilled, {
      style: {
        marginRight: 0,
        fontSize: 25,
        rotate: "-40deg"
      }
    }), "Mail Box")), React__default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, React__default.createElement("div", {
      style: {
        fontSize: 14,
        fontFamily: DmSerif,
        fontWeight: "700",
        color: "lightgrey"
      }
    }, React__default.createElement("p", {
      style: {
        fontWeight: "400",
        fontSize: 11
      }
    }, datauser === null || datauser === void 0 ? void 0 : datauser.nip), React__default.createElement("p", null, datauser === null || datauser === void 0 ? void 0 : datauser.nama)), React__default.createElement(Avatar, {
      src: datauser === null || datauser === void 0 ? void 0 : datauser.url_foto,
      alt: "foto user",
      style: {
        width: 50,
        height: 50
      }
    }))),
    headerStyle: {
      boxShadow: "1px 5px 4px lightgrey",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#15324D",
      zIndex: 1
    },
    onClose: () => {
      setOpen(false);
    },
    style: {
      color: "black",
      padding: 0,
      overflow: "hidden"
    },
    bodyStyle: {
      padding: 0,
      overflow: "hidden"
    }
  }, React__default.createElement("div", {
    style: {
      display: "flex"
    }
  }, React__default.createElement(LeftContent, {
    dataMessageRecieve: dataMessageRecieve,
    dataMessageSender: dataMessageSender,
    setFocusMessage: setFocusMessage,
    focusMessage: focusMessage,
    dataPegawai: dataPegawai,
    setFocusScreenContent: setFocusScreenContent,
    dataauthusman: dataauthusman,
    setDataMessageReceive: setDataMessageReceive,
    setDataMessageSender: setDataMessageSender,
    nip: nip,
    funtionGetDataPegawai: funtionGetDataPegawai,
    setLoadingRightContent: setLoadingRightContent,
    loadingLeftContent: loadingLeftContent,
    setLoadingLeftContent: setLoadingLeftContent
  }), focusScreenContent === "inbox" ? React__default.createElement(RightContent, {
    dataMessageRecieve: dataMessageRecieve,
    dataMessageSender: dataMessageSender,
    focusMessage: focusMessage,
    loadingRightContent: loadingRightContent
  }) : React__default.createElement(RightContentOutbox, {
    dataMessageRecieve: dataMessageRecieve,
    dataMessageSender: dataMessageSender,
    focusMessage: focusMessage
  }), React__default.createElement(FloatButton, {
    icon: React__default.createElement(PlusOutlined, {
      style: {
        fontSize: 20
      }
    }),
    onClick: () => {
      setOpenNewMail(true);
    }
  }), React__default.createElement(NewMail, {
    open: openNewMail,
    setOpen: setOpenNewMail,
    dataauthusman: dataauthusman,
    name: name,
    nip: nip,
    funtionGetDataPegawai: funtionGetDataPegawai,
    setDataMessageSender: setDataMessageSender
  })));
};

const MessageComponent = ({
  style,
  nip,
  nama,
  id_user,
  kode_group,
  token_lama,
  token_baru,
  url_foto_user
}) => {
  const [open, setOpen] = useState(false);
  const [dataMessageRecieve, setDataMessageRecieve] = useState([]);
  const [dataMessageSender, setDataMessageSender] = useState([]);
  const [focusMessage, setFocusMessage] = useState('');
  const [dataPegawai, setDataPegawai] = useState([]);
  const [idMessageRead, setIdMessageRead] = useState(null);
  const [countMessage, setCountMessage] = useState(0);
  const [loadingRightContent, setLoadingRightContent] = useState(false);
  const [loadingLeftContent, setLoadingLeftContent] = useState(false);
  const dataauthusman = {
    id_user: id_user,
    kode_group: kode_group,
    token_lama: token_lama,
    token_baru: token_baru
  };
  const datauser = {
    nip: nip,
    nama: nama,
    url_foto: url_foto_user
  };
  useEffect(() => {
    socketNotif.emit('join_room_testing', {
      roomId: nip
    });
    socketNotif.connect();
  }, []);
  useEffect(() => {
    const counts = dataMessageRecieve === null || dataMessageRecieve === void 0 ? void 0 : dataMessageRecieve.filter(a => a.status_read === false);
    setCountMessage(counts === null || counts === void 0 ? void 0 : counts.length);
  }, [dataMessageRecieve]);
  useEffect(() => {
    socketNotif.on('message', data => {
      if (data.response === 'receive_message') {
        var _data$dataMessage;
        notification.info({
          message: 'Anda Mempunyai Pesan Baru'
        });
        setDataMessageRecieve(a => [data === null || data === void 0 ? void 0 : data.dataMessage, ...a]);
        getDataPegawaiByNip(dataauthusman, [{
          nip: data === null || data === void 0 ? void 0 : (_data$dataMessage = data.dataMessage) === null || _data$dataMessage === void 0 ? void 0 : _data$dataMessage.from
        }]).then(res => {
          var _res$data;
          if ((res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.status) === 'Success') {
            setDataPegawai(a => {
              var _res$data2;
              return [...a, ...(res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data)];
            });
          }
        });
      }
    });
    return () => {
      socketNotif.close();
    };
  }, [socketNotif]);
  useEffect(() => {
    socketNotif.on('message', data => {
      if (data.response === 'status_read') {
        setIdMessageRead(data.dataMessage._id);
      }
    });
    return () => {
      socketNotif.close();
    };
  }, [socketNotif]);
  useEffect(() => {
    if (idMessageRead !== null) {
      updateRead();
    }
  }, [idMessageRead]);
  const updateRead = () => {
    const p = [...dataMessageSender];
    const l = dataMessageSender.some(m => m._id === idMessageRead);
    if (l === true) {
      const k = dataMessageSender.findIndex(a => a._id === idMessageRead);
      p[k].status_read = true;
      setDataMessageSender(p);
      setIdMessageRead(null);
    }
  };
  const funtionGetDataPegawai = val => {
    const tampungNip = [];
    const tampungNip2 = [];
    val === null || val === void 0 ? void 0 : val.forEach(a => {
      tampungNip.push(a.from);
      tampungNip.push(a.to);
    });
    if (tampungNip.length > 0) {
      const u = new Set(tampungNip);
      u.forEach(a => {
        tampungNip2.push({
          nip: a
        });
      });
      getDataPegawaiByNip(dataauthusman, tampungNip2).then(res => {
        var _res$data3;
        console.log('asasd', val, res);
        if ((res === null || res === void 0 ? void 0 : (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.status) === 'Success') {
          setDataPegawai(a => {
            var _res$data4;
            return [...a, ...(res === null || res === void 0 ? void 0 : (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.data)];
          });
        }
      });
    }
  };
  useEffect(() => {
    setLoadingLeftContent(true);
    createColllection(dataauthusman, nip).then(response => {
      var _response$data;
      if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.status) === 'done') ; else {
        var _response$data2;
        let val = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.children;
        setDataMessageRecieve(val);
      }
    });
    getMessageRecieve(BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50', dataauthusman).then(data => {
      var _data$data;
      setLoadingLeftContent(false);
      if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
        var _data$data2, _data$data3, _data$data3$data;
        let val = data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.data;
        setDataMessageRecieve(val);
        if ((data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : (_data$data3$data = _data$data3.data) === null || _data$data3$data === void 0 ? void 0 : _data$data3$data.length) > 0) {
          var _data$data4;
          funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : _data$data4.data);
        }
      } else {
        setDataMessageRecieve([]);
      }
    }).catch(err => {
      setLoadingLeftContent(false);
      setDataMessageRecieve([]);
      console.log(err);
    });
    getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(data => {
      var _data$data5;
      setLoadingLeftContent(false);
      if ((data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : _data$data5.status) === 'success') {
        var _data$data6, _data$data7, _data$data7$data;
        let val = data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.data;
        setDataMessageSender(val);
        if ((data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : (_data$data7$data = _data$data7.data) === null || _data$data7$data === void 0 ? void 0 : _data$data7$data.length) > 0) {
          var _data$data8;
          funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.data);
        }
      } else {
        setDataMessageSender([]);
      }
    }).catch(err => {
      setLoadingLeftContent(false);
      setDataMessageSender([]);
      console.log(err);
    });
  }, []);
  return createElement("div", {
    style: style
  }, createElement(Badge, {
    count: countMessage,
    showZero: false,
    size: 'default',
    style: {}
  }, createElement(Button, {
    icon: createElement(BellOutlined, {
      style: {
        fontSize: 20
      }
    }),
    onClick: () => {
      setOpen(true);
    }
  })), createElement(Content, {
    open: open,
    setOpen: setOpen,
    dataMessageRecieve: dataMessageRecieve,
    dataMessageSender: dataMessageSender,
    focusMessage: focusMessage,
    setFocusMessage: setFocusMessage,
    datauser: datauser,
    dataPegawai: dataPegawai,
    dataauthusman: dataauthusman,
    name: nama,
    nip: nip,
    setDataMessageReceive: setDataMessageRecieve,
    setDataMessageSender: setDataMessageSender,
    funtionGetDataPegawai: funtionGetDataPegawai,
    loadingRightContent: loadingRightContent,
    setLoadingRightContent: setLoadingRightContent,
    loadingLeftContent: loadingLeftContent,
    setLoadingLeftContent: setLoadingLeftContent
  }));
};

export { MessageComponent };
//# sourceMappingURL=index.modern.js.map
