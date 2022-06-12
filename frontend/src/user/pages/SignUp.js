import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_IDENIFIER,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

const SignUp = () => {
  const [isIdentified, setIsIdentified] = useState(false);
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  const isIdentifiedHandler = () => {
    console.log(formState.inputs);

    if (formState.inputs.identity.value === "CANDIDAT") {
      setFormData(
        {
          ...formState.inputs,
          phone: undefined,
        },
        false
      );
    } else if (formState.inputs.identity.value === "RECRUTEUR") {
      setFormData(
        {
          ...formState.inputs,
          companyName: undefined,
          landlinePhone: undefined,
        },
        false
      );
    }
    setIsIdentified(true);
    console.log(isIdentified);
  };

  const finishSignUpHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    const responseData = null;
    if (formState.inputs.identity.value === "CANDIDAT") {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/candidate/signup",
          "POST",
          JSON.stringify({
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            phoneNumber: formState.inputs.phoneNumber.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/recruiter/signup",
          "POST",
          JSON.stringify({
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            landlinePhone: formState.inputs.landlinePhone.value,
            companyName: formState.inputs.companyName.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
    console.log(responseData);
  };

  return (
    <Card className="authentication">
      <h2>Créer un compte chez GAR</h2>
      <hr />
      <form className="announcement-form" onSubmit={finishSignUpHandler}>
        {isIdentified ? (
          <React.Fragment>
            <h2>This is the next form</h2>
            {formState.inputs.identity.value === "CANDIDAT" ? (
              <React.Fragment>
                <Input
                  id="phoneNumber"
                  element="input"
                  type="tel"
                  label="Numéro de téléphoneNumber"
                  placeholder="Votre numéro de téléphoneNumber"
                  validators={[VALIDATOR_PHONE()]}
                  errorText="Votre numéro de téléphoneNumber doit être valide(Ex: 0600000000)."
                  onInput={inputHandler}
                />
              </React.Fragment>
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
                  placeholder="Le numéro de téléphoneNumber de votre entreprise"
                  validators={[VALIDATOR_PHONE()]}
                  errorText="Votre numéro de téléphoneNumber doit être valide(Ex: 0500000000)."
                  onInput={inputHandler}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
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
        )}
        {isIdentified ? (
          <Button type="submit" inverse disabled={!formState.isValid}>
            TERMINER
          </Button>
        ) : (
          <Button
            inverse
            disabled={!formState.isValid}
            onClick={isIdentifiedHandler}
          >
            SUIVANT
          </Button>
        )}
      </form>
      <div style={{ marginBottom: "0.5rem" }}>
        <p>Vous avez déjà un compte?</p>
        <Button to="/auth/se-connecter">SE CONNECTER</Button>
      </div>
    </Card>
  );
};

export default SignUp;
