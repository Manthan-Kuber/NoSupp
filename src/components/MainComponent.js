import { React, useEffect, useState } from "react";
import { Row } from "antd";
import { Loading } from "./LoadingComponent";
import CardComponent from "./CardComponent";

function Main() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = (userId) => {
    const newUsers = [...users];
    const index = users.findIndex((user) => user.id === userId);
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleEdit = (userId, newUser) => {
    console.log(userId, newUser);
    const newUsers = users.map((user) => {
      if (userId === user.id) {
        user.name = newUser.name;
        user.email = newUser.email;
        user.phone = newUser.phone;
        user.website = newUser.website;
        return user;
      } else {
        return user;
      }
    });
    console.log(newUsers);
    setUsers(newUsers);
  };

  const usersList = users.map((currentUser) => {
    return (
      <CardComponent
        currentUser={currentUser}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    );
  });
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Row>{usersList}</Row>
      </>
    );
  }
}

export default Main;
