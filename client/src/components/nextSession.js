import Card from 'react-bootstrap/Card';
import { ClickableOpacity } from './clickableOpacity';
import dayjs from 'dayjs';

function NextSession(props) {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return (

        <Card >
            <Card.Body>

                <Card.Title>Your next session:</Card.Title>

                <hr />

                <>
                    <Card.Text style={{ padding: 0, margin: 0 }} className="textPrimaryBig5">
                        {props.session.name}
                    </Card.Text>
                    <br/>
                    <Card.Text>
                        {days[dayjs(props.session.date).day()] + ", " + dayjs(props.session.date).date() + " " + months[dayjs(props.session.date).month()] + " " + dayjs(props.session.date).year()}
                    </Card.Text>
                

                <ClickableOpacity onClick={() => props.setSelDate(props.session.date)}>
                    <div>
                        <u>See your next sessions.</u>
                    </div>
                </ClickableOpacity>
                </>
            </Card.Body>
        </Card>



    );
}

export default NextSession;