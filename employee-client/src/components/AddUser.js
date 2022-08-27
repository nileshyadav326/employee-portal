import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import {namevalidation,emailValidation,agevalidation,currentDate} from '../utils/helper'


const AddUser = () => {
  const [value, setValue] = useState({});
  const { webfox } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    if(namevalidation.test(value?.name) && emailValidation.test(value?.email) && agevalidation.test(value?.age)) {
        webfox.addEmployee(value).then((response) => {
          if(response.data.success) {
            // Add Sucess message
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
    let key = e.target.name;
    setValue({
      ...value,
      [key] : e.target.value
    });
  }

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    let data = new FormData();
    data.append('uploaded_file', file);
    webfox.uploadPhoto(data).then((response) => {
      if(response.data.status == 'success') {
        let path = response.data.data.path;
        path = path.replace('public/', '')
        setValue({
          ...value,
          'photo' : path
        });
      }
    }).catch((error) => {
          console.log('error', error);
    });

  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input  className={value?.name ? namevalidation.test(value?.name) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="text" value={value.name} onChange={onChange} name="name" placeholder="Enter Name" maxlength="100" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input className={value?.email ? emailValidation.test(value?.email) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="email" value={value.email} onChange={onChange} name="email" placeholder="Enter Email" maxlength="100" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Age</Label>
        <Input className={value?.age ? agevalidation.test(value?.age) ? 'is-valid form-control' : 'is-invalid form-control' : '' } type="text" value={value.age} onChange={onChange} name="age" placeholder="Enter Age" maxlength="3" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>DOB</Label>
        <Input type="date" value={value.dob} onChange={onChange} name="dob" placeholder="Enter DOB" max={currentDate()}></Input>
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input type="textarea" value={value.address} onChange={onChange} name="address" placeholder="Enter Address"></Input>
      </FormGroup>
      <FormGroup>
        <Label for="photo">Photo</Label>
        <Input type="file" name="uploaded_file" id="photo" onChange={uploadPhoto}></Input>
      </FormGroup>
      {
        value?.photo ? <FormGroup><img alt='employeeimage'  src={`${process.env.REACT_APP_CDN_IMAGE_URL}/${value?.photo}`} /></FormGroup> : null
      }
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}

export default AddUser;
