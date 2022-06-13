import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./AnnouncementForm.css";

const Apply = () => {
  return (
    <Card className="announcement-form">
      <form>
        <Input
          id="cv"
          element="input"
          type="file"
          label="Curriculum Vitae"
          placeholder="Votre cv"
          validators={[]}
          errorText="Le format de votre cv doit être valide."
          onInput={() => {}}
        />
        <Button type="submit" inverse>
          IMPORTER
        </Button>
      </form>
    </Card>
  );
};

export default Apply;
