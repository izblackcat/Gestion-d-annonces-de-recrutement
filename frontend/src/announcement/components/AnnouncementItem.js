import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./AnnouncementItem.css";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MAX, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AnnouncementItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
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
  const [report, setReport] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  let isCandidate = false;
  if (auth.isLoggedIn) {
    isCandidate = auth.__t === "Candidate" ? true : false;
  }
    if (auth.isLoggedIn) {
      isCandidate = auth.__t === "Candidate" ? true : false;
    }

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
    

    const confirmDeleteHandler = async (event) => {
      event.preventDefault();

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/announcement/delete/${props.id}`,
          "DELETE",
          JSON.stringify({
            userId: auth.userId
          }),
          {
            "Content-Type": "application/json",
          }
        );
        history.push('/');
      } catch (err) {
        console.log(err);
      }
      console.log("DELETING............");
      
    };


    const openReportHandler = () => {
      setShowReportModal(true);
      console.log(showReportModal);
    };
    const closeReportHandler = () => setShowReportModal(false);

    const reportSubmitHandler = async (event) => {
      event.preventDefault();
      console.log(formState.inputs.reporting.value);
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/report/new",
          "POST",
          JSON.stringify({
            report: report,
            additionalInformation: formState.inputs.reporting.value,
            announcementId: props.id,
            reporterId: auth.isLoggedIn ? auth.userId : undefined,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {
        console.log(err);
      }
      closeReportHandler();
    };


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
              <Button
                danger
                onClick={reportSubmitHandler}
                disabled={
                  report === "Autre" && formState.inputs.reporting.value === ""
                }
              >
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
                <input
                  type="radio"
                  name="radio"
                  onChange={() =>
                    setReport("Annonce offensante ou discriminatoire")
                  }
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                Annonce potentiellement frauduleuse
                <input
                  type="radio"
                  name="radio"
                  onChange={() =>
                    setReport("Annonce potentiellement frauduleuse")
                  }
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                Annonce inexacte
                <input
                  type="radio"
                  name="radio"
                  onChange={() => setReport("Annonce inexacte")}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                Il s'agit d'une publicité
                <input
                  type="radio"
                  name="radio"
                  onChange={() => setReport("Il s'agit d'une publicité")}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                Autre
                <input
                  type="radio"
                  name="radio"
                  onChange={() => setReport("Autre")}
                />
                <span className="checkmark"></span>
              </label>
              <Input
                id="reporting"
                element="textarea"
                label="Autres"
                validators={
                  report === "Autre"
                    ? [VALIDATOR_MAX(100), VALIDATOR_REQUIRE()]
                    : [VALIDATOR_MAX(100)]
                }
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
              <Button danger onClick={confirmDeleteHandler} >
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
            {isCandidate || !auth.isLoggedIn ? (
              <div className="announcement-item__actions">
                <Button to={`/annonces/postuler/${props.id}`}>POSTULER</Button>
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
  }
export default AnnouncementItem;
