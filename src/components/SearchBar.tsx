import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NovelsService from "../api/novels.service";
import { novelInfo } from "../types/models";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<null | novelInfo[]>(
    null
  );
  const [searchValue, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue) {
        const data = await NovelsService.searchFor(searchValue);
        if (data.length) {
          setSearchResults([...data]);
        } else {
          setSearchResults(null);
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const formSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
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
      <Paper component="form" onSubmit={formSubmit} id="searchBar">
        <InputBase
          id="search"
          name="search"
          onChange={(e) => {
            setSearchValue(e.currentTarget.value);
            if (e.currentTarget.value.length === 0) {
              setSearchResults(null);
            }
          }}
          value={searchValue}
          onBlur={() => {
            setSearchResults(null);
          }}
          autoComplete="off"
          sx={{ ml: 1, flex: 1 }}
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
