import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_IDENIFIER,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  /* 
  <Input
    id="phone"
    element="input"
    type="tel"
    label="Numéro de téléphone"
    placeholder="Votre numéro de téléphone"
    validators={[VALIDATOR_PHONE()]}
    errorText="Votre numéro de téléphone doit être valide(Ex: 0600000000)."
    onInput={inputHandler}
  />
  */
  const auth = useContext(AuthContext);

  const [isIdentified, setIsIdentified] = useState(false);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    //SEND TO THE BACKEND
    console.log(formState.inputs);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          identity: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
          lastName: {
            value: "",
            isValid: false,
          },
          identity: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const nextFormHandler = () => {
    console.log(formState.inputs);
    console.log(formState.inputs.identity.value);
    setFormData(
      {
        ...formState.inputs,
        phone: {
          value: "",
          isValid: false,
        },
        // companyName: {
        //   value: "",
        //   isValid: false,
        // },
        // landlinePhone: {
        //   value: "",
        //   isValid: false,
        // },
      },
      false
    );
    setIsIdentified(true);
    console.log(isIdentified);
  };

  return (
    <Card className="authentication">
      <h2>Se connecter à GAR</h2>
      <hr />
      <form className="announcement-form" onSubmit={authSubmitHandler}>
        {!isIdentified ? (
          <React.Fragment>
            {!isLoginMode && (
              <React.Fragment>
                <Input
                  id="firstName"
                  element="input"
                  type="text"
                  label="Nom de famille"
                  placeholder="Votre nom de famille"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Votre nom de famille doit être valide."
                  onInput={inputHandler}
                />
                <Input
                  id="lastName"
                  element="input"
                  type="text"
                  label="Prénom"
                  placeholder="Votre prénom"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Votre prénom doit être valide."
                  onInput={inputHandler}
                />
                <Input
                  id="identity"
                  element="input"
                  type="text"
                  placeholder="Candidat ou Recruteur"
                  label="Qui êtes-vous"
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_IDENIFIER()]}
                  errorText="Vueillez spécifier qui vous êtes (CANDIDAT ou RECRUTEUR)."
                />
              </React.Fragment>
            )}
            {/* {!isLoginMode && isIdentified && (
              <React.Fragment>
                <h2>Maaan</h2>
              </React.Fragment>
            )} */}

            <Input
              id="email"
              element="input"
              type="email"
              label="Email"
              placeholder="Votre adresse mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="L'adresse e-mail doit être valide(Ex: nom@exemple.com)."
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              validators={[VALIDATOR_MINLENGTH(7)]}
              errorText="Le mot de passe doit être valide (au moins 7 charactères)."
              onInput={inputHandler}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>This is the next form</h2>
            {formState.inputs.identity.value === "CANDIDAT" ? (
              <Input
                id="phone"
                element="input"
                type="tel"
                label="Numéro de téléphone"
                placeholder="Votre numéro de téléphone"
                validators={[VALIDATOR_PHONE()]}
                errorText="Votre numéro de téléphone doit être valide(Ex: 0600000000)."
                onInput={inputHandler}
              />
            ) : (
              <React.Fragment>
                <Input
                  id="companyName"
                  element="input"
                  type="text"
                  label="Nom de votre entreprise"
                  placeholder="Le nom de votre entreprise"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Le nom de votre entreprise doit être valide."
                  onInput={inputHandler}
                />
                <Input
                  id="landlinePhone"
                  element="input"
                  type="tel"
                  label="Numéro de téléphone de votre entreprise"
                  placeholder="Le numéro de téléphone de votre entreprise"
                  validators={[VALIDATOR_PHONE()]}
                  errorText="Votre numéro de téléphone doit être valide(Ex: 0500000000)."
                  onInput={inputHandler}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {isLoginMode && (
          <Button type="submit" disabled={!formState.isValid}>
            SE CONNECTER
          </Button>
        )}
      </form>
      <div style={{ marginBottom: "0.5rem" }}>
        {!isLoginMode && (
          <Button onClick={nextFormHandler} disabled={!formState.isValid}>
            SUIVANT
          </Button>
        )}
      </div>
      <Button inverse onClick={switchModeHandler}>
        {!isLoginMode ? "SE CONNECTER" : "CREER UN COMPTE"}
      </Button>
    </Card>
  );
};

export default Auth;
