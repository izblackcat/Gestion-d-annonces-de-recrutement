import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

import "./NewAnnouncement.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewAnnouncement = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const announcementSubmitHandler = (event) => {
    event.preventDefault();
    //SEND THE DATA TO THE SERVER HERE!
    console.log(formState.inputs);
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
      <Input
        id="date"
        element="input"
        type="date"
        label="Date"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La date de l'annonce doit être valide."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        AJOUTER
      </Button>
    </form>
  );
};

export default NewAnnouncement;
