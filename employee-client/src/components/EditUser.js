import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import {namevalidation,emailValidation,agevalidation, currentDate} from '../utils/helper'


export const EditUser = (props) => {
  const { users, webfox } = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState({})
  const history = useHistory();
  const currentUserId = props.match.params.id;

  useEffect(() => {
    const userId = currentUserId;
    const selectedUser = users.find(user => user.id == userId);

    if(selectedUser) {
     setSelectedUser(selectedUser);
    }else {
      history.push("/");
    }
  }, [currentUserId, users])

  

  const onSubmit = (e) => {
    e.preventDefault();

    if(namevalidation.test(selectedUser?.name) && emailValidation.test(selectedUser?.email) && agevalidation.test(selectedUser?.age)) {

      webfox.updateEmployee(selectedUser).then((response) => {
        if(response.data.success) {
          history.push("/");
        }
      }).catch((error) => {
            console.log('error', error);
      });

    }else {
      console.log('show error message');
    }
    
  }

  const onChange = (e) => {
   
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value })
  }

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    let data = new FormData();
    data.append('uploaded_file', file);
    webfox.uploadPhoto(data).then((response) => {
      if(response.data.status == 'success') {
        let path = response.data.data.path;
        path = path.replace('public/', '')
        setSelectedUser({
          ...selectedUser,
          'photo' : path
        });
      }
    }).catch((error) => {
          console.log('error', error);
    });

  }

  return (
    selectedUser?
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input  className={selectedUser?.name  ? namevalidation.test(selectedUser?.name) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="text" value={selectedUser.name} onChange={onChange} name="name" placeholder="Enter Name" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input className={selectedUser?.email  ? emailValidation.test(selectedUser?.email) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="email" value={selectedUser.email} onChange={onChange} name="email" placeholder="Enter Email" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Age</Label>
        <Input className={selectedUser?.age ? agevalidation.test(selectedUser?.age) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="text" value={selectedUser.age} onChange={onChange} name="age" placeholder="Enter Age" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>DOB</Label>
        <Input type="date" value={selectedUser.dob} onChange={onChange} name="dob" placeholder="Enter DOB" max={currentDate()}></Input>
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input type="textarea" value={selectedUser.address} onChange={onChange} name="address" placeholder="Enter Address"></Input>
      </FormGroup>
      <FormGroup>
        <Label for="photo">Photo</Label>
        <Input type="file" name="uploaded_file" id="photo" onChange={uploadPhoto}></Input>
      </FormGroup>
      {
        selectedUser?.photo ? <FormGroup><img alt='employeeimage'  src={`${process.env.REACT_APP_CDN_IMAGE_URL}/${selectedUser?.photo}`} /></FormGroup> : null
      }
      
      <Button type="submit">Update</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
    : null
  )
}
