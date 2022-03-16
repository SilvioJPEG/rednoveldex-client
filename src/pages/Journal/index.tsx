import React from "react";
import { useParams } from "react-router";
import NovelWrapper from "../../components/NovelWrapper";
import { JournalEntry } from "../../types/models";
import PendingIcon from "@mui/icons-material/Pending";
import styles from "../../styles/Journal.module.scss";
import journalService from "../../services/journal.service";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import authStore from "../../store/authStore";
import "react-datepicker/dist/react-datepicker.css";
import EditPopup from "./Editor";



function EmptyJournal() {
  return (
    <div
      className={styles.table}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        borderBottom: "1px solid",
      }}
    >
      <PendingIcon />
      <span>There is nothing here right now...</span>
    </div>
  );
}

const Journal: React.FC = () => {
  const { username } = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [journalList, setJournal] = React.useState<JournalEntry[] | null>(null);
  const [editData, setEditData] = React.useState<JournalEntry | null>(null);
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const getJournalData = async () => {
    if (username) {
      const journalData = await journalService.getJournalEntities(username);
      setJournal(journalData);
    }
  };
  React.useEffect(() => {
    getJournalData();
  }, []);
  return (
    <div className={styles.journal}>
      <h1>{username}'s journal</h1>
      {journalList === null ? (
        <div
          className={styles.table}
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid",
          }}
        >
          <CircularProgress />
        </div>
      ) : journalList.length !== 0 ? (
        <table className={styles.table}>
          <tbody>
            <tr className={styles.table__row}>
              <td>#</td>
              <td>Image</td>
              <td className={styles.title}>Title</td>
              <td>Score</td>
              <td>Status</td>
              {username === authStore.user.username && <td></td>}
            </tr>
            {journalList.map((entity, index) => (
              <tr
                key={entity.Novel.id}
                className={styles.table__row}
                style={
                  index % 2
                    ? { backgroundColor: "var(--secondary-background-color)" }
                    : {}
                }
              >
                <td>{index}</td>
                <td>
                  <NovelWrapper key={entity.Novel.id} novel={entity.Novel} type={"tiny"} />
                </td>
                <td className={styles.title}>
                  <Link className={styles.link} to={`/novel/${entity.Novel.id}`}>
                    {entity.Novel.title}
                  </Link>
                </td>
                <td>{entity.score}</td>
                <td>{entity.status}</td>
                {username === authStore.user.username && (
                  <td>
                    <span
                      className={styles.link}
                      onClick={() => {
                        setEditOpen(!editOpen);
                        setEditData(entity);
                      }}
                    >
                      Edit
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        EmptyJournal()
      )}
      <EditPopup
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        entry={editData}
      />
    </div>
  );
};
export default Journal;
