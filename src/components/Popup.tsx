import React from "react";

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  setEditOpen: (data: boolean) => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setEditOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
type PopupProps = {
  editOpen: boolean;
  setEditOpen: (data: boolean) => void;
  innerContent: JSX.Element;
};
const Popup: React.FC<PopupProps> = ({
  editOpen,
  setEditOpen,
  innerContent,
}) => {
  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef, setEditOpen);
  return (
    <div
      data-testid="overlay"
      data-popup="modal"
      className="popup-overlay"
      tabIndex={-1}
      style={!editOpen ? { display: "none" } : {}}
    >
      <div className="popup-content" role="dialog" ref={popupRef}>
        {innerContent}
      </div>
    </div>
  );
};

export default Popup;
