import React from 'react'
import moment from 'moment'
import 'moment/locale/id'
import { Poppins } from './fontstyle'
import { Divider } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const RightContent = ({
  dataMessageRecieve,
  dataMessageSender,
  focusMessage,
  loadingRightContent
}: {
  dataMessageRecieve: any[]
  dataMessageSender: any[]
  focusMessage: string
  loadingRightContent: boolean
}) => {
  let gabungDataMessage = [...dataMessageRecieve, ...dataMessageSender]
  let findMessageFocus = gabungDataMessage?.find((a) => a?._id == focusMessage)
  let ref = React.useRef(null)
  if (findMessageFocus === undefined) {
    return (
      <div
        style={{
          height: '100vh',
          flex: 2,
          padding: 10,
          textAlign: 'center'
        }}
      >
        <p>Selamat Datang Di SIPPP Mail</p>
      </div>
    )
  }

  if (loadingRightContent) {
    return (
      <div
        style={{
          height: '100vh',
          flex: 2,
          padding: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ExclamationCircleOutlined
          style={{ color: 'black', fontSize: 30 }}
          spin
        />
        <p>Mohon Tunggu..</p>
      </div>
    )
  }

  return (
    <div
      style={{
        height: '93vh',
        flex: 2,
        padding: 20,
        backgroundColor: 'whitesmoke',
        zIndex: 0,
        overflow: 'auto',
        fontFamily: Poppins,
        paddingBottom: 30
      }}
    >
      <p style={{ fontSize: 30, opacity: 0.5 }}>INBOX</p>
      <Divider style={{ margin: 0, marginTop: 5, borderWidth: 2 }} />
      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 14 }}>{findMessageFocus?.name_sender}</p>
        <p
          style={{
            fontSize: 12,
            fontWeight: '300',
            color: 'black',
            opacity: 0.6
          }}
        >
          {moment(findMessageFocus?.createdAt).format('LLLL')}
        </p>
      </div>
      <div
        style={{
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
        }}
      >
        <p>
          {' '}
          Subject :{' '}
          {findMessageFocus?.subject === undefined
            ? ' No Subject'
            : findMessageFocus?.subject}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          backgroundColor: 'white',
          marginRight: '1%',
          marginLeft: '1%',
          paddingTop: 10,
          padding: 20,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }}
      >
        <div
          style={{ minWidth: '210mm' }}
          ref={ref}
          dangerouslySetInnerHTML={{
            __html: findMessageFocus?.message
          }}
        />
      </div>
    </div>
  )
}

export default RightContent
