import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./AnnouncementForm.css";
const ANNONCES = [
  {
    id: "an1",
    title: "Announcement A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "PENDING",
    date: new Date().toISOString().split("T")[0],
    candidates: "5",
    userId: "u1",
  },
  {
    id: "an2",
    title: "Announcement B",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "URGENT",
    date: new Date().toISOString().split("T")[0],
    candidates: "15",
    userId: "u2",
  },
];

const UpdateAnnouncement = () => {
  const [isLoading, setIsLoading] = useState(true);

  const annonceId = useParams().annonceId;

  const [formState, inputHandler, setFormData] = useForm(
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
      },
      date: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedAnn = ANNONCES.find((an) => an.id === annonceId);

  useEffect(() => {
    if (identifiedAnn) {
      setFormData(
        {
          title: {
            value: identifiedAnn.title,
            isValid: true,
          },
          description: {
            value: identifiedAnn.description,
            isValid: true,
          },
          category: {
            value: identifiedAnn.category,
            isValid: true,
          },
          status: {
            value: identifiedAnn.status,
            isValid: true,
          },
          date: {
            value: identifiedAnn.date,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedAnn]);

  const updateAnnouncementHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedAnn) {
    return (
      <div className="center">
        <Card>
          <h2>Aucune annonce trouvée</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>En cours...</h2>
      </div>
    );
  }

  return (
    <form className="announcement-form" onSubmit={updateAnnouncementHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Titre"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le titre de l'annonce doit être valide."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(7)]}
        errorText="La description de l'annonce doit être valide (au moins 7 charactères)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="category"
        element="input"
        type="text"
        label="Catégorie"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La catégorie de l'annonce doit être valide."
        onInput={inputHandler}
        initialValue={formState.inputs.category.value}
        initialValid={formState.inputs.category.isValid}
      />
      <Input
        id="status"
        element="input"
        type="text"
        label="Statut"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le statut de l'annonce doit être valide."
        onInput={inputHandler}
        initialValue={formState.inputs.status.value}
        initialValid={formState.inputs.status.isValid}
      />
      <Input
        id="date"
        element="input"
        type="date"
        label="Date"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La date de l'annonce doit être valide."
        onInput={inputHandler}
        initialValue={formState.inputs.date.value}
        initialValid={formState.inputs.date.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        METTRE A JOUR
      </Button>
    </form>
  );
};

export default UpdateAnnouncement;
