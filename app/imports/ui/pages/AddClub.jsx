import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, DateField, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Clubs, ClubsSchema } from '../../api/clubs/Clubs';

const bridge = new SimpleSchema2Bridge(ClubsSchema);

const AddClub = () => {
  const submit = (data, formRef) => {
    Clubs.collection.insert(data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Club added successfully', 'success');
        formRef.reset();
      }
    });
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Add Club</h2>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <DateField name="approvedDate" inputType="date" />
                <DateField name="expirationDate" inputType="date" />
                <TextField name="clubType" />
                <TextField name="purpose" />
                <TextField name="clubManager" />
                <TextField name="contact" />
                <SubmitField value="Add Club" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClub;
