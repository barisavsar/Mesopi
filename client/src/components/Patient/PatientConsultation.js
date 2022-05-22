import React, { Component } from "react";
import axios from 'axios';
import { DropzoneArea } from "material-ui-dropzone";

import {
    FormControl,
    TextField,
    Box,
    TextareaAutosize,
    Typography,
    Button
} from '@mui/material';

export default class PatientConsultation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: null
        }
    }

    handleChange(files) {
        console.log(files);
        this.setState({
            files: files
        });
    }

    componentDidMount() {
        // TODO: Get doctor info
        this.setState({
            doctorName: 'XXX',
            speciality: 'Cardiology'
        });
    }

    onchange = (key, e) => {
        const value = e.target.value;
        const entry = {};
        entry[key] = value;
        this.setState(entry);
    };

    send = () => {
        // TODO: send the doctor
        console.log(' >>> ', this.state)
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
                <Box style={{ display: 'flex', flex: 1}}>
                    <Box style={{ width: '50%', display: 'flex', flexDirection: 'column', padding: '20px'}}>
                        <Typography align="left" variant="body1" style={{ marginTop: '10px'}}>Doctor</Typography>
                        <Typography align="left" variant="body1" style={{ marginTop: '10px'}}>Speciality</Typography>
                        <FormControl>
                            <TextField
                                required
                                id="subject"
                                label="Subject"
                                style={{ marginTop: '10px'}}
                                onChange={e => this.onchange('subject', e)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextareaAutosize
                                placeholder="Description"
                                style={{ width: '100%', marginTop: '10px', height: '450px', resize: 'none', overflow: 'auto' }}
                                onChange={e => this.onchange('description', e)}
                            />
                        </FormControl>
                    </Box>

                    <Box style={{ width: '50%', paddingTop: '155px', height: '605px'}}>
                        <DropzoneArea onChange={this.handleChange.bind(this)} />
                    </Box>
                </Box>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant="outlined" onClick={this.send}>Send</Button>
                </div>
            </div>
        );

    }
}