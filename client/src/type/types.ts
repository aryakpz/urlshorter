
export type urlProps={
    id:number,
    url:string,
    length:number,
    key:string,
    shorturl:string
}

export type CopyProps={
    shorturl:string;
    handleCopy:(text:string)=>void
}

export type EditProps={

}