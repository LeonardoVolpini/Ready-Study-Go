import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { Row, Button, Form, InputGroup, Container, Col } from 'react-bootstrap';
import { ChevronLeft } from "react-bootstrap-icons";
import { ClickableOpacity } from "./clickableOpacity";


function UpdateSongCard(props) {

  const [song, setSong] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const submitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      props.updateSong(song);
      navigate("/settings");
    }
    setValidated(true);
  }

  return (
    <>
      <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
      <Form noValidate validated={validated} id='sessionForm' onSubmit={submitForm} style={{ fontSize: 15, fontWeight: 'bold', margin: 0, padding: 0, }}>
        <Container style={{  margin: 0, padding: 0, height: 110, backgroundColor: '#547792', }} className='fixed-top'>
          <div style={{ margin: 0, padding: 0, textAlign: 'center', paddingTop: 20 }} className='textPrimaryBig2'>UPDATE SONG</div>
          <div style={{ margin: 0, padding: 0, textAlign: 'center' }} className='textPrimaryBig3'>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ paddingTop: 10 }}>
                <ChevronLeft
                color='black'
                  size={25}
                  onClick={() => {
                    navigate(-1);
                  }}></ChevronLeft>
              </Col>
              <Col style={{ margin: 0, padding: 0, paddingTop: 10, textAlign: 'center' }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>YOUR FAVORITE SONG</Col>

              <Col style={{ margin: 0, padding: 0, paddingTop: 5, paddingRight: 30, textAlign: 'center' }} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <ClickableOpacity style={{ fontSize: 20, color:'black', fontWeight:'bold' }} type='submit'>
                  <div>
                    Save
                  </div>
                </ClickableOpacity>
              </Col>
            </Row>
          </div>
        </Container>

        <Container style={{ paddingTop: 130, paddingLeft: 20, paddingRight: 20, paddingBottom: 70 }}>
          <Card className='Light'>
            <Card.Body>
              <Row>
                <Form.Group>
                  <Form.Label>Song</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-music-note-beamed"></i></InputGroup.Text>
                    <Form.Control
                      placeholder='insert the title of the song'
                      value={song}
                      required={true}
                      onChange={(ev) => setSong(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please insert a valid song.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Form>
    </>
  );
}

function SongForm(props) {
  const [song, setSong] = useState("");

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    props.updateSong(song);
    // chiamo API per salvare
    // feedback di sessione salvata
    navigate("/settings");
  }


  return (
    <>
      <Form id='songForm' onSubmit={submitForm} style={{ fontSize: 15, fontWeight: 'bold' }}>
        <Row>
          <Form.Group>
            <Form.Label>Song</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text><i className="bi bi-music-note-beamed"></i></InputGroup.Text>
              <Form.Control
                placeholder='insert the title of the song'
                value={song}
                required={true}
                onChange={(ev) => setSong(ev.target.value)} />
            </InputGroup>
          </Form.Group>
          <div className='fixed-bottom' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 70, backgroundColor: 'white' }}>
            <Button style={{ width: 100 }} variant='outline-success' type='submit' className='ms-2 my-2'>Save</Button>
          </div>
        </Row>

      </Form>
    </>
  )
}

export default UpdateSongCard;