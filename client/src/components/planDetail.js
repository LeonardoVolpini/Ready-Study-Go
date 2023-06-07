import Card from 'react-bootstrap/Card';
import dayjs from 'dayjs'
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Button, Container, Col, Modal, ButtonGroup } from 'react-bootstrap';
import { ChevronLeft } from "react-bootstrap-icons";
import { ClickableOpacity } from "./clickableOpacity";
import API from '../API';
import { toast } from "react-toastify";
import React, { useState, useEffect } from 'react';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function PlanDetails(props) {

    const [show, setShow] = useState(false);
    const [plan, setPlan] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { Id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getPlanFromServer = async () => {
            try {
                const res = await API.getPlanById(Id);
                setPlan(res);
            } catch (err) {
                if (err == 404)
                    navigate("/home")
                else
                    toast.error("Server error", { position: "top-center" }, { toastId: 4 });
            }
        };
        if (Id) {
            getPlanFromServer()
        }
    }, [Id])

    useEffect(() => {
    }, [plan])

    return (
        <>
            <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
            <Modal className='modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this plan?</Modal.Body>

                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <ButtonGroup >

                        <Button style={{ color: 'black', width: 125 }} variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>

                        <Button style={{ width: 125 }} variant='outline-danger' onClick={() => { handleClose(); navigate(-1); props.deletePlan(Id) }}>
                            Delete
                        </Button>
                    </ButtonGroup>

                </Modal.Footer>

            </Modal>

            <Container style={{ margin: 0, padding: 0, height: 100, backgroundColor: '#547792', }} className='fixed-top'>
                <div style={{ margin: 0, padding: 0, textAlign: 'center', paddingTop: 15 }} className='textPrimaryBig2'>PLAN</div>

                <div style={{ margin: 0, padding: 0, textAlign: 'center' }} className='textPrimaryBig3'>
                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ paddingTop: 10 }}>
                            <ChevronLeft
                                color='black'
                                size={25}
                                onClick={() => {
                                    navigate(-1)
                                }}></ChevronLeft>
                        </Col>
                        <Col style={{ margin: 0, padding: 0, paddingTop: 10, textAlign: 'center' }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>DETAILS</Col>

                        <Col style={{ margin: 0, padding: 0, paddingTop: 5, paddingRight: 30, textAlign: 'center' }} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                            <ClickableOpacity style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }} onClick={() => props.goToUpdatePlan(plan)}>
                                <div>
                                    Edit
                                </div>
                            </ClickableOpacity>
                        </Col>

                    </Row>
                </div>

            </Container>



            <Container style={{ paddingTop: 120, paddingBottom: 120, paddingRight: 20, paddingLeft: 20 }}>

                <Card>
                    <Card.Body>
                        {plan?.name ?
                            <>
                                <Row>
                                    <div style={{ padding: 0, paddingLeft: 10, color: 'black' }} className='textPrimaryBig2'>{plan?.name}</div>
                                </Row>

                                <br />
                            </> : null
                        }

                        {plan?.date ?
                            <>
                                <Row>
                                    <div style={{ padding: 0, paddingLeft: 10, color: 'black' }} className='textPrimaryBig3'>
                                        {days[dayjs(plan.date).day()] + ", " + dayjs(plan.date).date() + " " + months[dayjs(plan.date).month()] + " " + dayjs(plan.date).year()}
                                    </div>

                                </Row>
                                <br />
                            </>
                            : null
                        }


                        {plan?.startTime ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"FROM: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.startTime}</span>
                                </Container>
                                <br />
                            </>

                            : null
                        }


                        {plan?.endTime ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"TO: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.endTime}</span>
                                </Container>
                                <br />
                            </>
                            : null
                        }



                        {plan?.studyDuration ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"STUDY DURATION: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.studyDuration + " minutes"}</span>
                                </Container>
                                <br />
                            </>
                            : null
                        }

                        {(plan?.breakDuration && plan.breakDuration != 0) ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"BREAK DURATION: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.breakDuration + " minutes"}</span>
                                </Container>
                                <br />
                            </>
                            : null
                        }

                        {plan?.appList ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"BLOCKED APPS: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.appList}</span>
                                </Container>
                                <br />
                            </>
                            : null
                        }

                        {plan?.notificationList ?
                            <>
                                <Container style={{ padding: 0, margin: 0 }}>
                                    <span className='textPrimaryBig4' style={{ padding: 0, margin: 0 }}>{"BLOCKED NOTIFICATIONS: "}</span>
                                    <span className='textPrimaryBig3' style={{ padding: 0, margin: 0, color: 'black' }}>{plan?.notificationList}</span>
                                </Container>
                                <br />
                            </>
                            : null
                        }


                    </Card.Body>
                </Card>

                <div className='fixed-bottom' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 70, backgroundColor: '#91A7B9' }}>
                    <ClickableOpacity onClick={handleShow} style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>
                        <div>
                            Delete
                        </div>
                    </ClickableOpacity>
                    {/* <Button style={{ width: 100 }} variant='outline-danger' onClick={handleShow}>Delete</Button> */}
                </div>
            </Container >

        </>
    );
}






export default PlanDetails;