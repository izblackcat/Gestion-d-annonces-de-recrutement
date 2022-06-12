import React, { useState, useContext } from "react";

// import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./AnnouncementItem.css";

const AnnouncementItem = (props) => {
  const auth = useContext(AuthContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    //SEND THE REQUEST TO DELETE THIS
    console.log("DELETING............");
  };

  const [showReportModal, setShowReportModal] = useState(false);

  const openReportHandler = () => setShowReportModal(true);

  const closeReportHandler = () => setShowReportModal(false);

  const isCandidate = true;
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
          <form>
            <label class="container">
              Annonce offensante ou discriminatoire
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Annonce potentiellement frauduleuse
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Annonce inexacte
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Il s'agit d'une publicité
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
            <Input
              element="textarea"
              label="Autres"
              placeholder="Informations"
              onInput={() => {}}
            />
          </form>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Etes-vous sûr?"
        footerClass="announcement-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              ANNULER
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              SUPPRIMER
            </Button>
          </React.Fragment>
        }
      >
        <p>Est-ce que vous êtes sûr de vouloir supprimer cette annonce?</p>
      </Modal>

      <li className="announcement-item">
        <div className="announcement-item__content">
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
          {isCandidate ? (
            <div className="announcement-item__actions">
              <Button to={`/annonces/postuler`}>POSTULER</Button>
              <Button danger onClick={openReportHandler}>
                SIGNALER
              </Button>
            </div>
          ) : (
            <div className="announcement-item__actions">
              {auth.isLoggedIn && (
                <Button to={`/annonces/${props.id}`}>MODIFIER</Button>
              )}
              {auth.isLoggedIn && (
                <Button danger onClick={showDeleteWarningHandler}>
                  SUPPRIMER
                </Button>
              )}
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  );
};

export default AnnouncementItem;
