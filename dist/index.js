function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var antd = require('antd');
var icons = require('@ant-design/icons');
var moment = _interopDefault(require('moment'));
var io = _interopDefault(require('socket.io-client'));
var axios = _interopDefault(require('axios'));
require('moment/locale/id');
var tinymceReact = require('@tinymce/tinymce-react');

var Roboto = "Roboto, sans-serif";
var DmSerif = "DM Sans, sans-serif";
var Poppins = "Poppins, sans-serif";

var BASE_URL_NOTIF = "https://asset.ut.ac.id:3012";
var BASE_URL = "https://asset.ut.ac.id:3012/notif/testing";
var BASE_URL_HRIS = "https://be2.ut.ac.id/hrd";
var BASE_PATH_NOTIF = {
  create_collection: BASE_URL + "/collection/",
  get_by_from: BASE_URL + "/messages/from/",
  get_by_recieve: BASE_URL + "/messages/to/",
  get_by_id: BASE_URL + "/message/",
  post_message: BASE_URL + "/message/",
  get_all: BASE_URL + "/message/",
  read_message: BASE_URL + "/read_message/",
  post_single_message: BASE_URL + "/testing/message/",
  post_many_message: BASE_URL + "/messages/Many/"
};
var BASE_PATH_HRIS = {
  userdatabyniparray: BASE_URL_HRIS + "/pegawai/get-nip-array",
  get_pegawai: BASE_URL_HRIS + "/pegawai/",
  get_pegawai_by_nama: BASE_URL_HRIS + "/pegawai/get-nama"
};
var socketNotif = io(BASE_URL_NOTIF, {
  autoConnect: false,
  secure: true
});

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var axiosGet = function axiosGet(url, dataauthusman) {
  return Promise.resolve(_catch(function () {
    return Promise.resolve(axios.get(url, dataauthusman));
  }, function (err) {
    return err;
  }));
};
var axiosPost = function axiosPost(url, data, dataauthusman) {
  return Promise.resolve(_catch(function () {
    return Promise.resolve(axios.post(url, data, dataauthusman));
  }, function (err) {
    return err;
  }));
};

var getMessageRecieve = function getMessageRecieve(url, dataauthusman) {
  try {
    return Promise.resolve(axiosGet(url, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getDataPegawaiByNip = function getDataPegawaiByNip(dataauthusman, data) {
  try {
    var body = {
      nip: data
    };
    return Promise.resolve(axiosPost(BASE_PATH_HRIS.userdatabyniparray, body, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPegawaiByNama = function getPegawaiByNama(dataauthusman, nama) {
  try {
    var datanama = {
      nama: nama
    };
    return Promise.resolve(axiosPost(BASE_PATH_HRIS.get_pegawai_by_nama, datanama, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var createColllection = function createColllection(dataauthusman, nip) {
  try {
    return Promise.resolve(axiosGet(BASE_PATH_NOTIF.create_collection + nip, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPegawai = function getPegawai(dataauthusman, limit, offset) {
  try {
    return Promise.resolve(axiosGet(BASE_PATH_HRIS.get_pegawai + (limit + "/" + offset), dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var postManyMessage = function postManyMessage(dataauthusman, body, nip) {
  try {
    return Promise.resolve(axiosPost(BASE_PATH_NOTIF.post_many_message + nip, body, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};
var fetchReadMessage = function fetchReadMessage(dataauthusman, id) {
  try {
    return Promise.resolve(axiosGet(BASE_PATH_NOTIF.read_message + id, dataauthusman));
  } catch (e) {
    return Promise.reject(e);
  }
};

var findDataReadMessage = function findDataReadMessage(dataMessage, dataRead) {
  try {
    var arrayDataMessage = dataMessage;
    var findIndexRead = dataMessage === null || dataMessage === void 0 ? void 0 : dataMessage.findIndex(function (a) {
      return a._id === (dataRead === null || dataRead === void 0 ? void 0 : dataRead._id);
    });
    arrayDataMessage[findIndexRead] = dataRead;
    return Promise.resolve(arrayDataMessage);
  } catch (e) {
    return Promise.reject(e);
  }
};

var SeeWhoOnline = function SeeWhoOnline() {
  return React.createElement("div", {
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
  }, React.createElement(icons.SettingFilled, {
    style: {
      fontSize: 50,
      marginRight: 5
    },
    spin: true
  }), React.createElement("p", null, "Page On Progress"));
};

var GalleryPage = function GalleryPage() {
  return React.createElement("div", {
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
  }, React.createElement(icons.SettingFilled, {
    style: {
      fontSize: 50,
      marginRight: 5
    },
    spin: true
  }), React.createElement("p", null, "Page On Progess"));
};

var LeftContent = function LeftContent(_ref) {
  var dataMessageRecieve = _ref.dataMessageRecieve,
    dataMessageSender = _ref.dataMessageSender,
    setFocusMessage = _ref.setFocusMessage,
    focusMessage = _ref.focusMessage,
    dataPegawai = _ref.dataPegawai,
    setFocusScreenContent = _ref.setFocusScreenContent,
    dataauthusman = _ref.dataauthusman,
    setDataMessageReceive = _ref.setDataMessageReceive,
    setDataMessageSender = _ref.setDataMessageSender,
    funtionGetDataPegawai = _ref.funtionGetDataPegawai,
    nip = _ref.nip,
    setLoadingRightContent = _ref.setLoadingRightContent,
    setLoadingLeftContent = _ref.setLoadingLeftContent,
    loadingLeftContent = _ref.loadingLeftContent;
  var _useState = React.useState(1),
    focusMenuData = _useState[0],
    setFocusMenuData = _useState[1];
  var LoadingLeft = function LoadingLeft() {
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
    }, React__default.createElement(antd.Spin, {
      size: 'large'
    }), React__default.createElement("p", null, "Loading..."));
  };
  var RenderInbox = function RenderInbox() {
    if (loadingLeftContent) {
      return React__default.createElement(LoadingLeft, null);
    }
    return React__default.createElement("div", {
      style: {
        paddingRight: 5
      }
    }, dataMessageRecieve === null || dataMessageRecieve === void 0 ? void 0 : dataMessageRecieve.map(function (res, i) {
      var _pegawai$TrxUnitKerja, _pegawai$TrxUnitKerja2;
      var pegawai = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(function (a) {
        return a.nip === res.from;
      });
      return React__default.createElement(antd.Badge.Ribbon, {
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
        onClick: function onClick() {
          setLoadingRightContent(true);
          fetchReadMessage(dataauthusman, res._id).then(function (data) {
            var _data$data;
            setLoadingRightContent(false);
            setFocusMessage(res._id);
            setFocusScreenContent('inbox');
            if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
              var _data$data2;
              var values = data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.data;
              var dataMessage = dataMessageRecieve;
              findDataReadMessage(dataMessage, values).then(function (data) {
                setDataMessageReceive(data);
              });
            }
          })["catch"](function (err) {
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
      }, React__default.createElement(antd.Avatar, {
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
      }, React__default.createElement(antd.Button, {
        size: 'small'
      }, "Reply")))));
    }));
  };
  var RenderOutbox = function RenderOutbox() {
    if (loadingLeftContent) {
      return React__default.createElement(LoadingLeft, null);
    }
    return React__default.createElement("div", null, dataMessageSender === null || dataMessageSender === void 0 ? void 0 : dataMessageSender.map(function (res, i) {
      var pegawai = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(function (a) {
        return a.nip === res.to;
      });
      return React__default.createElement("div", {
        onClick: function onClick() {
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
      }, React__default.createElement(antd.Avatar, {
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
      }, React__default.createElement(antd.Alert, {
        message: 'Terkirim',
        showIcon: true,
        type: 'success',
        style: {
          fontSize: 10,
          padding: 2
        }
      }), React__default.createElement(antd.Alert, {
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
  }, React__default.createElement(antd.Button, {
    onClick: function onClick() {
      setFocusMenuData(1);
      setLoadingLeftContent(true);
      getMessageRecieve(BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50', dataauthusman).then(function (data) {
        var _data$data3;
        setLoadingLeftContent(false);
        if ((data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.status) === 'success') {
          var _data$data4, _data$data5, _data$data5$data;
          var val = data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : _data$data4.data;
          setDataMessageReceive(val);
          if ((data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : (_data$data5$data = _data$data5.data) === null || _data$data5$data === void 0 ? void 0 : _data$data5$data.length) > 0) {
            var _data$data6;
            funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.data);
          }
        } else {
          setDataMessageReceive([]);
        }
      })["catch"](function (err) {
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
  }, React__default.createElement(icons.FolderOpenOutlined, {
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
  }, "Inbox")), React__default.createElement(antd.Button, {
    onClick: function onClick() {
      setFocusMenuData(2);
      setLoadingLeftContent(true);
      getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(function (data) {
        var _data$data7;
        setLoadingLeftContent(false);
        if ((data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : _data$data7.status) === 'success') {
          var _data$data8, _data$data9, _data$data9$data;
          var val = data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.data;
          setDataMessageSender(val);
          if ((data === null || data === void 0 ? void 0 : (_data$data9 = data.data) === null || _data$data9 === void 0 ? void 0 : (_data$data9$data = _data$data9.data) === null || _data$data9$data === void 0 ? void 0 : _data$data9$data.length) > 0) {
            var _data$data10;
            funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data10 = data.data) === null || _data$data10 === void 0 ? void 0 : _data$data10.data);
          }
        } else {
          setDataMessageSender([]);
        }
      })["catch"](function (err) {
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
  }, React__default.createElement(icons.MailOutlined, {
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
  }, "Outbox")), React__default.createElement(antd.Button, {
    title: 'Coming soon',
    onClick: function onClick() {
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
  }, React__default.createElement(icons.FileImageOutlined, {
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
  }, "Galery")), React__default.createElement(antd.Button, {
    onClick: function onClick() {
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
  }, React__default.createElement(icons.ContactsOutlined, {
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

var RightContent = function RightContent(_ref) {
  var dataMessageRecieve = _ref.dataMessageRecieve,
    dataMessageSender = _ref.dataMessageSender,
    focusMessage = _ref.focusMessage,
    loadingRightContent = _ref.loadingRightContent;
  var gabungDataMessage = [].concat(dataMessageRecieve, dataMessageSender);
  var findMessageFocus = gabungDataMessage === null || gabungDataMessage === void 0 ? void 0 : gabungDataMessage.find(function (a) {
    return (a === null || a === void 0 ? void 0 : a._id) == focusMessage;
  });
  var ref = React__default.useRef(null);
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
    }, React__default.createElement(icons.ExclamationCircleOutlined, {
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
  }, "INBOX"), React__default.createElement(antd.Divider, {
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

var NewMail = function NewMail(_ref) {
  var open = _ref.open,
    setOpen = _ref.setOpen,
    dataauthusman = _ref.dataauthusman,
    name = _ref.name,
    nip = _ref.nip,
    funtionGetDataPegawai = _ref.funtionGetDataPegawai,
    setDataMessageSender = _ref.setDataMessageSender;
  var _React$useState = React__default.useState(true),
    loadingEditor = _React$useState[0],
    setLoadingEditor = _React$useState[1];
  var _React$useState2 = React__default.useState(''),
    valueEditor = _React$useState2[0],
    setValueEditor = _React$useState2[1];
  var _React$useState3 = React__default.useState([]),
    dataPegawai = _React$useState3[0],
    setDataPegawai = _React$useState3[1];
  var _React$useState4 = React__default.useState([]),
    dataEmail = _React$useState4[0],
    setDataEmail = _React$useState4[1];
  var _React$useState5 = React__default.useState(''),
    valSubject = _React$useState5[0],
    setValSubject = _React$useState5[1];
  var _React$useState6 = React__default.useState(''),
    valSearch = _React$useState6[0],
    setValSearch = _React$useState6[1];
  var _React$useState7 = React__default.useState(false),
    loadingNewMail = _React$useState7[0],
    setLoadingNewMail = _React$useState7[1];
  var clearForm = function clearForm() {
    setValueEditor('');
    setDataEmail([]);
    setDataPegawai([]);
    setValSubject('');
    setValSearch('');
    setLoadingNewMail(false);
    setOpen(false);
  };
  var postMessageMany = function postMessageMany() {
    setLoadingNewMail(true);
    var y = [];
    dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.forEach(function (a) {
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
    var arrayMessage = {
      array_message: y
    };
    postManyMessage(dataauthusman, arrayMessage, nip).then(function (data) {
      var _data$data;
      if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
        getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(function (data) {
          var _data$data2;
          if ((data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.status) === 'success') {
            var _data$data3, _data$data4, _data$data4$data;
            clearForm();
            var val = data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.data;
            setDataMessageSender(val);
            if ((data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : (_data$data4$data = _data$data4.data) === null || _data$data4$data === void 0 ? void 0 : _data$data4$data.length) > 0) {
              var _data$data5;
              funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : _data$data5.data);
            }
          }
        })["catch"](function (err) {
          console.log(err);
          clearForm();
          antd.notification.error({
            message: 'Error Get Data Message Send'
          });
        });
      }
    })["catch"](function (err) {
      console.log(err);
      clearForm();
      antd.notification.error({
        message: 'Error Post Data Message'
      });
    });
  };
  return React__default.createElement(antd.Modal, {
    open: open,
    onCancel: function onCancel() {
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
  }, React__default.createElement("p", null, "Select User"), React__default.createElement(antd.Select, {
    disabled: loadingNewMail,
    style: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 0,
      width: '100%'
    },
    size: 'large',
    showSearch: true,
    value: dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.map(function (a) {
      return a === null || a === void 0 ? void 0 : a.to;
    }),
    onDeselect: function onDeselect(e) {
      var j = dataEmail === null || dataEmail === void 0 ? void 0 : dataEmail.filter(function (a) {
        return (a === null || a === void 0 ? void 0 : a.to) !== e;
      });
      setDataEmail(j);
    },
    searchValue: valSearch,
    onSearch: function onSearch(e) {
      setValSearch(e);
    },
    onSelect: function onSelect(e) {
      var g = dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.find(function (a) {
        return a.nip === e;
      });
      var o = {
        name_receiver: g === null || g === void 0 ? void 0 : g.nama_pegawai,
        to: g === null || g === void 0 ? void 0 : g.nip,
        name_sender: name,
        from: nip
      };
      setDataEmail(function (a) {
        return [].concat(a, [o]);
      });
    },
    onDropdownVisibleChange: function onDropdownVisibleChange() {
      getPegawai(dataauthusman, '100', '0').then(function (data) {
        var _data$data6;
        if ((data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.status) === 'Success') {
          var _data$data7;
          var val = data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : _data$data7.data;
          setDataPegawai(val);
        }
      });
    },
    mode: 'multiple',
    labelInValue: false,
    bordered: false,
    suffixIcon: React__default.createElement("div", null, React__default.createElement(antd.Button, {
      icon: React__default.createElement(icons.SearchOutlined, {
        style: {
          fontSize: 40
        }
      }),
      style: {
        borderWidth: 0,
        padding: 0,
        margin: 0
      },
      onClick: function onClick() {
        getPegawaiByNama(dataauthusman, valSearch).then(function (data) {
          var _data$data8;
          if ((data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.status) === 'Success') {
            var _data$data9;
            setDataPegawai(data === null || data === void 0 ? void 0 : (_data$data9 = data.data) === null || _data$data9 === void 0 ? void 0 : _data$data9.data);
          }
        });
      }
    })),
    filterOption: false
  }, dataPegawai === null || dataPegawai === void 0 ? void 0 : dataPegawai.map(function (a, i) {
    return React__default.createElement(antd.Select.Option, {
      key: i,
      value: a === null || a === void 0 ? void 0 : a.nip
    }, React__default.createElement(antd.Avatar, {
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
  }, React__default.createElement("p", null, "Subject"), React__default.createElement(antd.Input.TextArea, {
    disabled: loadingNewMail,
    maxLength: 300,
    placeholder: 'Max 300 character',
    autoSize: {
      minRows: 3,
      maxRows: 5
    },
    showCount: true,
    value: valSubject,
    onChange: function onChange(e) {
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
  }, React__default.createElement(antd.Spin, {
    size: 'large'
  })) : '', React__default.createElement(tinymceReact.Editor, {
    disabled: loadingNewMail,
    value: valueEditor,
    apiKey: '36iqfcag9kzushye6d2mkf16270vqoj0k83nw2w516wzwozt',
    onEditorChange: function onEditorChange(e) {
      setValueEditor(e);
    },
    onInit: function onInit() {
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
  }, React__default.createElement(antd.Button, {
    disabled: loadingNewMail,
    loading: loadingNewMail,
    icon: React__default.createElement(icons.SendOutlined, null),
    style: {
      backgroundColor: 'lightblue',
      color: 'white',
      fontFamily: DmSerif
    },
    onClick: function onClick() {
      postMessageMany();
    }
  }, "Send"), React__default.createElement(antd.Button, {
    onClick: function onClick() {
      clearForm();
    }
  }, "Cancel"))));
};

var RightContentOutbox = function RightContentOutbox(_ref) {
  var dataMessageRecieve = _ref.dataMessageRecieve,
    dataMessageSender = _ref.dataMessageSender,
    focusMessage = _ref.focusMessage;
  var gabungDataMessage = [].concat(dataMessageRecieve, dataMessageSender);
  var findMessageFocus = gabungDataMessage === null || gabungDataMessage === void 0 ? void 0 : gabungDataMessage.find(function (a) {
    return (a === null || a === void 0 ? void 0 : a._id) == focusMessage;
  });
  var ref = React__default.useRef(null);
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
  }, "OUTBOX"), React__default.createElement(antd.Divider, {
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

var Content = function Content(_ref) {
  var open = _ref.open,
    setOpen = _ref.setOpen,
    dataMessageRecieve = _ref.dataMessageRecieve,
    dataMessageSender = _ref.dataMessageSender,
    focusMessage = _ref.focusMessage,
    setFocusMessage = _ref.setFocusMessage,
    datauser = _ref.datauser,
    dataPegawai = _ref.dataPegawai,
    dataauthusman = _ref.dataauthusman,
    name = _ref.name,
    nip = _ref.nip,
    setDataMessageReceive = _ref.setDataMessageReceive,
    setDataMessageSender = _ref.setDataMessageSender,
    funtionGetDataPegawai = _ref.funtionGetDataPegawai,
    loadingRightContent = _ref.loadingRightContent,
    setLoadingRightContent = _ref.setLoadingRightContent,
    loadingLeftContent = _ref.loadingLeftContent,
    setLoadingLeftContent = _ref.setLoadingLeftContent;
  var _React$useState = React__default.useState(false),
    openNewMail = _React$useState[0],
    setOpenNewMail = _React$useState[1];
  var _React$useState2 = React__default.useState(""),
    focusScreenContent = _React$useState2[0],
    setFocusScreenContent = _React$useState2[1];
  return React__default.createElement(antd.Drawer, {
    placement: "right",
    open: open,
    size: "large",
    width: "100%",
    closeIcon: React__default.createElement(icons.CloseCircleOutlined, {
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
    }, "SIPPP", React__default.createElement(icons.MailFilled, {
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
    }, datauser === null || datauser === void 0 ? void 0 : datauser.nip), React__default.createElement("p", null, datauser === null || datauser === void 0 ? void 0 : datauser.nama)), React__default.createElement(antd.Avatar, {
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
    onClose: function onClose() {
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
  }), React__default.createElement(antd.FloatButton, {
    icon: React__default.createElement(icons.PlusOutlined, {
      style: {
        fontSize: 20
      }
    }),
    onClick: function onClick() {
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

var MessageComponent = function MessageComponent(_ref) {
  var style = _ref.style,
    nip = _ref.nip,
    nama = _ref.nama,
    id_user = _ref.id_user,
    kode_group = _ref.kode_group,
    token_lama = _ref.token_lama,
    token_baru = _ref.token_baru,
    url_foto_user = _ref.url_foto_user;
  var _React$useState = React.useState(false),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var _React$useState2 = React.useState([]),
    dataMessageRecieve = _React$useState2[0],
    setDataMessageRecieve = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    dataMessageSender = _React$useState3[0],
    setDataMessageSender = _React$useState3[1];
  var _React$useState4 = React.useState(''),
    focusMessage = _React$useState4[0],
    setFocusMessage = _React$useState4[1];
  var _React$useState5 = React.useState([]),
    dataPegawai = _React$useState5[0],
    setDataPegawai = _React$useState5[1];
  var _React$useState6 = React.useState(null),
    idMessageRead = _React$useState6[0],
    setIdMessageRead = _React$useState6[1];
  var _React$useState7 = React.useState(0),
    countMessage = _React$useState7[0],
    setCountMessage = _React$useState7[1];
  var _React$useState8 = React.useState(false),
    loadingRightContent = _React$useState8[0],
    setLoadingRightContent = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    loadingLeftContent = _React$useState9[0],
    setLoadingLeftContent = _React$useState9[1];
  var dataauthusman = {
    id_user: id_user,
    kode_group: kode_group,
    token_lama: token_lama,
    token_baru: token_baru
  };
  var datauser = {
    nip: nip,
    nama: nama,
    url_foto: url_foto_user
  };
  React.useEffect(function () {
    socketNotif.emit('join_room_testing', {
      roomId: nip
    });
    socketNotif.connect();
  }, []);
  React.useEffect(function () {
    var counts = dataMessageRecieve === null || dataMessageRecieve === void 0 ? void 0 : dataMessageRecieve.filter(function (a) {
      return a.status_read === false;
    });
    setCountMessage(counts === null || counts === void 0 ? void 0 : counts.length);
  }, [dataMessageRecieve]);
  React.useEffect(function () {
    socketNotif.on('message', function (data) {
      if (data.response === 'receive_message') {
        var _data$dataMessage;
        antd.notification.info({
          message: 'Anda Mempunyai Pesan Baru'
        });
        setDataMessageRecieve(function (a) {
          return [data === null || data === void 0 ? void 0 : data.dataMessage].concat(a);
        });
        getDataPegawaiByNip(dataauthusman, [{
          nip: data === null || data === void 0 ? void 0 : (_data$dataMessage = data.dataMessage) === null || _data$dataMessage === void 0 ? void 0 : _data$dataMessage.from
        }]).then(function (res) {
          var _res$data;
          if ((res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.status) === 'Success') {
            setDataPegawai(function (a) {
              var _res$data2;
              return [].concat(a, res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data);
            });
          }
        });
      }
    });
    return function () {
      socketNotif.close();
    };
  }, [socketNotif]);
  React.useEffect(function () {
    socketNotif.on('message', function (data) {
      if (data.response === 'status_read') {
        setIdMessageRead(data.dataMessage._id);
      }
    });
    return function () {
      socketNotif.close();
    };
  }, [socketNotif]);
  React.useEffect(function () {
    if (idMessageRead !== null) {
      updateRead();
    }
  }, [idMessageRead]);
  var updateRead = function updateRead() {
    var p = [].concat(dataMessageSender);
    var l = dataMessageSender.some(function (m) {
      return m._id === idMessageRead;
    });
    if (l === true) {
      var k = dataMessageSender.findIndex(function (a) {
        return a._id === idMessageRead;
      });
      p[k].status_read = true;
      setDataMessageSender(p);
      setIdMessageRead(null);
    }
  };
  var funtionGetDataPegawai = function funtionGetDataPegawai(val) {
    var tampungNip = [];
    var tampungNip2 = [];
    val === null || val === void 0 ? void 0 : val.forEach(function (a) {
      tampungNip.push(a.from);
      tampungNip.push(a.to);
    });
    if (tampungNip.length > 0) {
      var u = new Set(tampungNip);
      u.forEach(function (a) {
        tampungNip2.push({
          nip: a
        });
      });
      getDataPegawaiByNip(dataauthusman, tampungNip2).then(function (res) {
        var _res$data3;
        console.log('asasd', val, res);
        if ((res === null || res === void 0 ? void 0 : (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.status) === 'Success') {
          setDataPegawai(function (a) {
            var _res$data4;
            return [].concat(a, res === null || res === void 0 ? void 0 : (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.data);
          });
        }
      });
    }
  };
  React.useEffect(function () {
    setLoadingLeftContent(true);
    createColllection(dataauthusman, nip).then(function (response) {
      var _response$data;
      if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.status) === 'done') ; else {
        var _response$data2;
        var val = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.children;
        setDataMessageRecieve(val);
      }
    });
    getMessageRecieve(BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50', dataauthusman).then(function (data) {
      var _data$data;
      setLoadingLeftContent(false);
      if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.status) === 'success') {
        var _data$data2, _data$data3, _data$data3$data;
        var val = data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.data;
        setDataMessageRecieve(val);
        if ((data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : (_data$data3$data = _data$data3.data) === null || _data$data3$data === void 0 ? void 0 : _data$data3$data.length) > 0) {
          var _data$data4;
          funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : _data$data4.data);
        }
      } else {
        setDataMessageRecieve([]);
      }
    })["catch"](function (err) {
      setLoadingLeftContent(false);
      setDataMessageRecieve([]);
      console.log(err);
    });
    getMessageRecieve(BASE_PATH_NOTIF.get_by_from + nip + '/0/50', dataauthusman).then(function (data) {
      var _data$data5;
      setLoadingLeftContent(false);
      if ((data === null || data === void 0 ? void 0 : (_data$data5 = data.data) === null || _data$data5 === void 0 ? void 0 : _data$data5.status) === 'success') {
        var _data$data6, _data$data7, _data$data7$data;
        var val = data === null || data === void 0 ? void 0 : (_data$data6 = data.data) === null || _data$data6 === void 0 ? void 0 : _data$data6.data;
        setDataMessageSender(val);
        if ((data === null || data === void 0 ? void 0 : (_data$data7 = data.data) === null || _data$data7 === void 0 ? void 0 : (_data$data7$data = _data$data7.data) === null || _data$data7$data === void 0 ? void 0 : _data$data7$data.length) > 0) {
          var _data$data8;
          funtionGetDataPegawai(data === null || data === void 0 ? void 0 : (_data$data8 = data.data) === null || _data$data8 === void 0 ? void 0 : _data$data8.data);
        }
      } else {
        setDataMessageSender([]);
      }
    })["catch"](function (err) {
      setLoadingLeftContent(false);
      setDataMessageSender([]);
      console.log(err);
    });
  }, []);
  return React.createElement("div", {
    style: style
  }, React.createElement(antd.Badge, {
    count: countMessage,
    showZero: false,
    size: 'default',
    style: {}
  }, React.createElement(antd.Button, {
    icon: React.createElement(icons.BellOutlined, {
      style: {
        fontSize: 20
      }
    }),
    onClick: function onClick() {
      setOpen(true);
    }
  })), React.createElement(Content, {
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

exports.MessageComponent = MessageComponent;
//# sourceMappingURL=index.js.map
