import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  loading,
  closeText,
  confirmText,
  handleOpen,
  handleClose,
  handleConfirm,
  children
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        
        {children}

        <Divider style={{ margin: "16px 0px" }} />

        <Grid container justifyContent="flex-end">
          <Button onClick={handleClose}>{closeText ?? 'CANCELAR'}</Button>
          <LoadingButton
            onClick={handleConfirm}
            variant="contained"
            loading={loading}
          >
            {confirmText ?? 'ACEPTAR'}
          </LoadingButton>
        </Grid>
      </Box>
    </Modal>
  );
}
