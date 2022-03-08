import React from "react";
import { useParams } from "react-router";
import NovelWrapper from "../components/NovelWrapper";
import { Novel } from "../types/models";
import PendingIcon from "@mui/icons-material/Pending";
import styles from "../styles/Journal.module.scss";
import { Paper } from "@mui/material";
import journalService from "../services/journal.service";

const Journal: React.FC = () => {
  const { username } = useParams();
  const [journalList, setJournal] = React.useState<Novel[] | null>(null);
  const getJournalData = async () => {
    if (username) {
      const journalData = await journalService.getJournalEntities(username);
      setJournal(journalData);
      console.log("journalData", journalData);
    }
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
        <div className={styles.journalWrapper__list}>
          {journalList.map((novel) => (
            <NovelWrapper key={novel.id} novel={novel} type={"small"} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PendingIcon />
          <span>There is nothing here right now...</span>
          <span>Start addding novels to your </span>
        </div>
      )}
    </Paper>
  );
};
export default Journal;
