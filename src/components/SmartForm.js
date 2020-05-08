import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import '../css/App.css';

export default class SmartForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4000',
            forms: [],
            date: new Date()
        };
        this.editFormHandler = this.editFormHandler.bind(this);
        this.enterDataHandler = this.enterDataHandler.bind(this);
    }

    componentDidMount() {
        fetch(this.state.host + "/smartforms")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        forms: result
                    });
                }
            )
    }

    editFormHandler = formId => {
        console.log(formId);
    }

    enterDataHandler = formId => {
        console.log(formId);
    }

    render() {

        const { forms } = this.state;

        return (
            <div className="componentContainer">   
<TableContainer>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="tableheader">
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map(form => (
            <TableRow key={form.id}>
              <TableCell component="th" scope="row">
                {form.Code.Code}
              </TableCell>
              <TableCell>{form.Name.Name}</TableCell>
              <TableCell>{form.version}</TableCell>
              <TableCell>{form.Description.Description}</TableCell>
              <TableCell align="right"><a className="tableLink" onClick={() => this.editFormHandler(form.id)} href="#">edit</a></TableCell>
              <TableCell align="right"><a className="tableLink" onClick={() => this.enterDataHandler(form.id)} href="#">enter-data</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        );
    }
}