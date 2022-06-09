import React from "react";

import AnnouncementItem from "./AnnouncementItem";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./AnnouncementsList.css";

const AnnouncementsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="announcement-list center">
        <Card>
          <h2>Aucune annonce trouvée. Voulez-vous en créer une?</h2>
          <Button to="/annonces/nouveau">Ajouter</Button>
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
          candidates={announcement.candidates}
          status={announcement.status}
          date={announcement.date}
          userId={announcement.userId}
        />
      ))}
    </ul>
  );
};

export default AnnouncementsList;
