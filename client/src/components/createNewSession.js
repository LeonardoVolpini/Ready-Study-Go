import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NewSession(props) {
  const navigate = useNavigate();

  function goToStartSession1() {
    navigate('/startSessionTask1');
  }

  function goToStartSession2() {
    navigate('/startSessionTask2');
  }

  function goToStartSession3() {
    navigate('/startSessionTask3');
  }

  return (
    <>
     <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div> 
      <Container style={{  margin: 0, padding: 0, height:100, backgroundColor: '#547792'}} className='fixed-top'>
        <div style={{ margin: 0, padding: 0, paddingTop: 15, textAlign: 'center' }} className='textPrimaryBig2'>CREATE A SESSION</div>
        <div style={{ margin: 0, padding: 0, textAlign: 'center',  paddingTop: 10 }} className='textPrimaryBig3'>CHOOSE YOUR FAVORITE MODALITY</div>
      </Container>
      <Container style={{ margin: 0, padding: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 120, paddingBottom:70 }}>
        <CardTask1 goToStartSession1={goToStartSession1}/>
        <br />
        <CardTask2 goToStartSession2={goToStartSession2}/>
        <br />
        <CardTask3 goToStartSession3={goToStartSession3}/>
      </Container>
    </>
  );
}

function CardTask1(props) {
  return (
    <div onClick={props.goToStartSession1}>
      <Card>
        <Card.Body >  {/* #FFFF3F #CCFF33*/}
          <Card.Title >START AND END TIME</Card.Title>
          <hr />
          <Card.Text>
            Modality adviced if you only need to set <strong>start</strong> and <strong>end time</strong> and you are able to manage your breaks.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function CardTask2(props) {
  return (
    <div onClick={props.goToStartSession2}>
      <Card>
        <Card.Body >
          <Card.Title >EXISTING PLAN</Card.Title>
          <hr />
          <Card.Text>
            Modality adviced if you want a <strong>predefined plan</strong> which <strong>alternates study and break sessions</strong> advising you <strong>it’s time to start or to break.</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function CardTask3(props) {
  return (
    <div onClick={props.goToStartSession3}>
      <Card >
        <Card.Body >
          <Card.Title>CUSTOM SESSION</Card.Title>
          <hr />
          <Card.Text>
            Modality adviced if you need a <strong>customized plan</strong> that follows your needs. You can <strong>include study and break sessions</strong> and <strong>block the apps</strong> you want during your study session. <strong>You can also save the plan.</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NewSession;