import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'doctor', headerName: 'Doctor', width: 130 },
    { field: 'speciality', headerName: 'Speciality', width: 130 },
    {
        field: 'subject',
        headerName: 'Subject',
        type: 'subject',
        width: 90,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 160
    },

    {
        field: 'edit',
        headerName: '',
        width: 160
    },
];

const rows = [
    { id: 1, doctor: 'Snow', speciality: 'Jon', subject: 35, description: 'Jon', edit: <h1>Edit</h1> },
    { id: 2, doctor: 'Lannister', speciality: 'Cersei', subject: 42 , description: 'Jon'},
    { id: 3, doctor: 'Lannister', speciality: 'Jaime', subject: 45 , description: 'Jon'},
    { id: 4, doctor: 'Stark', speciality: 'Arya', subject: 16 , description: 'Jon'},
    { id: 5, doctor: 'Targaryen', speciality: 'Daenerys', subject: null, description: 'Jon' },
    { id: 6, doctor: 'Melisandre', speciality: null, subject: 150, description: 'Jon' },
    { id: 7, doctor: 'Clifford', speciality: 'Ferrara', subject: 44 , description: 'Jon'},
    { id: 8, doctor: 'Frances', speciality: 'Rossini', subject: 36 , description: 'Jon'},
    { id: 9, doctor: 'Roxie', speciality: 'Harvey', subject: 65, description: 'Jon' },
];

export default class Patient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        );
    }
}