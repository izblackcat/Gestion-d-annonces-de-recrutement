import React, { useState } from "react";

// import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import "./AnnouncementItem.css";

const AnnouncementItem = (props) => {
  const [showReportModal, setShowReportModal] = useState(false);

  // const openReportHandler = () => setShowReportModal(true);

  const closeReportHandler = () => setShowReportModal(false);

  // const isCandidate = false;
  return (
    <React.Fragment>
      <Modal
        show={showReportModal}
        onCancel={closeReportHandler}
        header="Signaler cette annonce"
        contentClass="announcement-item__modal-content"
        footerClass="announcement-item__modal-actions"
        footer={<Button onClick={closeReportHandler}>FERMER</Button>}
      >
        <div className="report-container">
          <h2>Pourquoi voulez-vous signaler cetter annonce?</h2>
        </div>
      </Modal>
      <li className="announcement-item">
        <div className="announcement-item__content">
          <h2>{props.id}</h2>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <div className="announcement-item__info">
            <h3>{props.category}</h3>
            <h3>Status : {props.status}</h3>
            <h3>
              {props.candidates}
              {props.candidates === 1 ? " candidate" : " candidates"}
            </h3>
            <h3>{props.date}</h3>
          </div>
          {/* {isCandidate ? (
            <div className="announcement-item__actions">
              <Button to={`/annonces/postuler`}>POSTULER</Button>
              <Button danger onClick={openReportHandler}>
                SIGNALER
              </Button>
            </div>
          ) : (
            
          )} */}
          <div className="announcement-item__actions">
            <Button to={`/annonces/${props.id}`}>MODIFIER</Button>
            <Button danger>SUPPRIMER</Button>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default AnnouncementItem;
