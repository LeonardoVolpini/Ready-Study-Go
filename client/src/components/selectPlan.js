import React from 'react';
import PlanCard from './PlanCard';
import { Container, Col, Row } from 'react-bootstrap';
import API from '../API'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-bootstrap-icons";

function SelectPlan(props) {

	const navigate = useNavigate();

	React.useEffect(() => {
		const getPlans = async () => {
			try {
				const defaultPlans = await API.getDefaultPlans();
				const userPlans = await API.getPlansByUserId(1);
				const totalPlans = defaultPlans.concat(userPlans);
				props.setPlans(totalPlans);
			} catch (err) {
				toast.error("Server error.", { position: "bottom-center" }, { toastId: 7 });
			}
		};
		getPlans()
	}, [])

	return (
		<>
			<div className="backImage" style={{ backgroundColor: '#91A7B9' }}></div>
			<Container style={{ margin: 0, padding: 0, height: 100, backgroundColor: '#547792', }} className='fixed-top'>
				<div style={{ margin: 0, padding: 0, textAlign: 'center', paddingTop: 15 }} className='textPrimaryBig2'>AVAILABLE STUDY PLANS</div>
				<div style={{ margin: 0, padding: 0, textAlign: 'center' }} className='textPrimaryBig3'>
					<Row>
						<Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ paddingTop: 10 }}>
							<ChevronLeft
								color='black'
								size={25}
								onClick={() => {
									navigate(-1);
								}}></ChevronLeft>
						</Col>
						<Col style={{ margin: 0, padding: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>SELECT A STUDY PLAN</Col>

						<Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
						</Col>
					</Row>
				</div>
			</Container>

			<Container style={{ margin: 0, padding: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 120, paddingBottom: 70 }}>
				{props.plans.length ?
				    props.plans.sort((a, b) => (a.name.trim()).localeCompare(b.name.trim()))
					.map((p) => (
						<>
							<PlanCard
								selectPlan={props.selectPlan}
								isSession={0}
								session={p}
								key={p.id}
							//deleteSession={props.deleteSession} non so se servono per i piani
							//goToUpdateForm={props.goToUpdateForm}
							/>
							<br />
						</>
					)) :
					<p>There are no plans available</p>}
			</Container>
		</>
	);
}

export default SelectPlan;