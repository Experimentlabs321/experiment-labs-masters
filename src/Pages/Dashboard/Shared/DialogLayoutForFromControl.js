import React, { useContext, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DialogLayoutForFromControl = ({
  children,
  open,
  setOpen,
  title,
  bgColor,
  width,
  borderRadius,
  close,
  onClose,
}) => {
  // Function to handle the closing of the dialog
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose(); // Call the onClose function passed as a prop
    }
  };

  useEffect(() => {
    // Event listener for the "Esc" key
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleEsc);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {open && (
        <div
          className="relative z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 hidden-scroll overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center w-full sm:p-0">
              <div
                style={{
                  maxWidth: `${width}px`,
                  width: "100%",
                }}
                className="relative transform overflow-hidden rounded-lg dark:bg-Dark bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div>
                  {title}
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 20,
                      top: 20,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <div className="bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center">
                      <CloseIcon />
                    </div>
                  </IconButton>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogLayoutForFromControl;