import React from "react";

import Input from "../FormElements/Input";
import Card from "../UIElements/Card";
import Button from "../FormElements/Button";
import "./Search.css";

const Search = (props) => {
  return (
    <Card className="search">
      <form>
        <Input
          id="search"
          element="input"
          label=""
          placeholder="Mots clés.."
          onInput={() => {}}
        />
        <Button inverse type="submit">
          CHERCHER
        </Button>
      </form>
    </Card>
  );
};

export default Search;
