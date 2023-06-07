import React, { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import API from '../API'
import dayjs from 'dayjs';
import NextSession from './nextSession';
import { useNavigate } from "react-router-dom";
import Image from '../Assets/img.png';


function Home(props) {

  const [next, setNext] = useState();

  props.sessions.sort((a, b) => dayjs(`2000-01-01 ${a.startTime}`).diff(dayjs(`2000-01-01 ${b.startTime}`), 'seconds'));
  props.allSessions.sort((a, b) => dayjs(a.date + " " + `${a.startTime}`).diff(dayjs(b.date + " " + `${b.startTime}`), 'seconds'));

  useEffect(() => {
    const getSessions = async () => {
      try {
        const res = await API.getSessionsByUserIdAndDate(1, props.selDate);
        props.setSessions(res);
        const sesh = await API.getSessionsByUserId(1);
        props.setAllSessions(sesh);
      } catch (err) {
        toast.error("Server error.", { position: "bottom-center" }, { toastId: 4 });
      }
    };
    getSessions()
  }, [props.selDate])


  useEffect(() => {
    setNext(props.allSessions?.find((s) => (
      dayjs(props.selDate).isBefore(dayjs(s.date))
    )))
  }, [props.allSessions])


  const navigate = useNavigate();

  var topRight = {
    paddingLeft:'20px',
    height: '100px'

  };

  return (
    <>

     <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div> 

      <Container style={{ margin: 0, padding: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 110, backgroundColor: '#91A7B9', }} className='fixed-top'>
        <div style={{ paddingBottom: 10, paddingLeft: 0, color:'black'}} className='textPrimaryBig'>
          Sessions for
        </div>

        <div style={{ margin: 0, padding: 0, paddingBottom: 10 }}>

          <Form.Group >
            <Form.Control value={props.selDate} type="date" onChange={(event) => props.setSelDate(event.target.value)} />
          </Form.Group>

        </div>

      </Container>

      <Container style={{ margin: 0, padding: 0, paddingLeft: 20, paddingRight: 20, backgroundColor: '#547792', height: 100 }} className='fixed-top'>

        <Row>
          <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <h1 className='titleBig'>HOME</h1>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <img style={topRight} src={Image} alt="324" />
          </Col>
        </Row>

      </Container>


      <Container style={{  margin: 0, padding: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 210, paddingBottom: 70 }} >

        {props.sessions.length ?
          props.sessions.map((s) => (
            <>
              <PlanCard
                setSession={props.setSession}
                isSession={1}
                session={s}
                key={s.id}
                deleteSession={props.deleteSession}
                goToUpdateSession={props.goToUpdateSession}
              />
              <br />
            </>
          ))
          :
          <>
          {props.allSessions?.length!=0 ?
          <>
            <div style={{ margin: 0, padding: 0, textAlign: 'center', color:'black' }} className='textPrimaryBig'>No session for the selected date.</div>
            
            <br />
            <div style={{ margin: 0, padding: 0, textAlign: 'center', color:'black' }} className='textPrimaryBig'>Relax!  <i  className='bi bi-cup-hot'></i></div>
            <br />
            {
              next ?
                <>
                  <NextSession
                    session={next}
                    setSelDate={props.setSelDate}></NextSession>
                </>
                :
                
                <div style={{ margin: 0, padding: 0, textAlign: 'center', color:'black' }} className='textPrimaryBig'>No future sessions.</div>
                
            }
            </>
            :
            <></>
          }
          </>
        }

        {props.allSessions?.length ?
          <>

          </>
          :
          <>
          <div style={{ margin: 0, padding: 0, textAlign: 'center', color:'black' }} className='textPrimaryBig'>You have not yet created a session.</div>
            <br />
            <br />
            <div style={{ textAlign: 'center', justifyContent: 'center', color:'black' }}>
              <Button variant='dark' style={{ textAlign: 'center', justifyContent: 'center', color:'white' }} onClick={() => navigate('/newSession')}>Create your first session</Button>
            </div>
          </>
        }


      </Container>

    </>
  );
}



export default Home;