import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import NovelWrapper from "../components/NovelWrapper";
import { API_URL } from "../services/auth.service";
import { Novel } from "../types/models";
import PendingIcon from "@mui/icons-material/Pending";
import styles from "../styles/Journal.module.scss";
import { Paper } from "@mui/material";

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
    <Paper className={styles.journalWrapper}>
      <h1>{username}'s journal</h1>
      {journalList === null ? (
        ""
      ) : journalList.length !== 0 ? (
        journalList.map((novel) => {
          <NovelWrapper novel={novel} type={"small"} />;
        })
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PendingIcon />
          <span>There is nothing here right now...</span>
          <span>Start addding novels to your </span>
        </div>
      )}
    </Paper>
  );
};
export default Journal;
