import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./collapsible.module.css";

interface IProps {
  open?: boolean;
  title: string;
  children?: React.ReactNode;
}

const Collapsible: React.FC<IProps> = ({ open, title, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className={styles.collapsible}>
            <div>
              <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={handleFilterOpening}
                >
                  {!isOpen ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronUp} />
                  )}
                </button>
              </div>
            </div>
            <div className={styles.content}>
              <div>
                {isOpen && (
                  <div className={styles.contentContainer}>{children}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Collapsible;
