import React, { Component } from "react";

import {
    Card,
    Box,
    CardContent,
    Typography,
    Avatar,
    Button
} from '@mui/material';

import { Link } from "react-router-dom";


import PersonIcon from '@mui/icons-material/Person';

export default class PractitionerProfile extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log(' >>>> ', this.props)
        return (
            <Card sx={{ display: 'flex', width: '250px', margin: '10px', padding: '10px' }}>
                <CardContent sx={{ flex: '1 0 auto', flexDirection: 'column' }}>
                    <Box style={{ display: 'flex'}}>
                        <Box style={{flex: '1 0 auto', textAlign: 'left' }}>
                            <Typography component="div">
                                {this.props.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {this.props.specialty}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width: '50px'}}>
                            <Avatar sx={{ height: '50px', width: '50px' }}>
                                <PersonIcon />
                            </Avatar>
                        </Box>
                    </Box>
                    <Box>
                        <Link to={`consultation?id=${this.props.id}`} className="btn" style={{ marginTop: '15px'}}>
                            <Button variant="outlined">
                                Consult Now
                            </Button>
                        </Link>
                    </Box>
                </CardContent>

            </Card>
        );
    }
}