export class httpException extends Error{
    declare statuscode:number;
    constructor({message,statuscode}:{message:string,statuscode:number}){
        super(message);
        this.message=message;
        this.statuscode=statuscode;
    }
}
 
