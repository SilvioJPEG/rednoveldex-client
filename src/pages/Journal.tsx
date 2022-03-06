import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import NovelWrapper from "../components/NovelWrapper";
import { API_URL } from "../services/auth.service";
import { Novel } from "../types/models";

const Journal: React.FC = () => {
  const { username } = useParams();
  const [journalList, setJournal] = React.useState<Novel[] | null>(null);
  const getJournalData = async () => {
    const journalData = await axios.get(`${API_URL}/journal/${username}`);
    setJournal(journalData.data);
  };
  React.useEffect(() => {
    getJournalData();
  }, []);
  return (
    <div>
      <h1>Journal</h1>
      {journalList &&
        journalList.map((novel) => {
          <NovelWrapper novel={novel} type={"small"} />;
        })}
    </div>
  );
};
export default Journal;
