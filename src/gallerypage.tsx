import * as React from "react";
import { DmSerif } from "./fontstyle";
import { SettingFilled } from "@ant-design/icons";

export const GalleryPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: "100%",
        fontFamily: DmSerif,
        fontSize: 20,
      }}
    >
      <SettingFilled style={{ fontSize: 50, marginRight: 5 }} spin />
      <p>Page On Progess</p>
    </div>
  );
};
