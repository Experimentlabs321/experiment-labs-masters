import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

// Define a custom theme

const DialogLayout = ({
  children,
  open,
  setOpen,
  title,
  bgColor,
  width,
  borderRadius,
}) => {
  const theme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: bgColor, // Set your desired background color here
            borderRadius: borderRadius,
            padding: "0px",
            width: width,
          },
        },
      },
    },
  });

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
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
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  const DialogContentWrapper = styled(DialogContent)(({ theme }) => ({
    // width: "300px",
    // height: "300px",
    padding: theme.spacing(2),
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <BootstrapDialog onClose={handleClose} open={open} maxWidth="900px">
        {title && (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
        )}
        {!title && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
            }}
          >
            <div className="bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center">
              <CloseIcon />
            </div>
          </IconButton>
        )}
        <DialogContentWrapper>{children}</DialogContentWrapper>
      </BootstrapDialog>
    </ThemeProvider>
  );
};

export default DialogLayout;
