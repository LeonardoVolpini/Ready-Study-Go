import Card from 'react-bootstrap/Card';

function PlanCard(props) {
  return (
    <div onClick={() => props.isSession ? props.setSession(props.session) : props.selectPlan(props.session)} >
      <Card >
        <Card.Body  >

          <Card.Title >{props.session.name}</Card.Title>

          <hr />
          {
            props.isSession ?
              <>
                <Card.Text>
                  {props.session.startTime + " - " + props.session.endTime}
                </Card.Text>
                <Card.Subtitle className="mb-3 text-muted">{props.session.breakDuration == 0 ?
                  "No break." : props.session.breakDuration + " minutes break every " + props.session.studyDuration + " minutes."
                }
                </Card.Subtitle>
                <Card.Text>
                  App blocked: {props.session.appList ? props.session.appList : "none"}
                </Card.Text>
                <Card.Text>
                  Notification blocked: {props.session.notificationList ? props.session.notificationList : "none"}
                </Card.Text>
              </>
              :
              <>
                <Card.Subtitle className="mb-3 text-muted">{props.session.breakDuration + " minutes break every " + props.session.studyDuration + " minutes"}</Card.Subtitle>
                <Card.Text>
                  App blocked: {props.session.appList ? props.session.appList : "none"}
                </Card.Text>
                <Card.Text>
                  Notification blocked: {props.session.notificationList ? props.session.notificationList : "none"}
                </Card.Text>
              </>
          }
        </Card.Body>
      </Card>


    </div>
  );
}

export default PlanCard;