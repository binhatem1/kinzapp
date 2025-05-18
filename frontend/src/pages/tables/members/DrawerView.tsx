import React from 'react';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import axios from 'axios';
import {
  Drawer,
  DrawerProps,
  Button
} from 'rsuite';


interface Values {
  name: string;
  progress: number;
  amount: number;
  rating: number;
  email: string;
}

const DrawerView = (props: DrawerProps) => {
  const [error, setError] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const { onClose, ...rest } = props;
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Formik
        initialValues={{
          name: '',
          progress: 0,
          amount: 0,
          rating: 0,
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setError(false);
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('progress', values.progress.toString());
          formData.append('amount', values.amount.toString());
          formData.append('rating', values.rating.toString());

          if (file) {
            formData.append('avatar', file);
          }

          axios.post('http://localhost:3001/student', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
              console.log(response.data);

            }).catch(error => {
              setError(true);
              console.error("There was an error!", error.status,error.response.data.message);
            })
        }}
      >

        <Form>
          <Drawer.Header>
            <Drawer.Title>Add a new member</Drawer.Title>
            <Drawer.Actions>
              <Button type='submit' appearance="primary">
                Confirm
              </Button>
              <Button onClick={onClose} appearance="subtle">
                Cancel
              </Button>
            </Drawer.Actions>
          </Drawer.Header>

          <Drawer.Body>
            <div className="pt-1 pb-4">
              <div
                className="invalid-feedback"
                style={{ display: error ? 'block' : 'none' }}
              >
                An internal error occurred. Please try again later.
              </div>
              <div className="pt-3 pb-3">
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  autoComplete="name"
                  className="form-control"
                />
              </div>

              <div className="pt-3 pb-3 ">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="pt-3 pb-3">
                <label htmlFor="username">Skill</label>

                <Field
                  id="progress"
                  name="progress"
                  type="number"
                  className="form-control"
                />
                <progress value={.5} style={{ width: "100%", height: "22px" }}></progress>
              </div>


              <div className="input-group pt-3 pb-3">
                <span className="input-group-text">$</span>
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  className="form-control"
                />
                <span className="input-group-text">.00</span>
              </div>

              <div className="input-group mb-3">
                <input type="file" className="form-control" id="avatar" name="avatar"
                  onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                />
                <label className="input-group-text" htmlFor="avatar">Upload</label>
              </div>

            </div>

          </Drawer.Body>
        </Form>

      </Formik>



    </Drawer >
  );
};

export default DrawerView;
