





type MessageType = {
    question:string,
    by:"ai"|"user",
    time:string,
}

type MyChatProps = {
    message:MessageType;
}


export type{
    MyChatProps,
    MessageType,
}