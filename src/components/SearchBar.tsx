import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import NovelsService from "../services/novels.service";
import { novelInfo } from "../types/models";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<null | novelInfo[]>(
    null
  );
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values: { search: string }) => {
      const data = await NovelsService.searchFor(values.search);
      setSearchResults([...data]);
    },
  });
  return (
    <div className="globalSearch">
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        id="searchBar"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 200,
          backgroundColor: "var(--background-color)",
        }}
      >
        <InputBase
          id="search"
          name="search"
          onChange={formik.handleChange}
          onBlur={()=>{setSearchResults(null)}}
          value={formik.values.search}
          autoComplete="off"
          sx={{ ml: 1, flex: 1, color: "var(--text-color)" }}
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
      {searchResults && (
        <ul className="search__results">
          {searchResults.map((novel) => (
            <Link key={novel.id} to={`/novel/${novel.id}`}>
              <li>
                <span>{novel.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
