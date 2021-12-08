import { React, useEffect, useState } from "react";
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

const RenderCardDescription = (email,phone,website) => {
  return (
    <Row>
      <Col span={24}>
        <p>
          <MailOutlined style={{ fontSize: 18 }} /> {email}{" "}
        </p>
      </Col>
      <Col span={24}>
        <p>
          <PhoneOutlined style={{ fontSize: 18 }} /> {phone}
        </p>
      </Col>
      <Col span={24}>
        <p>
          <GlobalOutlined style={{ fontSize: 18 }} /> {website}{" "}
        </p>
      </Col>
    </Row>
  );
};


function Main() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    setUsers(await response.json());
  };
  useEffect(() => {
    getUsers();
  }, []); //Dependency list to prevent infinite loop

  
  return (
    <>
      <Row>
        {users.map((currentUser) => {
          const pfpURL = `https://avatars.dicebear.com/v2/avataaars/${currentUser.username}.svg?options[mood][]=happy`
          return (
            <>
              <Col lg={8} md={8} sm={24} xl={6} xs={24} span={6}>
                <Card
                  style={{ margin: 15 }}
                  cover={
                    <img
                      alt={currentUser.name}
                      src={pfpURL}
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
                  <Meta
                    title={currentUser.name}
                    description={RenderCardDescription(currentUser.email,currentUser.phone,currentUser.website)}
                  />
                </Card>
              </Col>
            </>
          );
        })}
        {/* --------------------------------------------------- */}
      </Row>
    </>
  );
}

export default Main;
