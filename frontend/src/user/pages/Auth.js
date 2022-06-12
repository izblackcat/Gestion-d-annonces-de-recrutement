import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const [formState, inputHandler] = useForm(
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/user/login',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.userId, responseData.token);
    } catch (err) {console.log(err)}
  };

  return (
    <Card className="authentication">
      <h2>Se connecter à GAR</h2>
      <hr />
      <form className="announcement-form" onSubmit={authSubmitHandler}>
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
          SE CONNECTER
        </Button>
      </form>
      <div style={{ marginBottom: "0.5rem" }}>
        <p>Vous n'avez pas encore un compte?</p>
        <Button to="/auth/creer-compte">CREER UN COMPTE</Button>
      </div>
    </Card>
  );
};

export default Auth;
