import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profiles/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  contactEmail: String,
  firstName: String,
  lastName: String,
  bio: String,
  title: String,
  // picture: { type: String, optional: true },
  interest: {
    type: String,
    allowedValues: ['Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'],
    defaultValue: 'Academic/Professional',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CreateProfile = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { contactEmail, firstName, lastName, bio, title, interest } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert(
      { contactEmail, firstName, lastName, bio, title, interest, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile created successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  // <Col><TextField name="picture" /></Col> MIGHT NOT USE
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Create your profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="contactEmail" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="title" /></Col>
                  <Col><SelectField name="interest" /></Col>
                </Row>
                <LongTextField name="bio" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProfile;
