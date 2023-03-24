export interface IUserLogin {
    usuario: string;
    contra: string;
}

export interface IUserLoginInfo {
    usuario: string;
    remember: boolean;
    password: string;
    idprofile: number 
}
export interface IUserDatos{
    respuesta: string;
    usuario: string;
    contra:string;
    idcobsiniestro: null,
    idVehOtros: number,
    idliquidacion: number,
    idtarifa: number,
    montoAsegurado: number,
    // estado: null,
    // numOcupantes: null,
    // ultimoEstado: null,
    // idordenatencion: null,
    // smcobgeneral: null,
    // smidcobertura: null,
    // idmarca: null,
    // idperfil: null,
    idusuario: string;
    nomusuario: string;
    // idampliacion: null,
    // vplaca: null,
    // nrolesionados: null,
    // cantidadLiquidaciones: null,
    // idpagodirecto: 0,
    // idpersona: 0
}

// export interface IOAuthTokens {
//     accessToken: string;
//     refreshToken: string;
//     token_type: string;
//     expiresIn: number;
//     userId: number | string;
//     //fbSession: string;
//     refreshExpiresIn: number;
// }

