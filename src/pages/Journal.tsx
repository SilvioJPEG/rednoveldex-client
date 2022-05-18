import React from "react";
import { useParams } from "react-router";
import NovelWrapper from "../components/NovelWrapper";
import { JournalEntry } from "../typings/models";
import PendingIcon from "@mui/icons-material/Pending";
import styles from "../styles/Journal.module.scss";
import journalService from "../api/journal.service";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import authStore from "../store/authStore";
import "react-datepicker/dist/react-datepicker.css";
import EditPopup from "../components/Editor";
import editorStore from "../store/editorStore";
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
  const [journalList, setJournal] = React.useState<JournalEntry[] | null>(null);
  const replaceEntity = (newEntity: JournalEntry) => {
    if (journalList) {
      let newList = [
        ...journalList.filter(
          (el: JournalEntry) => el.Novel.id !== newEntity.Novel.id
        ),
        newEntity,
      ].sort((a, b) => sortByStatus(a, b));
      setJournal(newList);
    }
  };
  const sortByStatus = (prev: JournalEntry, next: JournalEntry): number => {
    // novels with "reading" status always go first
    if (prev.status === "reading" && next.status !== "reading") {
      return -1;
    }
    // novels with "completed" status go second
    if (
      prev.status === "completed" &&
      ["on-hold", "dropped", "plan to read"].includes(next.status)
    ) {
      return -1;
    }
    if (
      prev.status === "on-hold" &&
      ["dropped", "plan-to-read"].includes(next.status)
    ) {
      return -1;
    }
    // novels with "plan to read" status always go last
    if (prev.status !== "plan-to-read" && next.status === "plan-to-read") {
      return -1;
    }
    return 0;
  };
  const getJournalData = async () => {
    if (username) {
      let journalData = await journalService.getJournalEntities(username);
      journalData.sort((a, b) => sortByStatus(a, b));
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
              <td className={styles.status}></td>
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
                <td className={styles.status + " " + entity.status}></td>
                <td>{index}</td>
                <td>
                  <NovelWrapper
                    key={entity.Novel.id}
                    novel={entity.Novel}
                    type={"tiny"}
                  />
                </td>
                <td className={styles.title}>
                  <Link
                    className={styles.link}
                    to={`/novel/${entity.Novel.id}`}
                  >
                    {entity.Novel.title}
                  </Link>
                </td>
                <td>{entity.score === 0 ? "-" : entity.score}</td>
                <td>{entity.status}</td>
                {username === authStore.user.username && (
                  <td>
                    <span
                      className={styles.link}
                      onClick={() => {
                        editorStore.openEditor({ entity, type: "edit" });
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
      <EditPopup replaceEntity={replaceEntity} />
    </div>
  );
};
export default Journal;
