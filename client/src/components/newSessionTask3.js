import Card from 'react-bootstrap/Card';
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Button, Form, InputGroup, Container, Col } from 'react-bootstrap';
import API from '../API'
import { toast } from "react-toastify";
import { ChevronLeft } from "react-bootstrap-icons";
import { ClickableOpacity } from "./clickableOpacity";



function NewSessionTask3(props) {

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  function goToManageApps() {
    navigate('/manageApps');
  }

  function checkDurations() {
    const start = dayjs(`2000-01-01 ${props.startTime}`);
    const end = dayjs(`2000-01-01 ${props.endTime}`);
    const mins = end.diff(start, "minutes", true);
    const base = dayjs(`2000-01-01 ${"00:00"}`);
    const breakTime = dayjs(`2000-01-01 ${props.breakDuration}`);
    const studyTime = dayjs(`2000-01-01 ${props.studyDuration}`);
    const minsBreak = breakTime.diff(base, "minutes", true);
    const minsStudy = studyTime.diff(base, "minutes", true);

    return mins >= minsBreak + minsStudy;
  }

  useEffect(() => {
    if (props.dirty === false) {
      props.setStartTime(dayjs().format('HH:mm'))
      props.setEndTime(dayjs().format('HH:mm'))
    }
  }, [])

  const { Id } = useParams();

  useEffect(() => {
    const getSessionFromServer = async () => {
      try {
        const res = await API.getSessionById(Id);
        props.setId(res.id)
        props.setUpdate(true)
        props.setPlanId(res.taskId == 3 ? res.planId : undefined)
        props.setName(res.name)
        props.setDate(res.date)
        props.setStartTime(res.startTime)
        props.setEndTime(res.endTime)
        props.setSave(res.planId && res.taskId==3 ? true : false)
        props.setScelte(props.getScelte(res))
        props.setStudyDuration(props.getHours(res.studyDuration))
        props.setBreakDuration(props.getHours(res.breakDuration))
        props.setDirty(true)
      } catch (err) {
        if (err == 404)
          navigate("/home")
        else{
          toast.error("Server error", { position: "top-center" }, { toastId: 4 });
        }
      }
    }
    if (Id && !props.update) {
      getSessionFromServer()
    }
  }, [Id])


  const submitForm = (event) => {
    if (!checkDurations()) {
      event.preventDefault();
      toast.error("Study duration and Breaks cannot exceed the time selected", { position: "bottom-center" }, { toastId: 24 });
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      sendForm();
    }
    setValidated(true);
  }

  const sendForm = async () => {
    const base = dayjs(`2000-01-01 ${"00:00"}`);
    const breakTime = dayjs(`2000-01-01 ${props.breakDuration}`);
    const studyTime = dayjs(`2000-01-01 ${props.studyDuration}`);
    const minsBreak = breakTime.diff(base, "minutes", true);
    const minsStudy = studyTime.diff(base, "minutes", true);

    let list = [];
    let apps = false;
    let notifications = false;
    let planId;

    for (const property in props.scelte) {
      if (props.scelte[property] && property !== "apps" && property !== "notifications" && property !== "allApps") {
        list.push(property);
      } if (props.scelte[property] && property === "apps") {
        apps = true;
      } if (props.scelte[property] && property === "notifications") {
        notifications = true;
      }
    }

    if (props.save) {
      let newPlan = {
        id: props.planId ? props.planId : undefined,
        name: props.name,
        breakDuration: minsBreak,
        studyDuration: minsStudy,
        appList: apps ? list.join(", ") : undefined,
        notificationList: notifications ? list.join(", ") : undefined,
        userId: 1
      };



      try {
        if (props.update == true && props.planId) {
          planId = await API.updatePlan(newPlan)
          toast.success(
            "Plan updated succesfully!",
            { position: "bottom-center" },
            { toastId: 2 }
          );
        } else {
          planId = await API.createPlan(newPlan);
          toast.success(
            "Plan created succesfully!",
            { position: "bottom-center" },
            { toastId: 3 }
          );
        }
      } catch (error) {
        toast.error(error.error, { position: "bottom-center" }, { toastId: 24 });
      }

    }

    let newSession = {
      id: props.id ? props.id : undefined,
      name: props.name,
      date: props.date,
      startTime: props.startTime,
      endTime: props.endTime,
      breakDuration: minsBreak,
      studyDuration: minsStudy,
      userId: 1,
      planId: props.save ? planId : undefined,
      taskId: 3,
      appList: apps ? list.join(", ") : undefined,
      notificationList: notifications ? list.join(", ") : undefined,
    };



    try {
      if (props.update == true) {
        await API.updateSession(newSession);
        toast.success(
          "Session updated succesfully!",
          { position: "bottom-center" },
          { toastId: 9 }
        );
      }
      else {
        await API.createSession(newSession);
        toast.success(
          "Session created succesfully!",
          { position: "bottom-center" },
          { toastId: 10 }
        );
      }
      navigate('/home')
      props.cleanSession()
    } catch (error) {
      toast.error(error.error, { position: "bottom-center" }, { toastId: 23 });
    }

  };

  return (
    <>
          <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
      <Form noValidate validated={validated} id='sessionForm' onSubmit={submitForm} style={{ fontSize: 15, fontWeight: 'bold', margin: 0, padding: 0, }}>
        <Container style={{ margin: 0, padding: 0, height:100, backgroundColor: '#547792', }} className='fixed-top'>
          <div style={{ margin: 0, padding: 0, textAlign: 'center', paddingTop: 15 }} className='textPrimaryBig2'>{props.update ? "UPDATE " : ""}YOUR SESSION</div>

          <div style={{ margin: 0, padding: 0, textAlign: 'center' }} className='textPrimaryBig3'>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ paddingTop: 10 }}>
                <ChevronLeft
                color='black'
                  size={25}
                  onClick={() => {
                    props.cleanSession();
                    {
                      props.update ?
                        navigate(-1)
                        :
                        navigate('/newSession')
                    }
                  }}></ChevronLeft>
              </Col>
              <Col style={{ margin: 0, padding: 0, paddingTop: 10, textAlign: 'center' }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>CUSTOM SESSION</Col>

              <Col style={{ margin: 0, padding: 0, paddingTop: 5, paddingRight: 30, textAlign: 'center' }} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <ClickableOpacity style={{fontSize:20, color:'black', fontWeight:'bold'}} type='submit'>
                  <div>
                    Save
                  </div>
                </ClickableOpacity>
                {/* <Button
                  variant="link"
                  type='submit'
                >Save</Button> */}
              </Col>
            </Row>
          </div>

        </Container>



        <Container style={{ paddingTop: 120, paddingBottom: 70, paddingRight: 20, paddingLeft: 20 }}>

          <Card>
            <Card.Body>

              <Row>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-textarea-t"></i></InputGroup.Text>
                    <Form.Control
                      placeholder='name of the subject. Ex: English'
                      value={props.name}
                      required={true}
                      onChange={(ev) => props.setName(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please insert a valid name.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <br />

              <Row>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-calendar-date"></i></InputGroup.Text>
                    <Form.Control
                      type='date'
                      value={props.date}
                      required={true}
                      onChange={(ev) => props.setDate(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please insert a valid date.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <br />



              <Row>
                <Form.Group>
                  <Form.Label>Start</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-stopwatch"></i></InputGroup.Text>
                    <Form.Control
                      // placeholder='starting time in format hh:mm'
                      type='time'
                      value={props.startTime}
                      required={true}
                      onChange={(ev) => {
                        props.setStartTime(ev.target.value);
                        props.setDirty(true)
                      }} />
                    <Form.Control.Feedback type="invalid">Please insert a valid start time.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <br />

              <Row>
                <Form.Group>
                  <Form.Label>End</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-stopwatch"></i></InputGroup.Text>
                    <Form.Control
                      // placeholder='ending time in format hh:mm'
                      type='time'
                      value={props.endTime}
                      required={true}
                      min={props.startTime ? props.startTime : undefined}
                      onChange={(ev) => {
                        props.setEndTime(ev.target.value);
                        props.setDirty(true)
                      }} />
                    <Form.Control.Feedback type="invalid">Please insert a valid end time.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <br />

              <Row>
                <Form.Group>
                  <Form.Label>Study duration</Form.Label>
                  <InputGroup className='mb-2' hasValidation>
                    <InputGroup.Text><i className="bi bi-book"></i></InputGroup.Text>
                    <Form.Control
                      // placeholder='ending time in format hh:mm'
                      type='time'
                      value={props.studyDuration}
                      //max={props.endTime-props.startTime}
                      required={true}
                      onChange={(ev) => props.setStudyDuration(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please insert a valid study duration.</Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className='textPrimary'>Duration of the study sprint before the break.</Form.Text>
                </Form.Group>
              </Row>

              <br />

              <Row>
                <Form.Group>
                  <Form.Label>Break duration</Form.Label>
                  <InputGroup className='mb-2' hasValidation>
                    <InputGroup.Text><i className="bi bi-sign-stop"></i></InputGroup.Text>
                    <Form.Control
                      // placeholder='ending time in format hh:mm'
                      type='time'
                      value={props.breakDuration}
                      required={true}
                      onChange={(ev) => props.setBreakDuration(ev.target.value)} />
                    <Form.Control.Feedback type="invalid">Please insert a valid break duration.</Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className='textPrimary'>Duration of the break between two study sprint.</Form.Text>
                </Form.Group>
              </Row>

              <br />

              <Row>
                <Form.Group>
                  <InputGroup hasValidation>
                    <Form.Check style={{ paddingRight: 10 }} checked={props.save} value={props.save} onChange={(ev) => props.setSave(!props.save)} />
                    <Form.Label>Save your plan</Form.Label>
                  </InputGroup>
                  <Form.Text className='textPrimary'>If you save the plan you can find it later in the available ones.</Form.Text>
                </Form.Group>
              </Row>

              <br />

              <div style={{ textAlign: 'center' }}>
                <Button variant='dark' className='mt-y' onClick={goToManageApps}>Manage your apps</Button>
              </div>


            </Card.Body>
          </Card>

        </Container >
      </Form>
    </>
  );
}




export default NewSessionTask3;