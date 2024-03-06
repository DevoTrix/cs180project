import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";

export default function SearchBar() {
    const CHARACTER_LIMIT = 15;
  const [spec, setSpec] = React.useState('');
  const [quarter, setQuarter] = React.useState('spring')
  const requestData = {spec, quarter};

  const handleSpecChange = (event) => {
    setSpec(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getSearchQuery();
    }
  };

  const getSearchQuery = () => {
    axios.post('http://localhost:5001/api/search', requestData)
    .then(res => {
        console.log(res.data); // Assuming the response contains data
    }).catch(err => {
        console.error(err);
    });
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
    >
        <TextField
            id="outlined-size-small"
            label="Search Classes"
            variant="outlined"
            size= "small"
            value={spec}
            onChange={handleSpecChange}
            onKeyDown={handleKeyDown}
        />
    </Box>
  );
}