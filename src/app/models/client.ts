export interface Client {
    id?:number,
    firstname?: string,
    lastname?: string,
    email?: string,
    address?: string,
    zipcode?: number,
    city?: string,
    phoneNumber?: string,
    registerDate?:Date



}

const a: Client= {};
const b = a.id || 0;