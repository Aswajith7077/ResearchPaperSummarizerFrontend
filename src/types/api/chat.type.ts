



type FileResponseType = {
    message:string,
    result:string,
}

type MessageType = {
    question:string,
    by:"ai"|"user",
    time:string,
}

type MyChatProps = {
    message:MessageType;
}


type GenerateSummarizationProps = {
    wskey:string
}


export type{
    MyChatProps,
    MessageType,
    FileResponseType,
    GenerateSummarizationProps
}