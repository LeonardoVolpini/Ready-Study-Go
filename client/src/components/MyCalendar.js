import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import { Col, Container, Row } from 'react-bootstrap';


import API from '../API';

function MyCalendar(props) {

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sesh = await API.getSessionsByUserId(1);
        props.setAllSessions(sesh);
      } catch (error) {
        props.handleError(error);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sesh = await API.getSessionsByUserId(1);
        props.setAllSessions(sesh);
        props.setDirty(false)
      } catch (error) {
        props.handleError(error);
      }
    };
    if (props.dirty) {
      fetchSessions();
    }
  }, [props.dirty]);




  function eventClickInfo(eventInfo) {
    const sess = {
      name: eventInfo.event.title,
      id: eventInfo.event.groupId,
      planId: eventInfo.event.extendedProps.planId,
      taskId: eventInfo.event.extendedProps.taskId,
      date: eventInfo.event.extendedProps.dateE,
      startTime: eventInfo.event.extendedProps.sTime,
      endTime: eventInfo.event.extendedProps.eTime,
      studyDuration: eventInfo.event.extendedProps.studyDuration,
      breakDuration: eventInfo.event.extendedProps.breakDuration
    };

    props.setSession(sess)
  }


  function renderEventContent(eventInfo) {
    return (
      <>
        <Row>
          <Col>
            <div>{eventInfo.event.title}  {eventInfo.timeText}</div>

          </Col>
        </Row>

      </>)
  }


  const modSession = adapt(props.allSessions);




  return (
    <>
      <Container className='fixed-top' style={{ margin: 0, padding: 0, height: 100, justifyContent: 'center', textAlign: 'center', backgroundColor: '#547792' }} >
        <h1 style={{ textAlign: 'center' }} className='titleBig'>
          CALENDAR
        </h1>
      </Container>
      <Container
        style={{ backgroundColor: 'white', paddingTop: 120, fontSize: 13, position: 'fixed', justifyContent: 'center', paddingBottom: 70 }}>

        <FullCalendar
          eventColor='#547792'
          height={window.innerHeight * 0.70}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          eventClick={eventClickInfo}
          initialDate={props.calendarDate}
          initialView={'timeGridDay'}
          slotEventOverlap={false}
          expandRows={true}
          slotDuration={'00:15:00'}
          allDaySlot={false}
          stickyHeaderDates={true}
          headerToolbar={{
            left: 'prev,next',
            right: 'today',
            center: 'title',
          }}
          displayEventTime={true}

          events={modSession}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          eventContent={renderEventContent}


        />

      </Container>
    </>
  )
}

function adapt(session) {

  function newS(id, gid, name, start, end, isfirst, date, plan, task, study, bd, apps = undefined) {
    this.id = id;
    this.groupId = gid;
    this.title = name;
    this.dateE = date;
    this.start = `${date}T${start}:00`;
    this.end = `${date}T${end}:00`;
    this.sTime = start;
    this.eTime = end;
    this.isfirst = isfirst;
    this.planId = plan;
    this.taskId = task;
    this.studyDuration = study;
    this.breakDuration = bd;
    this.apps = apps;
  }

  let count = 0;
  let newSession = [];

  session.forEach(s => {

    if (s.studyDuration > 0) {
      let curH = s.startTime;
      let first = true;
      let nextH;
      while (curH < s.endTime) {
        nextH = hourAdd(curH, s.studyDuration);
        let b;
        if (nextH < s.endTime) {
          b = new newS(count, s.id, s.name, curH, nextH, first, s.date, s.planId, s.taskId, s.studyDuration, s.breakDuration, s.appList);
        } else {
          b = new newS(count, s.id, s.name, curH, s.endTime, first, s.date, s.planId, s.taskId, s.studyDuration, s.breakDuration, s.appList);
        }

        newSession.push(b);

        first = false;
        count++;
        curH = nextH;
        nextH = hourAdd(curH, s.breakDuration);
        if (nextH < s.endTime) {
          newSession.push(new newS(count, s.id, "Break", curH, nextH, first, s.date, s.planId, s.taskId, s.studyDuration, s.breakDuration, s.appList));
        }
        curH = nextH;
        count++;
      }
    }
  });

  return newSession;
}

function hourAdd(hour, diff) {
  let hm = hour.split(":")
  let h = parseInt(hm[0])
  let m = parseInt(hm[1]);
  let c = 0;

  let dm = diff % 60;
  let dh = (diff - dm) / 60;

  m = m + dm;
  if (m >= 60) {
    m = m % 60;
    c = 1;
  }
  if (m < 10) {
    m = "0" + m.toString();
  }

  h = h + dh + c;
  if (h > 24) {
    h = h % 24;
  }

  if (h < 10) {
    h = "0" + h.toString();
  }

  return h.toString() + ":" + m.toString();
}


export default MyCalendar;

