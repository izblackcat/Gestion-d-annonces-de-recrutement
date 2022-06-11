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
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isCandidate, setIsCandidate] = useState(true);

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
          phone: undefined,
          // landlinePhone: undefined,
          // companyName: undefined,
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
          phone: {
            value: "",
            isValid: false,
          },
          // landlinePhone: {
          //   value: "",
          //   isValid: false,
          // },
          // companyName: {
          //   value: "",
          //   isValid: false,
          // },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const identityHandler = () => {
    if (isCandidate) {
      setFormData(
        {
          ...formState.inputs,
          // phone: undefined,
        },
        formState.inputs.email.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.firstName.isValid &&
          formState.inputs.lastName.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          landlinePhone: {
            value: "",
            isValid: false,
          },
          companyName: {
            value: "",
            isValid: false,
          },
        },
        formState.inputs.email.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.firstName.isValid &&
          formState.inputs.lastName.isValid
      );
    }
    setIsCandidate(!isCandidate);
    console.log(isCandidate);
  };

  return (
    <Card className="authentication">
      <h2>Se connecter à GAR</h2>
      <hr />
      <form className="announcement-form" onSubmit={authSubmitHandler}>
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

            <div style={{ display: "flex", justifyContent: "space-arround" }}>
              <p>Candidat</p>
              <label className="switch">
                <input
                  id="identity"
                  label="Qui êtes vous?"
                  type="checkbox"
                  onInput={inputHandler}
                  onChange={identityHandler}
                />
                <span className="slider round"></span>
              </label>
              <p>Recruteur</p>
            </div>
            {isCandidate ? (
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
                  label="Nom de l'entreprise recrutante"
                  placeholder="Nom de votre entreprise concernée"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Le nom de votre entreprise doit être valide."
                  onInput={inputHandler}
                />
                <Input
                  id="landlinePhone"
                  element="input"
                  type="tel"
                  label="Numéro de téléphone de l'entreprise"
                  placeholder="Numéro de téléphone de votre entreprise"
                  validators={[VALIDATOR_PHONE()]}
                  errorText="Le numéro de téléphone de votre entreprise doit être valide(Ex: 0500000000)."
                  onInput={inputHandler}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
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
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "SE CONNECTER" : "CREER UN COMPTE"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {!isLoginMode ? "SE CONNECTER" : "CREER UN COMPTE"}
      </Button>
    </Card>
  );
};

export default Auth;