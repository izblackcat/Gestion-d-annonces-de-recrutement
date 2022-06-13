import React from "react";

import AnnouncementItem from "./AnnouncementItem";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./AnnouncementsList.css";

const AnnouncementsList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div className="announcement-list center">
        <Card>
          <h2>Aucune annonce trouvée. Voulez-vous en créer une?</h2>
          <Button to="/annonces/nouvel">Ajouter</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="announcement-list">
      {props.items.map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          id={announcement.id}
          title={announcement.title}
          description={announcement.description}
          category={announcement.category}
          candidates={announcement.numberOfCandidates}
          status={announcement.status}
          date={announcement.createdAt.split("T")[0]}
          userId={announcement.creator}
        />
      ))}
    </ul>
  );
};

export default AnnouncementsList;
