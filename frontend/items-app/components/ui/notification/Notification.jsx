import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notification({ open, handleClose, severity, message }) {
  const position = { vertical: "top", horizontal: "right" };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={position}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
