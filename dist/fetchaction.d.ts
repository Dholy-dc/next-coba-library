export declare const getMessageRecieve: (url: string, dataauthusman: object) => Promise<any>;
export declare const getDataPegawaiByNip: (dataauthusman: object, data: any[]) => Promise<any>;
export declare const getPegawaiByNama: (dataauthusman: object, nama: string) => Promise<any>;
export declare const createColllection: (dataauthusman: object, nip: string) => Promise<any>;
export declare const getPegawai: (dataauthusman: object, limit: string, offset: string) => Promise<any>;
export declare const postManyMessage: (dataauthusman: object, body: any, nip: string) => Promise<any>;
export declare const fetchReadMessage: (dataauthusman: object, id: string) => Promise<any>;
