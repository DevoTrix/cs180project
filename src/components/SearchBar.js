import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import axios from "axios";
import Button from '@mui/material/Button';



export default function SearchBar() {
  const [name, setName] = React.useState('Cat in the Hat');

  const [spec, setSpec] = React.useState('cs111');
  const [quarter, setQuarter] = React.useState('spring')
  const requestData = {spec, quarter};

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
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Controlled"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Button 
        onClick={getSearchQuery}
        variant="contained">
            Test Backend API
      </Button>
    </Box>
  );
}