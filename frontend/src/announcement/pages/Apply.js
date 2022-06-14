import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";

const Apply = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form
        className="place-form center"
        onSubmit={placeSubmitHandler}
        style={{ display: "block" }}
      >
        <ImageUpload id="image" onInput={inputHandler} errorText="" />
        <Button type="submit" disabled={!formState.isValid}>
          IMPORTER VOTRE CV
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Apply;
