import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";


const Apply = (props) => {

  const [formState, inputHandler] = useForm(
    {
      file: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const auth = useContext(AuthContext);
  const { aid } = useParams();
  console.log(auth)
  console.log(aid)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", formState.inputs.file.value);
      await sendRequest(`http://localhost:5000/api/user/candidate/cv/${auth.userId}`, "PATCH", formData);
    } catch (err) {
      console.log(err)
    }
    try{
      await sendRequest(`http://localhost:5000/api/application/new/${auth.userId}`,"POST", 
      JSON.stringify({
        announcementId: aid
      }),
      {
        "Content-Type": "application/json",
      })
    }catch(err){
      console.log(err)
    }
    history.push('/')
  };

  return (
    <React.Fragment>
      <form
        className="place-form center"
        onSubmit={placeSubmitHandler}
        style={{ display: "block" }}
      >
        <ImageUpload id="file" onInput={inputHandler} errorText={error} />

        <Button type="submit" disabled={!formState.isValid}>
          IMPORTER VOTRE CV
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Apply;