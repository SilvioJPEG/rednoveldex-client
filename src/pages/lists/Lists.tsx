import React from "react";
import { useParams } from "react-router-dom";
import ListsService from "../../api/lists.service";

const ListsPage: React.FC = () => {
  const { username } = useParams();

  React.useEffect(() => {
    if (username) {
      ListsService.getByUsername(username);
    }
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
