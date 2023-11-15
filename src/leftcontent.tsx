import {
  ContactsOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
  MailOutlined
} from '@ant-design/icons'
import { Alert, Avatar, Badge, Button, Spin } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { DmSerif, Poppins, Roboto } from './fontstyle'
import { fetchReadMessage, getMessageRecieve } from './fetchaction'
import { findDataReadMessage } from './utils'
import { BASE_PATH_NOTIF } from './api'
import { SeeWhoOnline } from './seewhoonline'
import { GalleryPage } from './gallerypage'

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
}: {
  dataMessageRecieve: any[]
  dataMessageSender: any[]
  setFocusMessage: (e: string) => void
  focusMessage: string
  dataPegawai: any[]
  setFocusScreenContent: (e: string) => void
  dataauthusman: object
  setDataMessageReceive: (e: any[]) => void
  setDataMessageSender: (e: any[]) => void
  funtionGetDataPegawai: (e: any[]) => void
  nip: string
  setLoadingRightContent: (e: boolean) => void
  setLoadingLeftContent: (e: boolean) => void
  loadingLeftContent: boolean
}) => {
  const [focusMenuData, setFocusMenuData] = useState<number>(1)

  const LoadingLeft = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          color: 'white',
          fontSize: 20,
          fontFamily: DmSerif
        }}
      >
        <Spin size='large' />
        <p>Loading...</p>
      </div>
    )
  }

  const RenderInbox = () => {
    if (loadingLeftContent) {
      return <LoadingLeft />
    }
    return (
      <div style={{ paddingRight: 5 }}>
        {dataMessageRecieve?.map((res: any, i: number) => {
          const pegawai = dataPegawai?.find((a: any) => a.nip === res.from)
          return (
            <Badge.Ribbon
              text={res?.status_read ? '' : 'Pesan Baru'}
              color='orange'
              key={i}
              placement='end'
              style={{
                marginRight: 6,
                fontSize: 12,
                display: res?.status_read ? 'none' : 'block'
              }}
            >
              <div
                onClick={() => {
                  setLoadingRightContent(true)
                  fetchReadMessage(dataauthusman, res._id)
                    .then((data: any) => {
                      setLoadingRightContent(false)
                      setFocusMessage(res._id)
                      setFocusScreenContent('inbox')
                      if (data?.data?.status === 'success') {
                        const values = data?.data?.data
                        const dataMessage = dataMessageRecieve
                        findDataReadMessage(dataMessage, values).then(
                          (data: any[]) => {
                            setDataMessageReceive(data)
                          }
                        )
                      }
                    })
                    .catch((err: any) => {
                      console.log(err)
                      setFocusMessage(res._id)
                      setFocusScreenContent('inbox')
                      setLoadingRightContent(false)
                    })
                }}
                key={i}
                style={{
                  padding: 10,
                  borderBottomStyle: 'groove',
                  cursor: 'pointer',
                  backgroundColor:
                    focusMessage === res._id ? 'lightgray' : 'white',
                  borderRadius: 5,
                  margin: 7,
                  fontFamily: Poppins,
                  textTransform: 'capitalize'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 5,
                    alignItems: 'center',
                    marginBottom: 5
                  }}
                >
                  <Avatar src={pegawai?.foto_pegawai} alt='foto pegawai' />
                  <div>
                    <p
                      style={{
                        fontWeight: '700',
                        fontSize: 13,
                        fontFamily: Roboto
                      }}
                    >
                      {res?.name_sender === undefined
                        ? 'Unknowns'
                        : res?.name_sender}
                    </p>
                    <p style={{ fontSize: 11, fontFamily: Roboto }}>
                      {pegawai?.TrxUnitKerjaPegawais[0]?.Unit?.nama_unit}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    opacity: 0.7,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontFamily: Roboto
                  }}
                >
                  {res?.subject === undefined
                    ? 'No Subject Found'
                    : res?.subject}
                </p>
                <p style={{ fontSize: 10, opacity: 0.8, fontFamily: Roboto }}>
                  {moment(res?.createdAt).format('LLLL')}
                </p>
                <div style={{ display: 'flex', marginTop: 10 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      flex: 1
                    }}
                  >
                    <Button size='small'>Reply</Button>
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
          )
        })}
      </div>
    )
  }

  const RenderOutbox = () => {
    if (loadingLeftContent) {
      return <LoadingLeft />
    }
    return (
      <div>
        {dataMessageSender?.map((res: any, i: number) => {
          const pegawai = dataPegawai?.find((a: any) => a.nip === res.to)
          return (
            <div
              onClick={() => {
                setFocusMessage(res._id)
                setFocusScreenContent('outbox')
              }}
              key={i}
              style={{
                padding: 10,
                borderWidth: 1,
                borderBottomStyle: 'groove',
                cursor: 'pointer',
                backgroundColor:
                  focusMessage === res._id ? 'lightgray' : 'white',
                borderRadius: 5,
                margin: 7
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                  marginBottom: 5
                }}
              >
                <Avatar src={pegawai?.foto_pegawai} />
                <p
                  style={{
                    fontWeight: '700',
                    fontSize: 13,
                    fontFamily: Roboto
                  }}
                >
                  {res?.name_receiver === undefined
                    ? 'unknown'
                    : res?.name_receiver}
                </p>
              </div>
              <p
                style={{
                  fontSize: 13,
                  opacity: 0.7,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontFamily: Roboto,
                  textTransform: 'capitalize'
                }}
              >
                {res?.subject === undefined ? 'No Subject Found' : res?.subject}
              </p>
              <p style={{ fontSize: 10, opacity: 0.8 }}>
                {moment(res?.createdAt).format('LLLL')}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'flex-end',
                  marginTop: 10
                }}
              >
                <Alert
                  message={'Terkirim'}
                  showIcon={true}
                  type='success'
                  style={{ fontSize: 10, padding: 2 }}
                />
                <Alert
                  message={res?.status_read ? 'Di Baca' : 'Belum Dibaca'}
                  type={res?.status_read ? 'success' : 'error'}
                  style={{ fontSize: 10, padding: 2 }}
                  showIcon
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      style={{
        height: '93vh',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        overflowY: 'auto',
        backgroundColor: '#243F51',
        paddingBottom: 30,
        flex: 0.6
      }}
    >
      <div
        style={{
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
        }}
      >
        <Button
          onClick={() => {
            setFocusMenuData(1)
            setLoadingLeftContent(true)
            getMessageRecieve(
              BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50',
              dataauthusman
            )
              .then((data: any) => {
                setLoadingLeftContent(false)
                if (data?.data?.status === 'success') {
                  let val: any[] = data?.data?.data
                  setDataMessageReceive(val)
                  if (data?.data?.data?.length > 0) {
                    funtionGetDataPegawai(data?.data?.data)
                  }
                } else {
                  setDataMessageReceive([])
                }
              })
              .catch((err) => {
                console.log(err)
                setLoadingLeftContent(false)
                setDataMessageReceive([])
              })
          }}
          style={{
            opacity: focusMenuData === 1 ? 1 : 0.5,
            borderWidth: 0,
            boxShadow: 'none',
            marginBottom: 10,
            padding: 0,
            color: 'white'
          }}
        >
          <FolderOpenOutlined style={{ fontSize: 17 }} />
          <p
            style={{
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
              fontFamily: DmSerif
            }}
          >
            Inbox
          </p>
        </Button>

        <Button
          onClick={() => {
            setFocusMenuData(2)
            setLoadingLeftContent(true)
            getMessageRecieve(
              BASE_PATH_NOTIF.get_by_from + nip + '/0/50',
              dataauthusman
            )
              .then((data: any) => {
                setLoadingLeftContent(false)
                if (data?.data?.status === 'success') {
                  let val: any[] = data?.data?.data
                  setDataMessageSender(val)
                  if (data?.data?.data?.length > 0) {
                    funtionGetDataPegawai(data?.data?.data)
                  }
                } else {
                  setDataMessageSender([])
                }
              })
              .catch((err) => {
                console.log(err)
                setLoadingLeftContent(true)
              })
          }}
          style={{
            opacity: focusMenuData === 2 ? 1 : 0.5,
            borderWidth: 0,
            boxShadow: 'none',
            marginBottom: 10,
            padding: 0,
            color: 'white'
          }}
        >
          <MailOutlined style={{ fontSize: 15 }} />
          <p
            style={{
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
              fontFamily: DmSerif
            }}
          >
            Outbox
          </p>
        </Button>
        <Button
          title='Coming soon'
          onClick={() => {
            setFocusMenuData(3)
          }}
          style={{
            opacity: focusMenuData === 3 ? 1 : 0.5,
            borderWidth: 0,
            boxShadow: 'none',
            marginBottom: 10,
            padding: 0,
            color: 'white'
          }}
        >
          <FileImageOutlined style={{ fontSize: 15 }} />
          <p
            style={{
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
              fontFamily: DmSerif
            }}
          >
            Galery
          </p>
        </Button>
        <Button
          onClick={() => {
            setFocusMenuData(4)
          }}
          style={{
            borderWidth: 0,
            boxShadow: 'none',
            marginBottom: 10,
            padding: 0,
            color: 'white',
            opacity: focusMenuData === 4 ? 1 : 0.5
          }}
        >
          <ContactsOutlined style={{ fontSize: 17 }} />
          <p
            style={{
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
              fontFamily: DmSerif
            }}
          >
            who's online ?
          </p>
        </Button>
      </div>
      {focusMenuData === 1 ? (
        <RenderInbox />
      ) : focusMenuData === 2 ? (
        <RenderOutbox />
      ) : focusMenuData === 4 ? (
        <SeeWhoOnline />
      ) : (
        <GalleryPage />
      )}
    </div>
  )
}

export default LeftContent
