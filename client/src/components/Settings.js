import React from 'react';
import { Button, Container, Row, Form, InputGroup, } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";


function Settings(props) {

  const navigate = useNavigate();

  return (
    <>
      <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
        <Container className='fixed-top' style={{ backgroundColor: 'white', margin: 0, padding: 0, height: 100, justifyContent: 'center', textAlign: 'center', backgroundColor: '#547792', }} >
          <h1 style={{ textAlign: 'center' }} className='titleBig'>
            SETTINGS
          </h1>
        </Container>
        <Container style={{ margin: 0, padding: 0, paddingBottom: 120 , paddingTop:120}} >
        <div className="textSettings">
          Your Name
        </div>
        <div style={{ paddingBottom: 10, color: 'white' }} className='textPrimaryBig2'>
          {props.user.name + " " + props.user.surname}
        </div>
        <br />
        <div className="textSettings">
          Your email
        </div>
        <div style={{ paddingBottom: 10 }} className='textPrimaryBig'>
          {props.user.email}
        </div>
        <br />
        <div className="textSettings">
          Your favorite song
        </div>

        <Form.Group style={{ paddingRight: 20, paddingLeft: 20 }}>
          <InputGroup className="mt-2 mb-2">
            <InputGroup.Text><i className="bi bi-music-note-beamed"></i></InputGroup.Text>
            <Form.Control
              placeholder='Select your favourite song!'
              type='text'
              value={props.user.song ? props.user.song : undefined}
              readOnly={true}
              onClick={props.goToUpdateSong}
            />
            <Button variant="dark" className="bi bi-pencil" onClick={props.goToUpdateSong}></Button>

          </InputGroup>
          <Form.Text style={{ color: 'black' }} className='textPrimary'> You will have the opportunity to listen to this song before starting to study.</Form.Text>
        </Form.Group>

        <br />

        <div  style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 70, backgroundColor: '#91A7B9' }}>
          <Button variant="dark" onClick={()=>navigate('/listPlans')}>Available Plans</Button>
        </div>

        <div className='fixed-bottom' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 70, backgroundColor: '#91A7B9' }}>
        <ClickableOpacity  style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                        <div>
                            Logout
                        </div>
                    </ClickableOpacity>
        </div>
      </Container>
    </>
  );
}

export default Settings;
