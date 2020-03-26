import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import { Card, Avatar, Row, Col, List, Form, Input } from "antd";
import {
  EditOutlined,
  ExportOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";

import "./Character.css";
import Modal from "antd/lib/modal/Modal";
import { Redirect } from "react-router-dom";

const { Meta } = Card;

const cardStyles = { width: 300, height: 475 };

const CharacterEditForm = ({ visible, onCreate, onCancel, initialValues }) => {
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
            onCreate(values);
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
    fragment: CHARACTER
  });

  const onCreate = values => {
    client.writeFragment({
      id: characterId,
      fragment: CHARACTER,
      data: {
        name: values.name,
        description: values.description
      }
    });
    setVisible(false);
  };

  return back || !character ? (
    <Redirect to="" />
  ) : (
    <>
      <Row gutter={4}>
        <Col>
          <Card
            className="character"
            style={cardStyles}
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
            <ArrowLeftOutlined
              key="back"
              style={{ position: "absolute", top: 8, left: 8, fontSize: 24 }}
              onClick={() => setBack(true)}
            />
            <Meta title={character.name} description={character.description} />

            {visible && (
              <CharacterEditForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
                initialValues={{
                  name: character.name,
                  description: character.description
                }}
              />
            )}
          </Card>
        </Col>
        <Col>
          <Card className="character-series" style={cardStyles} title="Series">
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
          </Card>
        </Col>
      </Row>
    </>
  );
};
