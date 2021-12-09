import { React, useEffect, useState } from "react";
import { Form, Input, Modal, Card, Col, Row } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Loading } from "./LoadingComponent";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    setUsers(await response.json());
  };
  useEffect(() => {
    getUsers();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []); //Dependency list to prevent infinite loop
  const showModal = (currentUser) => {
    setIsModalVisible(true);
    setFormValues({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      website: currentUser.website,
    });
  };

  const handleOk = (event) => {
    setIsModalVisible(false);
    // setFormValues({
    //   name: event.target.value,
    //   email: event.target.value,
    //   phone: event.target.value,
    //   website: event.target.value,
    // });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleDelete = (userId) => {
    const newUsers = [...users];
    const index = users.findIndex((user) => user.id === userId);
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };
  const likeColor = isLiked ? "red" : "gray";

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
            <EditOutlined key="edit" onClick={() => showModal(currentUser)} />,
            <DeleteFilled
              key="delete"
              onClick={() => handleDelete(currentUser.id)}
            />,
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
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Row>{usersList}</Row>
        <Modal
          title="Basic Modal"
          destroyOnClose="false" //Unmounts children on close
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
                  message: "Please input your username!",
                },
              ]}
            >
              <Input defaultValue={formValues.name}  />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              placeholder="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input defaultValue={formValues.email} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              placeholder="Phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input defaultValue={formValues.phone} />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              placeholder="Website"
              rules={[
                {
                  required: true,
                  message: "Please input your website!",
                },
              ]}
            >
              <Input defaultValue={formValues.website} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Main;
