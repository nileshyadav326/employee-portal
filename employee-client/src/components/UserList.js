import React, { useEffect, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

export const UserList = () => {
  const { webfox, userList, users, removeUser } = useContext(GlobalContext);

  useEffect(()=> {
    webfox.listEmployee().then((response) => {
      console.log(response.data.data)
      userList(response.data.data);
      }).catch((error) => {
          console.log('error', error);
      });
  },[])

  const deleteEmployee = (userId) => {
    let userData = {
      "id" : userId
    };
    webfox.deleteEmployee(userData).then((response) => {
        if(response.data.success) {
          removeUser(userId);
        }
      }).catch((error) => {
          console.log('error', error);
      });
  }

  return (
    <ListGroup className="mt-4">
      {users && users.length > 0 ? (
        <>
          <ListGroupItem className="d-flex">
              <div className="text-center font-weight-bold">Employee Name</div>
              <div className="ml-auto text-center font-weight-bold">Age</div>
              <div className="ml-auto text-center font-weight-bold">DOB</div>
              <div className="ml-auto text-center font-weight-bold">
                  Actions
              </div>
            </ListGroupItem>
          {users.map(user => (
            <ListGroupItem className="d-flex" key={user.id}>
              <div className="text-center">{user.name}</div>
              <div className="ml-auto text-center">{user.age}</div>
              <div className="ml-auto text-center">{user.dob}</div>
              <div className="ml-auto text-center">
                <Link to={`/edit/${user.id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                <Button onClick={() => deleteEmployee(user.id)} color="danger">Delete</Button>
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
          <h4 className="text-center">No Users</h4>
        )}
    </ListGroup>
  )
}
