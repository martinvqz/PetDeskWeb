import React, { Component, useState } from 'react';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export class AppointmentsData extends Component {
    static displayName = AppointmentsData.name;

    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            appointmentsConfirmed: [],
            appointmentsPending: [],
            loading: true,
            modalBool: false,
            editPending: {
                appointmentId: 0,
                requestedDateTimeOffset: ""
            },
            date: "",
            selectedDateValue: "",
            selectedDay: "",
        };

    }

    showModalPending = (appointments) => {
        this.setState({
            editPending: appointments,
            modalBool: true,
        });
    };

    closeModalPending = () => {
        this.setState({ modalBool: false });
    };

    apptsConfirm = (appointments) => {
        var opcion = window.confirm("Confirm appointment: " + appointments.appointmentId);
        if (opcion == true && appointments != undefined) {
            var count = 0;
            var appts = this.state.appointments;
            appts.map((registro) => {
                if (appointments.appointmentId == registro.appointmentId) {
                    this.setState({ appointmentsConfirmed: [...this.state.appointmentsConfirmed, appts[count]] });
                    appts.splice(count, 1);
                }
                count++;
            });
            this.setState({ appointments: appts, modalBool: false });
        }
    };

    apptsPending = (appointments) => {
        var count = 0;
        var appts = this.state.appointments;
        if (appointments != undefined) {
            appts.map((registro) => {
                if (appointments.appointmentId == registro.appointmentId) {

                    appts[count].requestedDateTimeOffset = this.state.selectedDateValue.toString();

                    this.setState({ appointmentsPending: [...this.state.appointmentsPending, appts[count]] });
                    this.setState({ selectedDateValue: "" });

                    appts.splice(count, 1);
                }
                count++;
            });
            this.setState({ appointments: appts, modalBool: false });
        }
    };

    selectedDate = (date) => {
        this.setState({ selectedDateValue: date });
    }

    timeConvert(time) {
        let offset = "-8";
        d = new Date();

        // convert to msec
        // add local time zone offset 
        // get UTC time in msec
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        nd = new Date(utc + (3600000 * offset));

        // return time as a string
        console.log("PST " + nd.toLocaleString());

    }

    handleChange = (e) => {
        this.setState({
            editPending: {
                ...this.state.editPending,
                [e.target.name]: e.target.value,
            },
        });
    };

    componentDidMount() {
        this.populateAppointmentsData();
    }

    render() {

        let contents = null;
        let appointments = this.state.appointments;
        let appointmentsPending = this.state.appointmentsPending;
        let appointmentsConfirmed = this.state.appointmentsConfirmed;
        let NA = <p><em>No appointments available.</em></p>;
        
        this.state.appointments.length > 0 ?
            contents = this.state.loading
            ? <p><em>Loading appointments...</em></p>
                : 
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    
                    <thead>
                        <tr>
                            <th>Appointment Info</th>
                            <th>Requested Time</th>
                            <th>User Info</th>
                            <th>Animal Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {appointments.map((appointment) =>
                            <tr key={appointment.appointmentId}>
                                <td>
                                    {"ID: " + appointment.appointmentId}<br />
                                    {"Type: " + appointment.appointmentType}
                                </td>
                                <td>{"Date: " + appointment.requestedDateTimeOffset.slice(0, -15)}<br />
                                    {"Time: " + appointment.requestedDateTimeOffset.split("T")[1].slice(0, -9) + " PST"}<br />
                                    
                                </td>
                                <td>
                                    {"ID: " + appointment.user_UserId}<br />
                                    {"Name: " + appointment.user.firstName} {appointment.user.lastName} 
                                </td>
                                <td>
                                    {"ID: " + appointment.animal.animalId}<br />
                                    {"Name: " + appointment.animal.firstName}<br />
                                    {"Species: " + (appointment.animal.species != null ? appointment.animal.species : "N/A")}<br />
                                    {"Breed: " + (appointment.animal.breed != null ? appointment.animal.breed : "N/A")}
                                </td>
                                <td style={{ verticalAlign: "middle"}}>
                                    <button
                                        className="btn btn-success"
                                        value={appointment.appointmentId}
                                        onClick={() => this.apptsConfirm(appointment)}> Confirm
                                         
                                </button>{"  "}
                                    <button className="btn btn-info"
                                        value={appointment.appointmentId}
                                        onClick={() => this.showModalPending(appointment)}>Reschedule
                                </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            : contents = NA;

        const today = new Date();

        const contentsPending = this.state.appointmentsPending.length > 0 ? <table className='table table-striped' aria-labelledby="tabelLabel">

            <thead>
                <tr>
                    <th>Appointment Info</th>
                    <th>Requested Time</th>
                    <th>User Info</th>
                    <th>Animal Info</th>
                </tr>
            </thead>
                    
            <tbody>
                {appointmentsPending.map((appointment) =>
                    <tr key={appointment.appointmentId}>
                        <td>
                            {"ID: " + appointment.appointmentId}<br />
                            {"Type: " + appointment.appointmentType}
                        </td>
                            <td>{appointment.requestedDateTimeOffset}</td>
                        <td>
                            {"ID: " + appointment.user_UserId}<br />
                            {"Name: " + appointment.user.firstName} {appointment.user.lastName} 
                        </td>
                        <td>
                            {"ID: " + appointment.animal.animalId}<br />
                            {"Name: " + appointment.animal.firstName}<br />
                            {"Species: " + (appointment.animal.species != null ? appointment.animal.species : "N/A")}<br />
                            {"Breed: " + (appointment.animal.breed != null ? appointment.animal.breed : "N/A")}
                        </td>
                   </tr>
                )}
            </tbody>
        </table> : NA;

        const contentsConfirmed = this.state.appointmentsConfirmed.length > 0 ? <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
            <tr>
                <th>Appointment Info</th>
                <th>Requested Time</th>
                <th>User Info</th>
                <th>Animal Info</th>
            </tr>
        </thead>
            <tbody>
                {appointmentsConfirmed.map((appointment) =>
                  <tr key={appointment.appointmentId}>
                    <td>
                        {"ID: " + appointment.appointmentId}<br />
                        {"Type: " + appointment.appointmentType}
                    </td>
                    <td>{"Date: " + appointment.requestedDateTimeOffset.slice(0, -15)}<br />
                        {"Time: " + appointment.requestedDateTimeOffset.split("T")[1].slice(0, -9) + " PST"}<br />
            
                    </td>
                    <td>
                        {"ID: " + appointment.user_UserId}<br />
                        {"Name: " + appointment.user.firstName} {appointment.user.lastName} 
                    </td>
                    <td>
                        {"ID: " + appointment.animal.animalId}<br />
                        {"Name: " + appointment.animal.firstName}<br />
                        {"Species: " + (appointment.animal.species != null ? appointment.animal.species : "N/A")}<br />
                        {"Breed: " + (appointment.animal.breed != null ? appointment.animal.breed : "N/A")}
                    </td>
                   </tr>
                )}
            </tbody>
        </table> : NA;

        return (
            <div>
                <h1 id="tabelLabel" >Appointments</h1>
                <Tabs>
                    <TabList>
                        <Tab>Need Review ({this.state.appointments.length})</Tab>
                        <Tab>Pending ({this.state.appointmentsPending.length})</Tab>
                        <Tab>Confirmed ({this.state.appointmentsConfirmed.length})</Tab>
                    </TabList>

                    <TabPanel>
                        {contents}
                    </TabPanel>
                    <TabPanel>
                        {contentsPending}
                    </TabPanel>
                    <TabPanel>
                        {contentsConfirmed}
                    </TabPanel>
                </Tabs>

                <Modal isOpen={this.state.modalBool}>
                    <ModalHeader>
                        <div><h3>Reschedule Appointment</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                appointmentId:
                            </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.editPending.appointmentId}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Requested date:
                            </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.editPending.requestedDateTimeOffset}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Rescheduled date:
                            </label><br />
                            <DatePicker
                                style={{}}
                                minDate={today}
                                name="selectedDate"
                                onChange={date => this.selectedDate(date.toString())}
                                value={this.state.selectedDateValue }
                                placeholderText="Select Date"
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.apptsPending(this.state.editPending)}
                        >
                            Reschedule
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => this.closeModalPending()}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>

        );
    }

    async populateAppointmentsData() {

        const response = await fetch('appointments');
        const data = await response.json();
        this.setState({ appointments: data, loading: false });

    }
}