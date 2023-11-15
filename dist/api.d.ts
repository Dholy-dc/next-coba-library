export declare const BASE_URL_NOTIF = "https://asset.ut.ac.id:3012";
export declare const BASE_URL = "https://asset.ut.ac.id:3012/notif/testing";
export declare const BASE_URL_HRIS = "https://be2.ut.ac.id/hrd";
export declare const BASE_PATH_NOTIF: {
    create_collection: string;
    get_by_from: string;
    get_by_recieve: string;
    get_by_id: string;
    post_message: string;
    get_all: string;
    read_message: string;
    post_single_message: string;
    post_many_message: string;
};
export declare const BASE_PATH_HRIS: {
    userdatabyniparray: string;
    get_pegawai: string;
    get_pegawai_by_nama: string;
};
export declare const socketNotif: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
