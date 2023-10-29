import { Previews } from "@/components/FileUploadAndPrev/Previews";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = (props) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        setFiles((prevFiles) => {
          /* filtering the `acceptedFiles` array to remove any files that already
          exist in the `prevFiles` array. */
          const newFiles = acceptedFiles.filter((file) => {
            return !prevFiles.some((prevFile) => prevFile.name === file.name);
          });

          return [
            ...prevFiles,
            ...newFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
            ),
          ];
        });
      },
    });

  return (
    <div className="group container overflow-y-hidden">
      {/* button to reset files list */}
      <button
        type="button"
        className="my-4 ml-auto block rounded border border-red-500 p-1 text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
        onClick={() => setFiles([])}
      >
        Reset
      </button>
      <div
        className={cn(
          "dropzone-area",
          {
            "border-blue-400": isFocused,
          },
          {
            "border-green-400": isDragAccept,
          },
          {
            "border-red-400": isDragReject,
          },
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <svg
          className="h-12 w-12"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m16 16-4-4-4 4" />
        </svg>
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <Previews files={files} setFiles={setFiles} />{" "}
      {/* Use the Previews component */}
    </div>
  );
};

export default FileUpload;
