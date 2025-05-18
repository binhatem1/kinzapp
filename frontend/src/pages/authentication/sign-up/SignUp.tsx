import React from 'react';

import { Button, Panel, InputGroup, Stack, Checkbox, Divider, Modal, Message } from 'rsuite';
import { Form, Formik, FormikHelpers, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Link } from 'react-router-dom';
import Brand from '@/components/Brand';



const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

interface Values {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [visible, setVisible] = React.useState(false);
  const [invalidPassword, setPasswordInvalid] = React.useState(false);
  const [invalidConfirm, setConfirmInvalid] = React.useState(false);
  const [invalidRegex, setRegexInvalid] = React.useState(false);
  const [invalidUsername, setUsernameInvalid] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);

  const navigate = useNavigate();

  return (




    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >

      <Brand style={{ marginBottom: 10 }} />
      <Panel
        header={<h3>Create an Account</h3>}
        bordered
        style={{ background: '#fff', width: 400 }}
      >
        <p>
          <span>Already have an account?</span> <Link to="/sign-in">Sign in here</Link>
        </p>

        <Divider>OR</Divider>

        {/* <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <InputGroup inside style={{ width: '100%' }}>
              <Form.Control
                name="password"
                type={visible ? 'text' : 'password'}
                autoComplete="off"
              />
              <InputGroup.Button onClick={() => setVisible(!visible)}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
            <Form.Control name="confirm-password" type="password" />
          </Form.Group>

          <Form.Group>
            <Stack spacing={6}>
              <Button appearance="primary">Submit</Button>
            </Stack>
          </Form.Group>
        </Form> */}

        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            console.log(values);
            setUsernameInvalid(false);
            setError(false);

            if (values.password !== values.confirmPassword) {
              setPasswordInvalid(true);
              setConfirmInvalid(true);
            } else {
              setPasswordInvalid(false);
              setConfirmInvalid(false);
            }

            if (!regex.test(values.password)) {
              setPasswordInvalid(true);
              setRegexInvalid(true);
              return;
            } else {
              setPasswordInvalid(false);
              setRegexInvalid(false);
            }
            if (values.password === values.confirmPassword && regex.test(values.password)) {

              axios.post('http://localhost:3001/addUser', values)
                .then(response => {
                  console.log(response.data);
                  setRegistered(true);
                  setTimeout(() => {
                    navigate('/sign-in');
                  }, 5000);
                }).catch(error => {
                  console.error('There was an error!', error);
                  if (error.response.status === 409) {
                    setUsernameInvalid(true);
                  } else {
                    setError(true);
                  }
                })
            }

          }}
        >

          <Form>



            <div className="pt-1 pb-4">
              <div
                className="invalid-feedback"
                style={{ display: error ? 'block' : 'none' }}
              >
                An internal error occurred. Please try again later.
              </div>
              <div className="pt-3 pb-3">
                <label htmlFor="username">Username</label>
                <Field
                  id="username"
                  name="username"
                  autoComplete="username"
                  className={`form-control ${invalidUsername ? 'is-invalid' : ''}`}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: invalidUsername ? 'block' : 'none' }}
                >
                  Username already exists
                </div>
              </div>

              <div className="pt-3 pb-3 ">
                <label htmlFor="password">Password</label>
                <div className="position-relative d-flex">
                  <Field
                    id="password"
                    name="password"
                    type={visible ? 'text' : 'password'}
                    className="form-control"
                    autoComplete="current-password"
                  />
                  <Button className='z-4 position-absolute bg-transparent' style={{ 'right': '3px', 'top': '4px' }} onClick={() => setVisible(!visible)}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                  </Button>
                </div>
              </div>

              <div className="pt-3 pb-3">
                <label htmlFor="username">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type='password'
                  autoComplete="off"
                  className={`form-control ${invalidPassword ? 'is-invalid' : ''}`}

                />
                <div
                  className="invalid-feedback"
                  style={{ display: invalidConfirm ? 'block' : 'none' }}
                >
                  Passwords do not match
                </div>
                <div
                  className="invalid-feedback"
                  style={{ display: invalidRegex ? 'block' : 'none' }}
                >
                  Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number
                </div>
              </div>

            </div>


            <Button appearance="primary" type='submit'>Register</Button>

          </Form>

        </Formik>


      </Panel>


      <Modal open={registered}>
        <Modal.Header>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Message type="success" showIcon header="Application has been accepted !" className='text-center'>
            <p>
              You have successfully registered. You will be redirected to the sign-in page in 3 seconds.
            </p>
            <p>
              If you are not redirected, please click <Link to="/sign-in">here</Link>.
            </p>
          </Message>
        </Modal.Body>

      </Modal>
    </Stack>
  );
};

export default Register;
