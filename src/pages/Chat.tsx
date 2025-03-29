import {useState} from "react";
import {FileUpload} from "@/components/ui/file-upload.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useApiMutation} from "@/hooks/useApiService.ts";
import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";
import {REQUEST_METHODS} from "@/constants/api.enum.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {toast, Toaster} from "sonner";
import {FileResponseType} from "@/types/api/chat.type.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";


const Chat = () => {

    const [file, setFile] = useState<File[]>([]);

    const [md, setMd] = useState<string>("");

    const file_handler = useApiMutation<FormData, FileResponseType>(API_ENDPOINTS.FILE_ENDPOINT, REQUEST_METHODS.POST);


    const handleFileChange = (files: File[]) => {
        setFile(files);
    }

    const handleFileSubmit = () => {
        const formData = new FormData();
        file.forEach((file_single) => formData.append("files", file_single));
        file_handler.mutate(formData, {
            onSuccess: (data) => {
                toast("File Upload Successful", {description: data.message});
                setMd(data.result)
            }, onError: (error) => {
                toast("File Upload Failed", {description: error.message});
            }
        })
    }


    return <div className={'flex flex-row border w-[86.2vw] justify-between p-5 gap-5'}>
        <section className={'flex flex-col py-6 w-2/3 '}>
            {/*<div className={'flex flex-col'}>*/}
                <ScrollArea className={'flex flex-col p-5 overflow-y-auto gap-5 '}>
                    <div className={'prose max-w-none'}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1
                                        className="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700"
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2
                                        className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100"
                                        {...props}
                                    />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3
                                        className="text-xl font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200"
                                        {...props}
                                    />
                                ),
                                p: ({ node, ...props }) => (
                                    <p
                                        className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
                                        {...props}
                                    />
                                ),
                                code: ({ node, ...props }) => (
                                    <code
                                        className="bg-gray-800 dark:bg-gray-900 px-1.5 py-0.5 rounded-md text-blue-200 dark:text-blue-300 font-mono text-sm"
                                        {...props}
                                    />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre
                                        className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4 text-gray-100 dark:text-gray-200"
                                        {...props}
                                    />
                                ),
                                a: ({ node, href, ...props }) => (
                                    <a
                                        href={href}
                                        className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                                        {...props}
                                    />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul
                                        className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1"
                                        {...props}
                                    />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol
                                        className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1"
                                        {...props}
                                    />
                                ),
                                li: ({ node, ...props }) => (
                                    <li
                                        className="mb-1"
                                        {...props}
                                    />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote
                                        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 italic text-gray-600 dark:text-gray-400 mb-4"
                                        {...props}
                                    />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto mb-4">
                                        <table
                                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                            {...props}
                                        />
                                    </div>
                                ),
                                th: ({ node, ...props }) => (
                                    <th
                                        className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300 font-semibold"
                                        {...props}
                                    />
                                ),
                                td: ({ node, ...props }) => (
                                    <td
                                        className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                        {...props}
                                    />
                                ),
                                img: ({ node, alt, ...props }) => (
                                    <img
                                        alt={alt || ""}
                                        className="max-w-full h-auto rounded-lg my-4"
                                        loading="lazy"
                                        {...props}
                                    />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr
                                        className="my-6 border-gray-200 dark:border-gray-700"
                                        {...props}
                                    />
                                )
                            }}
                        >
                            {md}
                        </ReactMarkdown>
                    </div>
                </ScrollArea>
            {/*</div>*/}
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
            <Button className={'py-7 my-5 rounded-xl text-base cursor-pointer'}
                    onClick={handleFileSubmit}>Submit</Button>
            <Toaster></Toaster>
        </section>
    </div>
}

export default Chat;