import React, { Component } from "react";
import axios from 'axios';

import {
    FormControl,
    TextField,
    Box,
    Typography,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';


import PractitionerProfile from './PractitionerProfile.js';

// const practitioners = [{
//     id: '1',
//     name: 'John Legend',
//     speciality: 'Cardiology'
// }, {
//     id: '2',
//     name: 'Dua Lipa',
//     speciality: 'Aesthetic'
// }, {
//     id: '4',
//     name: 'Katy Perry',
//     speciality: 'Dermatology'
// }, {
//     id: '5',
//     name: 'Zayn Malik',
//     speciality: 'Urology'
// }];

const specialities = [{
    value: 'Cardiology',
    label: 'Cardiology'
}, {
    value: 'Dermatology',
    label: 'Dermatology'
}, {
    value: 'Cardiology',
    label: 'Cardiology'
}, {
    value: 'Gastroenterology',
    label: 'Gastroenterology'
}, {
    value: 'General surgery',
    label: 'General surgery'
}, {
    value: 'Pediatrics',
    label: 'Pediatrics'
}, {
    value: 'Radiology',
    label: 'Radiology'
}, {
    value: 'Urology',
    label: 'Urology'
}]

export default class PractitionerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speciality: null,
            practitioners: [],
            practitionerRoles: []
        };
    }

    async componentDidMount() {
        debugger
        let token = localStorage.getItem('user');
        token = token.replace(/['"]+/g, '')
        const AuthStr = 'Bearer ' + token;
        const {data: practitionerRoles} = await axios.get(`http://localhost:5000/practitioner/roles`, { 'headers': { 'Authorization': AuthStr } });
        console.log('practitionerRoles >>> ', practitionerRoles);
        this.setState({ practitionerRoles });


        const {data: practitioners} = await axios.get(`http://localhost:5000/practitioner/all`, { 'headers': { 'Authorization': AuthStr } });
        console.log('practitioners >>> ', practitioners);
        this.setState({ practitioners });
    }

    render() {
        console.log(' >> ', this.state);
        return (
            <div style={{ padding: '15px 10px'}}>
                {this.props.filter && <div style={{ margin: '15px 0', width: '100%', textAlign: 'left'}}>
                    <FormControl variant="standard" sx={{ m: 1, width: '200px'}}>
                        <InputLabel id="speciality">Speciality</InputLabel>
                        <Select
                            labelId="Speciality"
                            id="speciality"
                            label="Speciality"
                            onChange={e => this.setState({ speciality: e.target.value})}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {this.state.practitionerRoles.map(practitionerRole => (
                                <MenuItem value={practitionerRole.id}>{practitionerRole.specialty}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>}
                <h1>Doctors</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    {this.state.practitioners.map(practitioner => (
                            <PractitionerProfile
                                id={practitioner.user_id}
                                name={`${practitioner.given} ${practitioner.family}`} 
                                speciality={practitioner.specialty} />
                        )
                    )}
                </div>
            </div>

        );
    }
}