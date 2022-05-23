import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import ListsService from "../../api/lists.service";
import ListWrapper from "../../components/ListWrapper";
import ListsStore from "../../store/ListsStore";
import profileStore from "../../store/profilePageStore";
import { List } from "../../typings/models";

const Empty: React.FC = () => {
  return (
    <>
      <h1>
        Collect, curate, and share. Lists are the perfect way to group novels.
      </h1>
    </>
  );
};

const ListsPage: React.FC = () => {
  const { username } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);

  const setPage = async () => {
    if (username) {
      await ListsService.getByUsername(username);
      setLoading(true);
    }
  };
  React.useEffect(() => {
    setPage();
    profileStore.setBody("lists");
  }, []);
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="contentWrapper">
      {ListsStore.lists ? (
        <div>
          {ListsStore.lists.map((list: List) => (
            <ListWrapper list={list} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};
export default observer(ListsPage);
