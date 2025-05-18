import React from 'react';
import { Button, Panel, IconButton, Stack, Divider, Input } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import GithubIcon from '@rsuite/icons/legacy/Github';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import Brand from '@/components/Brand';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import axios from 'axios';
import { log } from 'console';


interface Values {
  username: string;
  password: string;
}


const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);

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

      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">New Here? </span>{' '}
          <Link to="/sign-up"> Create an Account</Link>
        </p>


        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setError(false);
            setInvalid(false);
            axios.post('http://localhost:3001/login', values)
              .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                navigate('/dashboard');
              }).catch(error => {
                if (error.status === 401) {
                setInvalid(true);
                }
                else {
                  setError(true);
                }
                console.error('There was an error!', error);
              })
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
                  className="form-control"
                />
              </div>

              <div className="pt-3 pb-3">
                <label htmlFor="password">Password</label>
                <a style={{ float: 'right' }}>Forgot password?</a>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                />
              </div>
              <div
                className="invalid-feedback"
                style={{ display: invalid ? 'block' : 'none' }}
              >
                Invalid username or password. Please try again.
              </div>
            </div>

            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" type="submit">Sign in</Button>
              <Stack spacing={6}>
                <IconButton icon={<WechatIcon />} appearance="subtle" />
                <IconButton icon={<GithubIcon />} appearance="subtle" />
                <IconButton icon={<FacebookIcon />} appearance="subtle" />
                <IconButton icon={<GoogleIcon />} appearance="subtle" />
              </Stack>
            </Stack>

          </Form>

        </Formik>


      </Panel>
    </Stack>
  );
};

export default SignIn;
