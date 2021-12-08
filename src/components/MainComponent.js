import { React, Component } from "react";
import { Card, Col, Row } from "antd";
import {
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

function Main() {
  
  return (
    <>
      <Row>
          <Col className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-8 ant-col-lg-8 ant-col-xl-6" span={6}>
            <Card
              style={{ margin: 15 }}
              cover={
                <img
                  alt="Glenna Richert"
                  src="https://avatars.dicebear.com/v2/avataaars/Delphine.svg?options[mood][]=happy"
                  style={{
                    background: "#ececec",
                    width: "100%",
                    height: "200px",
                  }}
                />
              }
              actions={[
                <HeartOutlined style={{ color: "#eb2f96" }} />,
                <EditOutlined key="edit" />,
                <DeleteFilled key="delete" />,
              ]}
            >
              <Meta title="Glenna Richert"  />
              <div className='additional'>
                <MailOutlined />
                <PhoneOutlined />
                <GlobalOutlined/>
              </div>
            </Card>
          </Col>
        {/* --------------------------------------------------- */}
      </Row>
    </>
  );
}

export default Main;

<img alt="Avatar" style="width: 200px; height: 200px;"></img>;
