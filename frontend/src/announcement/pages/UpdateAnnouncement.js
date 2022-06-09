import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const ANNONCES = [
  {
    id: "an1",
    title: "Announcement A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "PENDING",
    date: "06-June-2022",
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
    date: "06-MARS-2022",
    candidates: "15",
    userId: "u2",
  },
];

function UpdateAnnouncement() {
  const annonceId = useParams().annonceId;

  const identifiedAnn = ANNONCES.find((an) => an.id === annonceId);

  if (!identifiedAnn) {
    return (
      <div className="center">
        <h2>Aucune annonce trouvée</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Titre"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le titre de l'annonce doit être valide."
        onInput={() => {}}
        value={identifiedAnn.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(7)]}
        errorText="La description de l'annonce doit être valide (au moins 7 charactères)."
        onInput={() => {}}
        value={identifiedAnn.description}
        valid={true}
      />
      <Input
        id="category"
        element="input"
        type="text"
        label="Catégorie"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La catégorie de l'annonce doit être valide."
        onInput={() => {}}
        value={identifiedAnn.category}
        valid={true}
      />
      <Input
        id="status"
        element="input"
        type="text"
        label="Statut"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Le statut de l'annonce doit être valide."
        onInput={() => {}}
        value={identifiedAnn.status}
        valid={true}
      />
      <Input
        id="date"
        element="input"
        type="date"
        label="Date"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="La date de l'annonce doit être valide."
        onInput={() => {}}
        value={identifiedAnn.date}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        METTRE A JOUR
      </Button>
    </form>
  );
}

export default UpdateAnnouncement;
