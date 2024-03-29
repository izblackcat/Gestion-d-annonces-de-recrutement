import React,{ useContext } from "react";
import { useHistory } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./AnnouncementForm.css";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Auth from "../../user/pages/Auth";

const NewAnnouncement = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      }
    },
    false
  );
  const history = useHistory();

  const announcementSubmitHandler = async (event) => {

    event.preventDefault();
    if(auth.isLoggedIn){
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/announcement/new",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          category: formState.inputs.category.value,
          status: formState.inputs.status.value,
          userId: auth.userId
        }),
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/');
    } catch (err) {console.log(err)}
  } else {
    throw new Error("You have to sign up first");
  }
  };

  return (
    <form className="announcement-form" onSubmit={announcementSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Titre"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le titre de l'annonce doit être valide."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(7)]}
        errorText="La description de l'annonce doit être valide (au moins 7 charactères)."
        onInput={inputHandler}
      />
      <Input
        id="category"
        element="input"
        type="text"
        label="Catégorie"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La catégorie de l'annonce doit être valide."
        onInput={inputHandler}
      />
      <Input
        id="status"
        element="input"
        type="text"
        label="Statut"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le statut de l'annonce doit être valide."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        AJOUTER
      </Button>
    </form>
  );
};

export default NewAnnouncement;
