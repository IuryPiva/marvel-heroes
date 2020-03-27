import { EditOutlined, ExportOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, List } from "antd";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { CardProfile, CardSeries, FlyingBackArrow, Row } from "./style";

const { Meta } = Card;

export default ({ character, onEditClick }) => {
  const [back, setBack] = useState(false);

  const action = onEditClick ? (
    <EditOutlined key="edit" onClick={() => onEditClick()} />
  ) : null;

  return back ? (
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
              action,
              <a
                href={character.resourceURI}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExportOutlined key="ellipsis" />
              </a>
            ]}
          >
            <FlyingBackArrow key="back" onClick={() => setBack(true)} />
            <Meta title={character.name} description={character.description} />
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
