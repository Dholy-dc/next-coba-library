import * as React from 'react'
import { Badge, Button, notification } from 'antd'
import { Content } from './content'
import { BASE_PATH_NOTIF, socketNotif } from './api'
import {
  createColllection,
  getDataPegawaiByNip,
  getMessageRecieve
} from './fetchaction'
import { BellOutlined } from '@ant-design/icons'

export const MessageComponent = ({
  style,
  nip,
  nama,
  id_user,
  kode_group,
  token_lama,
  token_baru,
  url_foto_user
}: // datauth,
{
  style: React.CSSProperties
  nip: string
  nama: string
  id_user: string | null
  kode_group: string | null
  token_lama: string | null
  token_baru: string | null
  url_foto_user: string | null
}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [dataMessageRecieve, setDataMessageRecieve] = React.useState<any[]>([])
  const [dataMessageSender, setDataMessageSender] = React.useState<any[]>([])
  const [focusMessage, setFocusMessage] = React.useState<string>('')
  const [dataPegawai, setDataPegawai] = React.useState<any[]>([])
  const [idMessageRead, setIdMessageRead] = React.useState<any>(null)
  const [countMessage, setCountMessage] = React.useState<number>(0)
  const [loadingRightContent, setLoadingRightContent] =
    React.useState<boolean>(false)
  const [loadingLeftContent, setLoadingLeftContent] =
    React.useState<boolean>(false)
  const dataauthusman = {
    id_user: id_user,
    kode_group: kode_group,
    token_lama: token_lama,
    token_baru: token_baru
  }
  const datauser = {
    nip: nip,
    nama: nama,
    url_foto: url_foto_user
  }
  React.useEffect(() => {
    socketNotif.emit('join_room_testing', {
      roomId: nip
    })
    socketNotif.connect()
  }, [])

  React.useEffect(() => {
    const counts = dataMessageRecieve?.filter(
      (a: any) => a.status_read === false
    )
    setCountMessage(counts?.length)
  }, [dataMessageRecieve])

  React.useEffect(() => {
    socketNotif.on('message', (data: any) => {
      if (data.response === 'receive_message') {
        notification.info({ message: 'Anda Mempunyai Pesan Baru' })

        setDataMessageRecieve((a: any) => [data?.dataMessage, ...a])
        getDataPegawaiByNip(dataauthusman, [
          {
            nip: data?.dataMessage?.from
          }
        ]).then((res: any) => {
          if (res?.data?.status === 'Success') {
            setDataPegawai((a) => [...a, ...res?.data?.data])
          }
        })
      }
    })
    return () => {
      socketNotif.close()
    }
  }, [socketNotif])

  React.useEffect(() => {
    socketNotif.on('message', (data: any) => {
      if (data.response === 'status_read') {
        setIdMessageRead(data.dataMessage._id)
      }
    })
    return () => {
      socketNotif.close()
    }
  }, [socketNotif])

  React.useEffect(() => {
    if (idMessageRead !== null) {
      updateRead()
    }
  }, [idMessageRead])

  const updateRead = () => {
    const p = [...dataMessageSender]
    const l = dataMessageSender.some((m: any) => m._id === idMessageRead)
    if (l === true) {
      const k = dataMessageSender.findIndex((a) => a._id === idMessageRead)
      p[k].status_read = true
      setDataMessageSender(p)
      setIdMessageRead(null)
    }
  }

  const funtionGetDataPegawai = (val: any[]) => {
    const tampungNip: any[] = []
    const tampungNip2: any[] = []
    val?.forEach((a: any) => {
      tampungNip.push(a.from)
      tampungNip.push(a.to)
    })
    if (tampungNip.length > 0) {
      const u = new Set(tampungNip)
      u.forEach((a: any) => {
        tampungNip2.push({
          nip: a
        })
      })
      getDataPegawaiByNip(dataauthusman, tampungNip2).then((res: any) => {
        console.log('asasd', val, res)

        if (res?.data?.status === 'Success') {
          setDataPegawai((a) => [...a, ...res?.data?.data])
        }
      })
    }
  }

  React.useEffect(() => {
    setLoadingLeftContent(true)
    createColllection(dataauthusman, nip).then((response: any) => {
      if (response?.data?.status === 'done') {
      } else {
        let val: any[] = response?.data?.children
        setDataMessageRecieve(val)
      }
    })
    getMessageRecieve(
      BASE_PATH_NOTIF.get_by_recieve + nip + '/0/50',
      dataauthusman
    )
      .then((data: any) => {
        setLoadingLeftContent(false)
        if (data?.data?.status === 'success') {
          let val: any[] = data?.data?.data
          setDataMessageRecieve(val)
          if (data?.data?.data?.length > 0) {
            funtionGetDataPegawai(data?.data?.data)
          }
        } else {
          setDataMessageRecieve([])
        }
      })
      .catch((err) => {
        setLoadingLeftContent(false)
        setDataMessageRecieve([])
        console.log(err)
      })

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
      .catch((err: any) => {
        setLoadingLeftContent(false)
        setDataMessageSender([])
        console.log(err)
      })
  }, [])

  return (
    <div style={style}>
      <Badge count={countMessage} showZero={false} size='default' style={{}}>
        <Button
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          onClick={() => {
            setOpen(true)
          }}
        />
      </Badge>

      <Content
        open={open}
        setOpen={setOpen}
        dataMessageRecieve={dataMessageRecieve}
        dataMessageSender={dataMessageSender}
        focusMessage={focusMessage}
        setFocusMessage={setFocusMessage}
        datauser={datauser}
        dataPegawai={dataPegawai}
        dataauthusman={dataauthusman}
        name={nama}
        nip={nip}
        setDataMessageReceive={setDataMessageRecieve}
        setDataMessageSender={setDataMessageSender}
        funtionGetDataPegawai={funtionGetDataPegawai}
        loadingRightContent={loadingRightContent}
        setLoadingRightContent={setLoadingRightContent}
        loadingLeftContent={loadingLeftContent}
        setLoadingLeftContent={setLoadingLeftContent}
      />
    </div>
  )
}