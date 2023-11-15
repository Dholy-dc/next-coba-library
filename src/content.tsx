import { Avatar, Drawer, FloatButton } from "antd";
import React from "react";
import LeftContent from "./leftcontent";
import RightContent from "./rightcontent";
import { DmSerif } from "./fontstyle";
import {
  CloseCircleOutlined,
  MailFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { NewMail } from "./newmail";
import RightContentOutbox from "./righcontentoutbox";

export const Content = ({
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
  setLoadingLeftContent,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  dataMessageRecieve: any[];
  dataMessageSender: any[];
  focusMessage: string;
  setFocusMessage: (e: string) => void;
  datauser: any;
  dataPegawai: any[];
  dataauthusman: object;
  name: string;
  nip: string;
  setDataMessageReceive: (e: any[]) => void;
  setDataMessageSender: (e: any[]) => void;
  funtionGetDataPegawai: (e: any[]) => void;
  loadingRightContent: boolean;
  setLoadingRightContent: (e: boolean) => void;
  loadingLeftContent: boolean;
  setLoadingLeftContent: (e: boolean) => void;
}) => {
  const [openNewMail, setOpenNewMail] = React.useState<boolean>(false);
  const [focusScreenContent, setFocusScreenContent] =
    React.useState<string>("");
  return (
    <Drawer
      placement="right"
      open={open}
      size="large"
      width={"100%"}
      closeIcon={<CloseCircleOutlined style={{ color: "lightgrey" }} />}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginLeft: 10,
              color: "white",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: DmSerif,
                fontWeight: 800,
                fontSize: 27,
                padding: 0,
              }}
            >
              SIPPP
              <MailFilled
                style={{
                  marginRight: 0,
                  fontSize: 25,
                  rotate: "-40deg",
                }}
              />
              Mail Box
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontFamily: DmSerif,
                fontWeight: "700",
                color: "lightgrey",
              }}
            >
              <p style={{ fontWeight: "400", fontSize: 11 }}>{datauser?.nip}</p>
              <p>{datauser?.nama}</p>
            </div>

            <Avatar
              src={datauser?.url_foto}
              alt="foto user"
              style={{ width: 50, height: 50 }}
            />
          </div>
        </div>
      }
      headerStyle={{
        boxShadow: "1px 5px 4px lightgrey",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#15324D",
        zIndex: 1,
      }}
      onClose={() => {
        setOpen(false);
      }}
      style={{ color: "black", padding: 0, overflow: "hidden" }}
      bodyStyle={{ padding: 0, overflow: "hidden" }}
    >
      <div style={{ display: "flex" }}>
        <LeftContent
          dataMessageRecieve={dataMessageRecieve}
          dataMessageSender={dataMessageSender}
          setFocusMessage={setFocusMessage}
          focusMessage={focusMessage}
          dataPegawai={dataPegawai}
          setFocusScreenContent={setFocusScreenContent}
          dataauthusman={dataauthusman}
          setDataMessageReceive={setDataMessageReceive}
          setDataMessageSender={setDataMessageSender}
          nip={nip}
          funtionGetDataPegawai={funtionGetDataPegawai}
          setLoadingRightContent={setLoadingRightContent}
          loadingLeftContent={loadingLeftContent}
          setLoadingLeftContent={setLoadingLeftContent}
        />
        {focusScreenContent === "inbox" ? (
          <RightContent
            dataMessageRecieve={dataMessageRecieve}
            dataMessageSender={dataMessageSender}
            focusMessage={focusMessage}
            loadingRightContent={loadingRightContent}
          />
        ) : (
          <RightContentOutbox
            dataMessageRecieve={dataMessageRecieve}
            dataMessageSender={dataMessageSender}
            focusMessage={focusMessage}
          />
        )}

        <FloatButton
          icon={<PlusOutlined style={{ fontSize: 20 }} />}
          onClick={() => {
            setOpenNewMail(true);
          }}
        />
        <NewMail
          open={openNewMail}
          setOpen={setOpenNewMail}
          dataauthusman={dataauthusman}
          name={name}
          nip={nip}
          funtionGetDataPegawai={funtionGetDataPegawai}
          setDataMessageSender={setDataMessageSender}
        />
      </div>
    </Drawer>
  );
};
