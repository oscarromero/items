import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const CrudToolbar = ({ size, onReload, onNew, onEdit, onDelete, onSearch, noIcon, noText }) => {
  const renderIcon = (iconComponent) => noIcon ? null : iconComponent;
  const renderButton = (text, onClick, icon) => (
    <Button onClick={onClick} variant="text" endIcon={noIcon ? null : icon} size={size}>
      {noText ? null : text}
    </Button>
  );
  const renderSearchField = () => {
    return (
        <TextField size="small" placeholder="Buscar" onChange={(e) => onSearch(e.target.value)} />
    );
  }  

  return (
    <>
      {onSearch && renderSearchField()}
      {onReload && renderButton("Actualizar", onReload, renderIcon(<CloudSyncIcon />))}
      {onEdit && renderButton("Editar", onEdit, renderIcon(<EditIcon />))}
      {onDelete && renderButton("Eliminar", onDelete, renderIcon(<DeleteIcon />))}
      {onNew && renderButton("Agregar", onNew, renderIcon(<AddIcon />))}
    </>
  );
};

export default CrudToolbar;