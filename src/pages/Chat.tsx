import {Textarea} from "@/components/ui/textarea.tsx";
import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import {FileUpload} from "@/components/ui/file-upload.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IoSend} from "react-icons/io5";
import {useApiMutation} from "@/hooks/useApiService.ts";
import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";
import {REQUEST_METHODS} from "@/constants/api.enum.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {MessageType} from "@/types/api/chat.type.ts";
import MyChat from "@/components/MyChat.tsx";


const Chat = () => {

    const [file, setFile] = useState<File[]>();
    const [question, setQuestion] = useState<string>('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const {mutate} = useApiMutation<MessageType,string>(API_ENDPOINTS.ASK_QUESTION_ENDPOINT, REQUEST_METHODS.POST);


    const [messages, setMessage] = useState<MessageType[]>([]);


    const handleFileChange = (files: File[]) => {
        setFile(files);
        console.log(file);
    }

    const handleQuestionMutation = () => {
        const time = new Date().toISOString();
        const request: MessageType = {question: question,by:"user", time: time}
        setMessage(prev => {
            return [...prev, request];
        })
        console.log(request)
        mutate(request, {
            onSuccess: (data:string) => {
                console.log(data)
                const ai_message:MessageType = {
                    question:data.toString(),
                    by:"ai",
                    time: time
                }
                setMessage(prev => {
                    return [...prev, ai_message];
                })
            }, onError: (error) => {
                console.log(error)
            }
        });
    }

    const clearInput = () => {
        if (ref.current) ref.current.value = "";
    };


    const handleEnter = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (!event || event.key !== "Enter") return;
            event.preventDefault();
            handleQuestionMutation();
            clearInput();
        },
        [handleQuestionMutation, clearInput] // Dependencies
    );




    const handleTextChange = useCallback(
        (e:ChangeEvent<HTMLTextAreaElement>) => {
            setQuestion(prev => e.target.value ? e.target.value : prev);
        },
        []
    )


    return <div className={'flex flex-row border  w-full p-5 gap-5'}>
        <section className={'flex flex-col py-6 w-2/3 h-full'}>
            <div className={'flex flex-col h-full '}>
                <ScrollArea className={'flex flex-col p-5 overflow-y-auto gap-5 h-[80vh]'}>
                    {messages.map((value, key) => {
                        return (value.by === "user") ? <MyChat message={value} key={key}/> : <>{value.question}</>
                    })}
                </ScrollArea>
            </div>

            <div className={'flex flex-row items-center gap-5'}>
                <Textarea placeholder={'Type Something'} className={'w-[90%] text-base resize-none'} maxLength={200} rows={5} ref={ref}
                          onKeyDown={(e) => handleEnter(e)} onChange={handleTextChange}/>
                <Button className={'rounded-2xl pl-5 cursor-pointer'} onClick={() => {
                    handleQuestionMutation();
                    clearInput();
                }}>
                    <IoSend fontSize={28}/>
                </Button>
            </div>
        </section>
        <section className={'flex flex-col w-1/3 bg-gray-900 rounded-2xl p-10'}>
            <h1 className={'font-bold text-xl'}>File Uploader</h1>
            <div className={'my-5'}>
                <p className="relative z-20 font-sans font-bold text-gray-700 dark:text-gray-300 text-base">
                    Upload file
                </p>
                <p className="relative z-20 font-sans font-normal text-gray-500 dark:text-gray-400 text-base mt-2">
                    Drag or drop your files here or click to upload
                </p>
            </div>

            <FileUpload onChange={handleFileChange}/>
            <Button className={'py-7 my-5 rounded-xl text-base'}>Submit</Button>
        </section>
    </div>
}

export default Chat;