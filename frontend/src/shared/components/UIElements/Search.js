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

  // const filterContent = (announcements, text) => {
  //   const result = announcements.filter((announcement) =>
  //     announcement.title.includes(text)
  //   );
  //   setLoadedAnn(result);
  // };

  const searchHandler = (event) => {
    console.log(event.target.value);
    // const textSearch = event.target.value;
    // axious.get("/").then((res) => {
    //   if (res.data.success) {
    //     filterContent(res.data.announcements, textSearch);
    //   }
    // });
  };

  return (
    <Card className="search">
      <form onChange={searchHandler}>
        <Input
          id="search"
          element="input"
          label=""
          placeholder="Mots clés.."
          validators={[]}
          onInput={inputHandler}
        />
        <Button
          inverse
          type="submit"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          CHERCHER
        </Button>
      </form>
      {/* <input
        id="search"
        label=""
        placeholder="Mots clés.."
        onChange={searchHandler}
      /> */}
    </Card>
  );
};

export default Search;
