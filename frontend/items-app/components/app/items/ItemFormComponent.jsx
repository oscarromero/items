import TextField from "@mui/material/TextField";

export default function ItemForm({
  data,
  handleFormChange,
}) {
  return (
    <>
      {data.id > 0 && (
        <>
          <TextField
            required
            id="outlined-id"
            label="ID"
            name="id"
            fullWidth
            disabled
            value={data.id}
          />
          <div style={{margin: '16px'}} />
        </>
      )}

      <TextField
        required
        id="outlined-description"
        label="Descripcion"
        name="description"
        value={data.description}
        onChange={handleFormChange}
        fullWidth
        autoFocus
      />
    </>
  );
}
