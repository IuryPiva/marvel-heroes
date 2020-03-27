import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import Character from "../../components/Character";
import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import CharacterEditForm from "../../components/CharacterEditForm";
import { act } from "react-dom/test-utils";

const CHARACTER = gql`
  fragment character on Character {
    id
    name
    resourceURI
    thumbnail {
      path
      extension
    }
    description
    series {
      items {
        name
        resourceURI
      }
    }
  }
`;

export default () => {
  let { characterId } = useParams();
  const [visible, setVisible] = useState(false);
  const client = useApolloClient();

  const character = client.readFragment({
    id: characterId,
    fragment: CHARACTER
  });

  const onSave = ({ name, description }) => {
    const newCharacter = Object.assign({}, character, { name, description });
    client.writeFragment({
      id: characterId,
      fragment: CHARACTER,
      data: newCharacter
    });
    setVisible(false);
  };

  return !character ? (
    <Redirect to="" />
  ) : (
    <>
      {visible && (
        <CharacterEditForm
          visible={visible}
          onSave={onSave}
          onCancel={() => {
            setVisible(false);
          }}
          initialValues={{
            name: character.name,
            description: character.description
          }}
        />
      )}
      <Character character={character} onEditClick={() => setVisible(true)} />
    </>
  );
};
