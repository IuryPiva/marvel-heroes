import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import { Card, Avatar, Col, List, Form, Input } from "antd";
import {
  EditOutlined,
  ExportOutlined
} from "@ant-design/icons";

import Modal from "antd/lib/modal/Modal";
import { Redirect } from "react-router-dom";
import { CardProfile, CardSeries, FlyingBackArrow, Row } from "./style";

const { Meta } = Card;

const CharacterEditForm = ({ visible, onSave, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Edit character"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSave(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
        onFinish={values => onSave(values)}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of this character!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Input type="submit" style={{ display: "none"   }}/>
      </Form>
    </Modal>
  );
};

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

export default ({ characterId }) => {
  const [visible, setVisible] = useState(false);
  const [back, setBack] = useState(false);
  const client = useApolloClient();

  const character = client.readFragment({
    id: characterId,
    fragment: CHARACTER,
  });
  console.log({character})

  const onSave = ({ name, description }) => {
    const newCharacter = Object.assign({}, character, { name, description })
    console.log({newCharacter})
    client.writeFragment({
      id: characterId,
      fragment: CHARACTER,
      data: newCharacter
    });
    setVisible(false);
  };

  return back || !character ? (
    <Redirect to="" />
  ) : (
    <>
      <Row gutter={4}>
        <Col>
          <CardProfile
            cover={
              <Avatar
                size={128}
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
            }
            actions={[
              <EditOutlined key="edit" onClick={() => setVisible(true)} />,
              <a
                href={character.resourceURI}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExportOutlined key="ellipsis" />
              </a>
            ]}
          >
            <FlyingBackArrow
              key="back"
              onClick={() => setBack(true)}
            />
            <Meta title={character.name} description={character.description} />

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
          </CardProfile>
        </Col>
        <Col>
          <CardSeries title="Series">
            <List
              size="small"
              dataSource={character.series.items}
              renderItem={item => (
                <List.Item>
                  <a
                    href={item.resourceURI}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </List.Item>
              )}
            />
          </CardSeries>
        </Col>
      </Row>
    </>
  );
};
