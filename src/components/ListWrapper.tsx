import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "../styles/ListWrapper.module.scss";
import { BaseNovel, List } from "../typings/models";

type ListWrapperProps = {
  list: List;
};

const ListWrapper: React.FC<ListWrapperProps> = ({ list }) => {
  const getFirstPosterInList = (): string | undefined => {
    for (let novel of list.novels) {
      if (novel.image) {
        return novel.image;
      }
    }
  };

  return (
    <div className={styles.listWrapper}>
      <div className={styles.listWrapper__header}>{list.name}</div>

      <div className={styles.listWrapper__body}>
        <Link to={`/lists/${list.id}`}>
          <div className="novelWrapper">
            <img src={getFirstPosterInList()} alt={list.name} />
          </div>
        </Link>
        <p>{list.description}</p>
      </div>
    </div>
  );
};

export default observer(ListWrapper);
