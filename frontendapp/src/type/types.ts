export type urlProps = {
    id: number,
    url: string,
    length: number,
    key: string,
    shorturl: string
}

export type CopyProps = {
    shorturl: string;
    handleCopy: (text: string) => void
}

export type BackendResponse = {
    message: string;
    success: boolean;
    data: urlProps[];
}

export type DeleteProps = {
    shorturl: string;
};
