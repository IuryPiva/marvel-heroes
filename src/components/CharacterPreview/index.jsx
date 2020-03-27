import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import { Card, NameMeta, Drawer, DrawerDescription } from "./style";

export default ({ character }) => {
  const [visible, setVisible] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  const showDrawer = () => setVisible(true)
  const onClose = () => setVisible(false)
  const handleClick = () => setRedirectTo(`/character/${character.id}`)

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <>
      <Card
        onClick={() => handleClick()}
        hoverable
        onMouseEnter={showDrawer}
        cover={
          <img
            alt="character"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
        }
      >
        <NameMeta>{character.name.toUpperCase()}</NameMeta>
        {character.description && (
          <Drawer
            title="Info"
            placement="right"
            closable={true}
            onMouseLeave={onClose}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            destroyOnClose
          >
            <DrawerDescription>{character.description}</DrawerDescription>
          </Drawer>
        )}
      </Card>
    </>
  );
};
