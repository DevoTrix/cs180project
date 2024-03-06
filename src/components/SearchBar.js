import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SearchedClass from "./SearchedClass";

export default function SearchBar() {
  const CHARACTER_LIMIT = 15;
  const [spec, setSpec] = React.useState("");
  const [quarter, setQuarter] = React.useState("spring");
  const requestData = { spec, quarter };
  const [searchResults, setSearchResults] = React.useState(null);

  const handleSpecChange = (event) => {
    setSpec(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getSearchQuery();
    }
  };

  const getSearchQuery = () => {
    axios
      .post("http://localhost:5001/api/search", requestData)
      .then((res) => {
        const jsonData = JSON.parse(res.data); // Parse the JSON data
        console.log(jsonData); // Assuming the response contains data
        setSearchResults(jsonData); // Set the parsed data in state
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <TextField
        id="outlined-size-small"
        label="Search Classes"
        variant="outlined"
        size="small"
        value={spec}
        onChange={handleSpecChange}
        onKeyDown={handleKeyDown}
      />
      {/*searchResults && <SearchedClass data={searchResults[0]} />*/}{" "}
      {/* Render SearchedClass if there are search results */}
      {searchResults &&
        searchResults
          .slice(0, 10)
          .map((result, index) => <SearchedClass key={index} data={result} />)}
    </Box>
  );
}
