import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NovelsService from "../services/novels.service";
import { novelInfo } from "../types/models";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<null | novelInfo[]>(
    null
  );
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const onChangeSearch = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;
    if (!value.length) {
      setSearchResults(null);
    }
  };
  const formSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const searchValue = target.search.value;
    if (searchValue.length) {
      const data = await NovelsService.searchFor(searchValue);
      if (data.length) {
        setSearchResults([...data]);
      } else {
        setSearchResults(null);
      }
    } else {
      setSearchResults(null);
    }
  };

  //TODO: add not only novels but users and lists to global search as well
  return (
    <div className="globalSearch">
      <Paper
        component="form"
        onSubmit={formSubmit}
        id="searchBar"
        sx={{
          p: "2px 4px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          width: 200,
          backgroundColor: "var(--background-color)",
        }}
      >
        <InputBase
          id="search"
          name="search"
          ref={inputRef}
          onChange={onChangeSearch}
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
            <li
              key={novel.id}
              onClick={() => {
                setSearchResults(null);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              <Link to={`/novel/${novel.id}`}>
                <span>{novel.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
