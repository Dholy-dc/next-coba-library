import { Avatar, Button, Input, Modal, Select, Spin, notification } from 'antd'
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { SearchOutlined, SendOutlined } from '@ant-design/icons'
import { DmSerif } from './fontstyle'
import {
  getMessageRecieve,
  getPegawai,
  getPegawaiByNama,
  postManyMessage
} from './fetchaction'
import { BASE_PATH_NOTIF } from './api'
export const NewMail = ({
  open,
  setOpen,
  dataauthusman,
  name,
  nip,
  funtionGetDataPegawai,
  setDataMessageSender
}: {
  open: boolean
  setOpen: (e: boolean) => void
  dataauthusman: object
  name: string
  nip: string
  funtionGetDataPegawai: (e: any[]) => void
  setDataMessageSender: (e: any[]) => void
}) => {
  const [loadingEditor, setLoadingEditor] = React.useState<boolean>(true)
  const [valueEditor, setValueEditor] = React.useState<string>('')
  interface InterfaceDataPenerima {
    name_receiver: string
    to: string
    name_sender: string
    from: string
  }

  const [dataPegawai, setDataPegawai] = React.useState<any[]>([])
  const [dataEmail, setDataEmail] = React.useState<InterfaceDataPenerima[]>([])
  const [valSubject, setValSubject] = React.useState<string>('')
  const [valSearch, setValSearch] = React.useState<string>('')
  const [loadingNewMail, setLoadingNewMail] = React.useState<boolean>(false)

  const clearForm = () => {
    setValueEditor('')
    setDataEmail([])
    setDataPegawai([])
    setValSubject('')
    setValSearch('')
    setLoadingNewMail(false)
    setOpen(false)
  }

  const postMessageMany = () => {
    setLoadingNewMail(true)
    let y: any[] = []
    dataEmail?.forEach((a: any) => {
      y.push({
        from: a?.from,
        to: a?.to,
        name_sender: a?.name_sender,
        name_receiver: a?.name_receiver,
        message: valueEditor,
        subject: valSubject,
        status_read: false,
        kategori: 'pesan'
      })
    })
    let arrayMessage = {
      array_message: y
    }
    postManyMessage(dataauthusman, arrayMessage, nip)
      .then((data: any) => {
        if (data?.data?.status === 'success') {
          getMessageRecieve(
            BASE_PATH_NOTIF.get_by_from + nip + '/0/50',
            dataauthusman
          )
            .then((data: any) => {
              if (data?.data?.status === 'success') {
                clearForm()
                let val: any[] = data?.data?.data
                setDataMessageSender(val)
                if (data?.data?.data?.length > 0) {
                  funtionGetDataPegawai(data?.data?.data)
                }
              }
            })
            .catch((err) => {
              console.log(err)
              clearForm()
              notification.error({
                message: 'Error Get Data Message Send'
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
        clearForm()
        notification.error({
          message: 'Error Post Data Message'
        })
      })
  }

  return (
    <Modal
      open={open}
      onCancel={() => {
        clearForm()
      }}
      bodyStyle={{
        padding: 10,
        paddingTop: 20,
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      footer={false}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <p>Select User</p>
          <Select
            disabled={loadingNewMail}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 0,
              width: '100%'
            }}
            size='large'
            showSearch
            value={dataEmail?.map((a: any) => {
              return a?.to
            })}
            onDeselect={(e) => {
              const j = dataEmail?.filter((a: any) => a?.to !== e)
              setDataEmail(j)
            }}
            searchValue={valSearch}
            onSearch={(e) => {
              setValSearch(e)
            }}
            onSelect={(e: string) => {
              const g = dataPegawai?.find((a: any) => a.nip === e)
              let o = {
                name_receiver: g?.nama_pegawai,
                to: g?.nip,
                name_sender: name,
                from: nip
              }
              setDataEmail((a: any) => [...a, o])
            }}
            onDropdownVisibleChange={() => {
              getPegawai(dataauthusman, '100', '0').then((data: any) => {
                if (data?.data?.status === 'Success') {
                  let val: any[] = data?.data?.data
                  setDataPegawai(val)
                }
              })
            }}
            mode='multiple'
            labelInValue={false}
            bordered={false}
            suffixIcon={
              <div>
                <Button
                  icon={<SearchOutlined style={{ fontSize: 40 }} />}
                  style={{ borderWidth: 0, padding: 0, margin: 0 }}
                  onClick={() => {
                    getPegawaiByNama(dataauthusman, valSearch).then(
                      (data: any) => {
                        if (data?.data?.status === 'Success') {
                          setDataPegawai(data?.data?.data)
                        }
                      }
                    )
                  }}
                />
              </div>
            }
            filterOption={false}
          >
            {dataPegawai?.map((a: any, i: number) => {
              return (
                <Select.Option key={i} value={a?.nip}>
                  <Avatar
                    src={a?.foto_pegawai}
                    size={'small'}
                    style={{ marginRight: 5 }}
                  />
                  {a.nama_pegawai}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <p>Subject</p>
          <Input.TextArea
            disabled={loadingNewMail}
            maxLength={300}
            placeholder='Max 300 character'
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount
            value={valSubject}
            onChange={(e: any) => {
              setValSubject(e.target.value)
            }}
          />
        </div>
        {loadingEditor ? (
          <div
            style={{
              height: '210mm',
              width: '297mm',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Spin size='large' />
          </div>
        ) : (
          ''
        )}
        <Editor
          disabled={loadingNewMail}
          value={valueEditor}
          apiKey='36iqfcag9kzushye6d2mkf16270vqoj0k83nw2w516wzwozt'
          onEditorChange={(e: any) => {
            setValueEditor(e)
          }}
          onInit={() => {
            setLoadingEditor(false)
          }}
          init={{
            height: '297mm',
            width: '210mm',
            plugins: 'pagebreak | table ',
            table_tab_navigation: true,

            toolbar:
              'undo | redo | bold | fontselect | fontsizeselect | aligncenter | alignjustify | alignleft | alignnone | alignright | pagebreak | table | forecolor backcolor'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            width: '100%',
            marginTop: 20
          }}
        >
          <Button
            disabled={loadingNewMail}
            loading={loadingNewMail}
            icon={<SendOutlined />}
            style={{
              backgroundColor: 'lightblue',
              color: 'white',
              fontFamily: DmSerif
            }}
            onClick={() => {
              postMessageMany()
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              clearForm()
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
