import styles from "../styles/ListWrapper.module.scss";
import { List } from "../typings/models";

type ListWrapperProps = {
  list: List;
};

const ListWrapper: React.FC<ListWrapperProps> = ({ list }) => {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.listWrapper__header}>{list.name}</div>
      <div className={styles.listWrapper__body}>
        <img src={list.novels[0].image} alt={list.name} />
        <p>{list.description}</p>
      </div>
    </div>
  );
};

export default ListWrapper;
