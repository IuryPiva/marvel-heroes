import { Card as _Card, Drawer as _Drawer } from "antd";
import styled from "styled-components";

export const Card = styled(_Card)`
  width: 210px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ebedf0;
  border-radius: 2px;
  text-align: center;
  background: #fafafa;
  transition: transform 0.2s; /* Animation */

  &:hover {
    transform: scale(1.1);
  }

  .ant-card-cover {
    height: 250px;
    display: grid;
    align-items: center;
    background: #292929;
  }

  .ant-card-body {
    height: 95px;
    overflow: scroll;
    display: grid;

    background: #151515;
    border-top-style: solid;
    border-color: red;
  }

  img {
    transition: transform 0.2s; /* Animation */
  }

  .ant-drawer-wrapper-body,
  .ant-drawer-body,
  .ant-drawer-content {
    background: transparent;
  }

  .ant-drawer-header {
    background: #000000bd;
  }

  .ant-drawer-title,
  .ant-drawer-close {
    color: snow;
    font-weight: bold;
    text-transform: uppercase;
  }
  .ant-drawer-close {
    transition: transform 0.3s;
  }
  .ant-drawer-close:hover {
    transform: scale(1.2);
  }
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
`;

export const NameMeta = styled.span`
  color: snow;
  font-weight: bold;
`;

export const Drawer = styled(_Drawer)`
  position: absolute;
  background: #17010161;
`;

export const DrawerDescription = styled.p`
  color: snow;
`;
