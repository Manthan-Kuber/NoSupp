import { React, useState } from "react";
import { Form, Input, Modal, Card, Col, Row } from "antd";
import {
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

export default function CardComponent({ currentUser,handleDelete,handleEdit }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });
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
    handleEdit(currentUser.id,formValues)
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
  const likeColor = isLiked ? "red" : "gray";
  
  return (
    <>
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
            <Input defaultValue={formValues.name} onChange={(event) => setFormValues({
                ...formValues,name:event.target.value
            })} />
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
            <Input defaultValue={formValues.email} onChange={(event) => setFormValues({
                ...formValues,email:event.target.value
            })} />
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
            <Input defaultValue={formValues.phone} onChange={(event) => setFormValues({
                ...formValues,phone:event.target.value
            })}  />
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
            <Input defaultValue={formValues.website} onChange={(event) => setFormValues({
                ...formValues,website:event.target.value
            })} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
