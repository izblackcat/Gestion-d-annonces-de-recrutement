import React, { useState, useContext } from "react";

// import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./AnnouncementItem.css";
import { useForm } from "../../shared/hooks/form-hook";

const AnnouncementItem = (props) => {
  const auth = useContext(AuthContext);
  let isCandidate = false;
  if(auth.isLoggedIn){
    isCandidate = JSON.parse(localStorage.getItem('userData')).__t === 'Candidate' ? true : false
  }
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

  //This is for reporting textarea:
  const [formState, inputHandler] = useForm(
    {
      reporting: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [showReportModal, setShowReportModal] = useState(false);

  const openReportHandler = () => setShowReportModal(true);

  const closeReportHandler = () => setShowReportModal(false);


  return (
    <React.Fragment>
      <Modal
        show={showReportModal}
        onCancel={closeReportHandler}
        header="Signaler cette annonce"
        contentClass="announcement-item__modal-content"
        footerClass="announcement-item__modal-actions"
        footer={
          <React.Fragment>
            <Button danger onClick={closeReportHandler}>
              SIGNALER
            </Button>
            <Button onClick={closeReportHandler}>FERMER</Button>
          </React.Fragment>
        }
      >
        <div className="report-container">
          <h2>Pourquoi voulez-vous signaler cetter annonce?</h2>
          <div>
            <label className="container">
              Annonce offensante ou discriminatoire
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Annonce potentiellement frauduleuse
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Annonce inexacte
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Il s'agit d'une publicité
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <Input
              id="reporting"
              element="textarea"
              label="Autres"
              validators={[]}
              placeholder="Informations"
              onInput={inputHandler}
            />
          </div>
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
              {props.candidates === 1 ? " candidat" : " candidats"}
            </h3>
            <h3>{props.date}</h3>
          </div>
      { (isCandidate || !auth.isLoggedIn) ? (
            <div className="announcement-item__actions">
              <Button to={`/annonces/postuler`}>POSTULER</Button>
              <Button danger onClick={openReportHandler}>
                SIGNALER
              </Button>
            </div>
          ) : (
            <div className="announcement-item__actions">
              {auth.isLoggedIn && props.userId === auth.userId && (
                <>
                <Button to={`/annonces/${props.id}`}>MODIFIER</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  SUPPRIMER
                </Button>
                </>
              )}
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  );
};

export default AnnouncementItem;
