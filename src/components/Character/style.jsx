import styled from "styled-components";
import { Card, Row as _Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const _Card = styled(Card)`
  width: 300px;
  height: 475px;
`;

export const CardProfile = styled(_Card)`
  .ant-card-cover {
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .ant-card-body {
    overflow: scroll;
    height: 249px;
  }
`;

export const CardSeries = styled(_Card)`
  .ant-card-body {
    padding-top: 0;
    overflow: scroll;
    height: calc(475px - 66px);
  }
`;

export const FlyingBackArrow = styled(ArrowLeftOutlined)`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 24px;
`;

export const Row = styled(_Row)`
  justify-self: center;
`