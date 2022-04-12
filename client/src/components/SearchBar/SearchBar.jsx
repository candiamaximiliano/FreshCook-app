import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../redux/actions/recipes";
import searchBarStyles from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameRecipes(name));
  };

  return (
    <div>
      <input
        value={name}
        type="search"
        placeholder="Search recipes..."
        onChange={(e) => {
          handlerInputChange(e);
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          handlerSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
}
