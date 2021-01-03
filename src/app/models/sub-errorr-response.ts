
export interface SubErrorResponse {
   

    status?: string,
    timestamp?: Date,
    message? :string,
    type?: number,
    comment?: string,
    name?: string


}

/* {"status":"BAD_REQUEST",
"timestamp":"03-01-2021 06:06:36",
"message":"could not execute statement",
"type":100,
"comment":"duplicate clie_email","name":"clie_email"} */