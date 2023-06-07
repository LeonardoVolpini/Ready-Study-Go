import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { Row, Form, InputGroup, Container, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import { ChevronLeft } from "react-bootstrap-icons";
import { ClickableOpacity } from "./clickableOpacity";



function ManageApps(props) {

  const [allApps, setAllApps] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [tiktok, setTiktok] = useState(false);
  const [telegram, setTelegram] = useState(false);

  const [apps, setApps] = useState(false);
  const [notifications, setNotifications] = useState(false);

  React.useEffect(() => {
    if (props.scelte) {
      setApps(props.scelte.apps)
      setNotifications(props.scelte.notifications)
      setAllApps(props.scelte.allApps)
      setInstagram(props.scelte.Instagram)
      setFacebook(props.scelte.Facebook)
      setWhatsapp(props.scelte.Whatsapp)
      setTiktok(props.scelte.TikTok)
      setTelegram(props.scelte.Telegram)
    }
  }, [props.scelte])

  const navigate = useNavigate();

  const submitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (((instagram || facebook || telegram || tiktok || whatsapp) && (apps || notifications)) || (!(instagram || facebook || telegram || tiktok || whatsapp) && !(apps || notifications))) {
        let scelte;

        scelte = {
          apps: apps, notifications: notifications, allApps: allApps, Instagram: instagram, Facebook: facebook, Whatsapp: whatsapp, TikTok: tiktok, Telegram: telegram
        };
        props.setScelte(scelte)
        toast.success(
          "Apps managed succesfully!",
          { position: "bottom-center" },
          { toastId: 12 },
        );

        props.update ?
          navigate('/editTask3/' + props.id)
          :
          (
          props.updatePlan ?
            navigate('/editPlan/' + props.id)
            :
            navigate('/startSessionTask3')
          )

      }
      else {
        if (!(apps || notifications)) {
          toast.error("Select 'Apps' or 'Notifications' to continue.", { position: "bottom-center" }, { toastId: 19 });
        }
        else {
          toast.error("Select some apps to continue.", { position: "bottom-center" }, { toastId: 20 });
        }
      }
    }
  }

  const allApp = () => {
    setAllApps(!allApps)
    setInstagram(!allApps)
    setFacebook(!allApps)
    setWhatsapp(!allApps)
    setTiktok(!allApps)
    setTelegram(!allApps)
  }

  React.useEffect(() => {
    if (instagram && tiktok && whatsapp && facebook && telegram) {
      setAllApps(true)
    }
    else {
      setAllApps(false);
    }
  }, [instagram, facebook, tiktok, whatsapp, telegram])


  return (
    <>
      <div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
      <Form id='appsForm' style={{ margin: 0, padding: 0, fontSize: 15, fontWeight: 'bold' }} onSubmit={submitForm}>

        <Container style={{ backgroundColor: 'white', margin: 0, padding: 0, height: 100, backgroundColor: '#547792', }} className='fixed-top'>
          <div style={{ margin: 0, padding: 0, textAlign: 'center', paddingTop: 15 }} className='textPrimaryBig2'>APPS MANAGER BLOCK</div>

          <div style={{ margin: 0, padding: 0, textAlign: 'center' }} className='textPrimaryBig3'>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ paddingTop: 10 }}>
                <ChevronLeft
                  color='black'
                  size={25}
                  onClick={() => navigate(-1)}>
                </ChevronLeft>
              </Col>
              <Col style={{ margin: 0, padding: 0, paddingTop: 10, textAlign: 'center' }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>MANAGE YOUR APPS</Col>

              <Col style={{ margin: 0, padding: 0, paddingTop: 5, paddingRight: 30, textAlign: 'center' }} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <ClickableOpacity type='submit' style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                  <div>
                    Save
                  </div>
                </ClickableOpacity>
              </Col>
            </Row>
          </div>

        </Container>

        <Container style={{ margin: 0, padding: 0, paddingRight: 20, paddingLeft: 20, paddingTop: 120, paddingBottom: 70 }}>
          <Col className='textPrimaryBig3' style={{ margin: 0, padding: 0, paddingBottom: 5, textAlign: 'center', color: 'black' }} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>WHAT DO YOU WANT TO BLOCK?</Col>
          <Card >
            <Card.Body>
              <Row>
                <Form.Group>
                  <InputGroup>
                    <Form.Check style={{ paddingRight: 10 }} checked={apps} value={apps} onChange={(ev) => setApps(!apps)} />
                    <Form.Label>APPS</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <InputGroup>
                    <Form.Check style={{ paddingRight: 10 }} checked={notifications} value={notifications} onChange={(ev) => setNotifications(!notifications)} />
                    <Form.Label>NOTIFICATIONS</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          <Form.Text style={{ color: 'black' }} className='textPrimary'> This will block apps or notifications (or both) during your study time. They will be available during your break sessions.</Form.Text>

          <Col className='textPrimaryBig3' style={{ margin: 0, padding: 0, paddingTop: 15, paddingBottom: 5, textAlign: 'center', color: 'black' }} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>SELECT APPS:</Col>

          <Card >
            <Card.Body >
              <Row>
                <Form.Group>
                  <InputGroup className="mb-2">
                    <Form.Check style={{ paddingRight: 10 }} checked={allApps} value={allApps} onChange={(ev) => allApp()} />
                    <Form.Label>ALL APPS</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group>
                  <InputGroup className="mb-2">
                    <Form.Check style={{ paddingRight: 10 }} checked={facebook} value={facebook} onChange={(ev) => { setFacebook(!facebook); }} />
                    <Form.Label>FACEBOOK</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group>
                  <InputGroup className="mb-2">
                    <Form.Check style={{ paddingRight: 10 }} checked={instagram} value={instagram} onChange={(ev) => { setInstagram(!instagram); }} />
                    <Form.Label>INSTAGRAM</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group>
                  <InputGroup className="mb-2">
                    <Form.Check style={{ paddingRight: 10 }} checked={telegram} value={telegram} onChange={(ev) => { setTelegram(!telegram); }} />
                    <Form.Label>TELEGRAM</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group>
                  <InputGroup className="mb-2">
                    <Form.Check style={{ paddingRight: 10 }} checked={tiktok} value={tiktok} onChange={(ev) => { setTiktok(!tiktok); }} />
                    <Form.Label>TIKTOK</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group>
                  <InputGroup>
                    <Form.Check style={{ paddingRight: 10 }} checked={whatsapp} value={whatsapp} onChange={(ev) => { setWhatsapp(!whatsapp); }} />
                    <Form.Label>WHATSAPP</Form.Label>
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

export default ManageApps;