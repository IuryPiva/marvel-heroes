import React from "react";
import { useParams } from "react-router-dom";
import Character from "./Character";

export default () => {
  let { characterId } = useParams();

  return <Character characterId={characterId} />
};
