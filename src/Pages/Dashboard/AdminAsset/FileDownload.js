import React from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";

const FileDownload = ({ fileOpen, setFileOpen, file }) => {
  return (
    <div>
      <DialogLayoutForFromControl
        open={fileOpen}
        setOpen={(open) => {
          setFileOpen(open);
        }}
        width={800}
        title={
          <p className="h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            File
          </p>
        }
      >
        <div className="w-full">
          {file ? (
            <div className="flex flex-col p-5">
              <p className="text-xl font-semibold">
                File download link:
              </p>
              <p className="text-sm">{file}</p>
              <a
                className="bg-blue text-white font-semibold rounded-lg p-3 w-[100px] mt-5"
                href={file}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          ) : (
            <p className="text-center py-5 text-lg font-semibold">
              No file exists.
            </p>
          )}
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default FileDownload;
