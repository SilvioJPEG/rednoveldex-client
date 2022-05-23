import React from "react";
import { Novel } from "../../typings/models";
const AllNovels: React.FC = () => {
  const [novels, setNovel] = React.useState<Novel[]>();
  const [search, setSearch] = React.useState<string>("");
  React.useEffect(() => {}, []);
  const filterByTitle = (novels: Novel[], search: string): Novel[] => {
    return novels.filter((el) => el.title.includes(search));
  };
  return (<div>
    <div>
      
    </div>
  </div>);
};

export default AllNovels;
