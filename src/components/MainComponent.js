import { React, useEffect, useState } from "react";
import { Form,Input,Modal, Card, Col, Row } from "antd";
import {
  HeartTwoTone,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
const { Meta } = Card;

const RenderCardDescription = (email, phone, website) => {
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
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    setUsers(await response.json());
  };
  useEffect(() => {
    getUsers();
  }, []); //Dependency list to prevent infinite loop
  const likeColor = isLiked ? "red" : "gray";
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const usersList = users.map((currentUser) => {
    return (
      <Col key={currentUser.id} lg={8} md={8} sm={24} xl={6} xs={24} span={6}>
        <Card
          style={{ margin: 15 }}
          cover={
            <img
              alt={currentUser.name}
              src={`https://avatars.dicebear.com/v2/avataaars/${currentUser.username}.svg?options[mood][]=happy`}
              style={{
                background: "#ececec",
                width: "100%",
                height: "200px",
              }}
            />
          }
          actions={[
            <HeartFilled
              key="heart"
              onClick={() => setIsLiked(!isLiked)}
              style={{ color: likeColor }}
            />,
            <EditOutlined key="edit" onClick={showModal} />,
            <DeleteFilled key="delete" />,
          ]}
        >
          <Meta
            title={currentUser.name}
            description={RenderCardDescription(
              currentUser.email,
              currentUser.phone,
              currentUser.website
            )}
          />
        </Card>
      </Col>
    );
  });
  return (
    <>
      <Row>{usersList}</Row>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        placeholder="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
}

export default Main;
