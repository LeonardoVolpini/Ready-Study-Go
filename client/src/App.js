import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap/';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

import API from './API';

import Loading from './components/Loading';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import MyCalendar from './components/MyCalendar';
import NewSession from './components/createNewSession';
import NewSessionTask1 from './components/newSessionTask1';
import NewSessionTask2 from './components/newSessionTask2';
import NewSessionTask3 from './components/newSessionTask3';
import SelectPlan from './components/selectPlan';
import ManageApps from './components/manageApps';
import UpdateSongCard from './components/formUpdateSong';
import EventDetails from './components/eventDetails';
import PlanDetails from './components/planDetail';
import UpdatePlan from './components/updatePlan';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  )
}

function Main() {

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [sessions, setSessions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const [scelte, setScelte] = useState({});
  const [user, setUser] = useState({});
  const [selDate, setSelDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [allSessions, setAllSessions] = useState([]);
  const [calendarDate, setCalendarDate] = useState(dayjs().format('YYYY-MM-DD'))


  //new session
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(dayjs().format('HH:mm'));
  const [endTime, setEndTime] = useState(dayjs().format('HH:mm'));
  const [studyDuration, setStudyDuration] = useState("00:00");
  const [breakDuration, setBreakDuration] = useState("00:00");
  const [save, setSave] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatePlan, setUpdatePlan] = useState(false)
  const [id, setId] = useState()
  const [planId, setPlanId] = useState()
  const [song, setSong] = useState(false); //flag per aggiornare la canzone con lo useEffect


  sessions.sort((a, b) => dayjs(`2000-01-01 ${a.startTime}`).diff(dayjs(`2000-01-01 ${b.startTime}`), 'seconds'));
  allSessions.sort((a, b) => dayjs(a.date + " " + `${a.startTime}`).diff(dayjs(b.date + " " + `${b.startTime}`), 'seconds'));


  function handleError(err) {
    toast.error(
      err.error,
      { position: "bottom-center" },
      { toastId: 12 }
    );
  }



  useEffect(() => {
    async function fetchInitialValues() {
      try {
        const defaultPlans = await API.getDefaultPlans();
        const userPlans = await API.getPlansByUserId(1);
        const totalPlans = defaultPlans.concat(userPlans);
        setPlans(totalPlans);
        const sessionsToday = await API.getSessionsByUserIdAndDate(1, dayjs().format("YYYY-MM-DD")); //PER ORA L'ID E' HARDCODED
        setSessions(sessionsToday);
        const userLogged = await API.getUserById(1);
        setUser(userLogged);
        const sesh = await API.getSessionsByUserId(1);
        setAllSessions(sesh);
        setSong(false);
      } catch (error) {
        handleError(error);
      }
    };
    fetchInitialValues();
  }, [song]);



  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);



  async function deleteSession(id) {
    try {
      await API.deleteSession(id);
      setSessions(sessions.filter((s) => s.id !== id));
      // setAllSessions(allSessions.filter((s) => s.id !== id))
      setDirty(true); //cosi mi garantisco di prendere i dati aggiornati dal server. parte la useEffect
      toast.success(
        "Session deleted succesfully!",
        { position: "bottom-center" },
        { toastId: 3 }
      );
    } catch (err) {
      handleError(err);
    }
  }

  function selectPlan(value) {
    setSelectedPlan(value);
    navigate('/startSessionTask2');
  }

  function goToPlanDetails(plan) {
    navigate('/planDetails/' + plan.id);
  }

  async function updateSong(song) {
    try {
      await API.updateSong(song);
      setSong(true);
      toast.success(
        "Song succesfully modified",
        { position: "bottom-center" },
        { toastId: 3 }
      );
    } catch (err) {
      handleError(err);
    }
  }

  function cleanSession() {
    setName("")
    setDate(dayjs().format('YYYY-MM-DD'))
    setStartTime(dayjs().format('HH:mm'))
    setEndTime(dayjs().format('HH:mm'))
    setStudyDuration("00:00")
    setBreakDuration("00:00")
    setSelectedPlan()
    setSave(false)
    setScelte({})
    setDirty(false)
    setUpdate(false)
    setUpdatePlan(false)
  }

  function goToHome() {
    navigate('/home');
  }

  function goToSettings() {
    navigate('/settings');
  }

  function goToCalendar() {
    navigate('/calendar');
  }

  function goToCreateStudyPlan() {
    navigate('/newSession');
  }

  function getHours(minutes) {
    let hour = Math.floor(minutes / 60);
    let min = minutes % 60;
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return hour + ":" + min;
  }

  function getScelte(session) {
    let list = [];
    let apps, notifications;
    
    if (session.appList) {
      apps = true;
      list = session.appList.replace(/ /g, '').split(',');
    } 
    if (session.notificationList) {
      notifications = true;
      if(!apps){
        list = session.notificationList.replace(/ /g, '').split(',');
      }
    }
    let scelte = {
      apps: apps,
      notifications: notifications,
      allApps: list.length == 5 ? true : false,
      Instagram: list.includes("instagram") || list.includes("Instagram"),
      Facebook: list.includes("facebook") || list.includes("Facebook"),
      Whatsapp: list.includes("whatsapp") || list.includes("Whatsapp"),
      TikTok: list.includes("tiktok") || list.includes("TikTok"),
      Telegram: list.includes("telegram") || list.includes("Telegram")
    };

    return scelte;
  }



  function goToUpdateSession(session) {

    setId(session.id)
    setPlanId(session.planId)

    if (session.taskId == 1) {
      navigate('editTask1/'+session.id)
    }
    else if (session.taskId == 2) {
      setSelectedPlan(plans.find((p) => session.planId == p.id))
      navigate('editTask2/'+session.id)
    }
    else {
      setSave(session.planId ? true : false)
      setScelte(getScelte(session))
      setStudyDuration(getHours(session.studyDuration))
      setBreakDuration(getHours(session.breakDuration))
      navigate('editTask3/'+session.id)
    }
    setName(session.name)
    setDate(session.date)
    setStartTime(session.startTime)
    setEndTime(session.endTime)
    setDirty(true)
  }

  function goToTask3(id) {
    let session = allSessions.find((s) => s.id == id)
    setSave(false)
    setPlanId(undefined)
    setScelte(getScelte(session))
    setStudyDuration(getHours(session.studyDuration))
    setBreakDuration(getHours(session.breakDuration))
    navigate('/editTask3/'+id)
  }

  function goToUpdateSong() {
    navigate('/updateSong');
  }

  function setSess(session) {
    // setSession(session)
    navigate('/eventDetails/' + session.id);
  }


  function goToUpdatePlan(plan) {
    navigate('/editPlan/'+plan.id);
  }

  async function deletePlan(id) {
    try {
      await API.deletePlan(id);
      setPlans(plans.filter((p) => p.id !== id));
      setDirty(true); //cosi mi garantisco di prendere i dati aggiornati dal server. parte la useEffect
      toast.success(
        "Session deleted succesfully!",
        { position: "bottom-center" },
        { toastId: 3 }
      );
    } catch (err) {
      handleError(err);
    }
  }


  return (
    <>
      <ToastContainer className="toast-position" />
      <Row style={{ margin: 0, padding: 0 }}>

        <Routes>
          <Route path="/home" element={
            isLoading ? <Loading /> :
              <Home sessions={sessions}
                deleteSession={deleteSession}
                goToUpdateSession={goToUpdateSession}
                setSessions={setSessions}
                selDate={selDate}
                setSelDate={setSelDate}
                setSession={setSess}
                allSessions={allSessions}
                setAllSessions={setAllSessions} />}>
          </Route>

          <Route path='/settings' element={<Settings user={user} goToUpdateSong={goToUpdateSong} />} />

          <Route path='/calendar'
            element={<MyCalendar
              handleError={handleError}
              deleteSession={deleteSession}
              goToUpdateSession={goToUpdateSession}
              allSessions={allSessions}
              setAllSessions={setAllSessions}
              dirty={dirty}
              setDirty={setDirty}
              setSession={setSess}
              calendarDate={calendarDate}
              setCalendarDate={setCalendarDate}
            />} />

          <Route path='/newSession' element={<NewSession />} />

          <Route path='/startSessionTask1'
            element={<NewSessionTask1
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              dirty={dirty}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setDirty={setDirty}
              cleanSession={cleanSession}
              update={update}
              id={id}
              goToTask3={goToTask3} />} />

          <Route path='/startSessionTask2'
            element={<NewSessionTask2
              selectedPlan={selectedPlan}
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              dirty={dirty}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setDirty={setDirty}
              cleanSession={cleanSession}
              update={update}
              id={id}
              goToTask3={goToTask3} />} />

          <Route path='/startSessionTask3'
            element={<NewSessionTask3
              scelte={scelte}
              setScelte={setScelte}
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              studyDuration={studyDuration}
              setStudyDuration={setStudyDuration}
              breakDuration={breakDuration}
              dirty={dirty}
              setBreakDuration={setBreakDuration}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              save={save}
              setSave={setSave}
              setDirty={setDirty}
              cleanSession={cleanSession}
              update={update}
              id={id}
              planId={planId} />} />

          <Route path='/selectPlan'
            element={<SelectPlan
              plans={plans}
              selectPlan={selectPlan}
              setPlans={setPlans} />} />
                       
          <Route path='/listPlans'
            element={<SelectPlan
              plans={plans}
              selectPlan={goToPlanDetails}
              setPlans={setPlans} />} />

          <Route path='/eventDetails/:Id'
            element={<EventDetails
              goToUpdateSession={goToUpdateSession}
              deleteSession={deleteSession} />} />
          
          <Route path='/planDetails/:Id'
            element={<PlanDetails
              goToUpdatePlan={goToUpdatePlan}
              deletePlan={deletePlan} />} />

          <Route path='/editTask1/:Id'
            element={<NewSessionTask1
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              dirty={dirty}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setDirty={setDirty}
              cleanSession={cleanSession}
              setId={setId}
              setUpdate={setUpdate}
              setPlanId={setPlanId}
              update={update}
              id={id}
              goToTask3={goToTask3} />} />

          <Route path='/editTask2/:Id'
            element={<NewSessionTask2
              selectedPlan={selectedPlan}
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              dirty={dirty}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setDirty={setDirty}
              cleanSession={cleanSession}
              setId={setId}
              setUpdate={setUpdate}
              setPlanId={setPlanId}
              setSelectedPlan={setSelectedPlan}
              update={update}
              id={id}
              goToTask3={goToTask3} />} />

          <Route path='/editTask3/:Id'
            element={<NewSessionTask3
              scelte={scelte}
              setScelte={setScelte}
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              studyDuration={studyDuration}
              setStudyDuration={setStudyDuration}
              breakDuration={breakDuration}
              dirty={dirty}
              setBreakDuration={setBreakDuration}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              save={save}
              setSave={setSave}
              setDirty={setDirty}
              cleanSession={cleanSession}
              setId={setId}
              setUpdate={setUpdate}
              setPlanId={setPlanId}
              getScelte={getScelte}
              getHours={getHours}
              update={update}
              id={id}
              planId={planId} />} />

          <Route path='/editPlan/:Id'
            element={<UpdatePlan
              scelte={scelte}
              setScelte={setScelte}
              name={name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              studyDuration={studyDuration}
              setStudyDuration={setStudyDuration}
              breakDuration={breakDuration}
              dirty={dirty}
              setBreakDuration={setBreakDuration}
              setName={setName}
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              save={save}
              setSave={setSave}
              setDirty={setDirty}
              cleanSession={cleanSession}
              setId={setId}
              setUpdatePlan={setUpdatePlan}
              setPlanId={setPlanId}
              getScelte={getScelte}
              getHours={getHours}
              updatePlan={updatePlan}
              id={id}
              planId={planId} />} />


          <Route path='/manageApps' element={<ManageApps scelte={scelte} setScelte={setScelte} update={update} updatePlan={updatePlan} id={id}/>} />
          <Route path='/updateSong' element={<UpdateSongCard updateSong={updateSong} />} />

          <Route path="/*"
            element={<Navigate to="/home" />} />
          {" "}
        </Routes>

      </Row>
      <Row>
        <Navbar cleanSession={cleanSession} goToHome={goToHome} goToSettings={goToSettings} goToCalendar={goToCalendar} goToCreateStudyPlan={goToCreateStudyPlan} update={update} />
      </Row>
    </>
  );
}

export default App;
