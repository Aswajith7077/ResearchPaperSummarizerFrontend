import {MyChatProps} from "@/types/api/chat.type.ts";


const MyChat = ({message}:MyChatProps) => {
    return <div className={'flex flex-col items-end w-full'} >
        <div className={'flex flex-col p-7 gap-3 my-3 rounded-b-3xl rounded-l-3xl bg-gray-900 max-w-[60%]'}>
            <p className={'font-semibold text-lg text-left'}>{message.question}</p>
            <p className={'text-right text-sm text-gray-400'}>{message.time}</p>
        </div>
    </div>
};

export default MyChat;