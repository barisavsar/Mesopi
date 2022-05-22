import React, { Component } from "react";
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

const practitioners = [{
    id: '1',
    name: 'John Legend',
    speciality: 'Cardiology'
}, {
    id: '2',
    name: 'Dua Lipa',
    speciality: 'Aesthetic'
}, {
    id: '4',
    name: 'Katy Perry',
    speciality: 'Dermatology'
}, {
    id: '5',
    name: 'Zayn Malik',
    speciality: 'Urology'
}];

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
            speciality: null
        };
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
                            {specialities.map(speciality => (
                                <MenuItem value={speciality.value}>{speciality.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>}
                <h1>Doctors</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    {practitioners.map(practitioner => (
                            <PractitionerProfile
                                id={practitioner.id}
                                name={practitioner.name}
                                speciality={practitioner.speciality} />
                        )
                    )}
                </div>
            </div>

        );
    }
}