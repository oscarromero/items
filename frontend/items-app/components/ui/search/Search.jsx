'use client'

import TextField from "@mui/material/TextField";

const Search = ({ onSearch, value }) => {
    return (
        <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    );
}

export default Search;