import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ListsService from "../../api/lists.service";
import ListWrapper from "../../components/ListWrapper";
import ListsStore from "../../store/ListsStore";
import profileStore from "../../store/profilePageStore";
import { List } from "../../typings/models";

const Empty: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>
        Collect, curate, and share. Lists are the perfect way to group novels.
      </h2>
      <Link to="/lists/new">
        <button className="btn_big">Create one</button>
      </Link>
    </div>
  );
};

const ListsPage: React.FC = () => {
  const { username } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);

  const setPage = async () => {
    if (username) {
      await ListsService.getByUsername(username);
    }
  };
  React.useEffect(() => {
    if (ListsStore.lists === null) setPage();
    profileStore.setBody("lists");
    setLoading(false);
  }, []);
  return loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={80} />
    </div>
  ) : ListsStore.lists === null || ListsStore.lists.length === 0 ? (
    <Empty />
  ) : (
    <div className="listsWrapper">
      {ListsStore.lists.map((list: List, index) => (
        <ListWrapper key={index} list={list} />
      ))}
    </div>
  );
};
export default observer(ListsPage);
