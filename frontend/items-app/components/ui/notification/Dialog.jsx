import Modal from "@/components/ui/notification/Modal";
import Typography from "@mui/material/Typography";

export default function Dialog({
  open,
  loading,
  title,
  message,
  handleOpen,
  handleClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={open}
      loading={loading}
      closeText={"CANCELAR"}
      confirmText={"CONFIRMAR"}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Modal>
  );
}
