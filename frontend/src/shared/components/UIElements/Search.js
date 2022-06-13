import React from "react";

import Input from "../FormElements/Input";
import Card from "../UIElements/Card";
import Button from "../FormElements/Button";
import "./Search.css";

import { useForm } from "../../hooks/form-hook";

const Search = (props) => {
  const [formState, inputHandler] = useForm(
    {
      search: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const searchHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="search">
      <form>
        <Input
          id="search"
          element="input"
          label=""
          placeholder="Mots clés.."
          validators={[]}
          onInput={inputHandler}
        />
        <Button inverse type="submit" onClick={searchHandler}>
          CHERCHER
        </Button>
      </form>
    </Card>
  );
};

export default Search;
