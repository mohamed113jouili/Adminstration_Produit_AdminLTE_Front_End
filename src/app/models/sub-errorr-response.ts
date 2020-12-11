
export interface SubErrorResponse {
   

    status?: string,
    timestamp?: Date,
    message? :string,
    type?: number,
    comment?: string,
    name?: string,
    subErrors? :Array<string>

}