import React from "react";
import { useParams } from "react-router-dom";
import ListsService from "../../services/lists.service";
import styles from "../../styles/Lists.module.scss";

const ListsPage: React.FC = () => {
  const { username } = useParams();
  const [lists, setLists] = React.useState();
  const getLists = async () => {
    if (username) {
      const listsData = await ListsService.getByUsername(username);
      setLists(listsData);
    }
  };
  React.useEffect(() => {
    getLists();
  }, []);
  return (
    <div className="contentWrapper">
      <h1>
        Collect, curate, and share. Lists are the perfect way to group novels.
      </h1>
    </div>
  );
};
export default ListsPage;
