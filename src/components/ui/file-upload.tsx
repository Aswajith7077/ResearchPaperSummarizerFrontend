import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import {ScrollArea} from "@/components/ui/scroll-area";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleDeletion = (index:number) => {
    setFiles(prevState => prevState.filter((file,ind) => ind !== index && file));
  }

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div

        whileHover="animate"
        className=" group/file block rounded-lg w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2 justify-center w-full " >

          <ScrollArea className="flex flex-col p-2 overflow-y-auto w-full max-h-[50vh] w-full ">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-gray-700 flex flex-row items-start justify-between md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}

                >
                  <div className="flex flex-col justify-center w-full items-start gap-2">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-gray-700 dark:text-gray-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-3 py-1 w-fit shrink-0 text-sm text-gray-600 dark:bg-gray-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <IoClose className={"cursor-pointer"} size={24} onClick={() => handleDeletion(idx)}/>

                  {/*<div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between mb-2">*/}
                  {/*  <motion.p*/}
                  {/*    initial={{ opacity: 0 }}*/}
                  {/*    animate={{ opacity: 1 }}*/}
                  {/*    layout*/}
                  {/*    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"*/}
                  {/*  >*/}
                  {/*    {file.type}*/}
                  {/*  </motion.p>*/}


                  {/*</div>*/}
                </motion.div>
              ))}
          </ScrollArea>
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onClick={handleClick}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-gray-700 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                )}
              </motion.div>
            )}



          {!files.length && (
              <motion.div

                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
          )}
          <button className={!files.length ? 'hidden':'py-5 mt-6 border-dashed border-cyan-400 border w-full rounded-2xl cursor-pointer'} onClick={handleClick}>
            Upload More Files
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-950"
                  : "bg-gray-50 dark:bg-gray-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
