import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import '../css/App.css';
import '../css/toolbar.css';

export default class FormList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: 'http://localhost:4000',
      forms: [],
      checklist: ["Version", "Description"],
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
          result.forEach(function(item) {
            this.state.checklist.forEach(function(check) {
              if (!item.hasOwnProperty(check)) {
                item[check] = {};
              }
            })
          }.bind(this))
          console.log(result);
          this.setState({
            forms: result
          });
        }
      )
  }


  addFormHandler = () => {
    window.location.href = "/create";
  }

  editFormHandler = formId => {
    window.location.href = "/edit/" + formId;
  }

  enterDataHandler = formId => {
    window.location.href = "/enterdata/" + formId;
  }

  render() {

    const { forms } = this.state;

    return (
      <div className="componentContainer">
        <div className="toolbarContainer">
          <Button
            variant="outlined"
            color="primary"
            onClick={this.addFormHandler}
            disableElevation>
            Add Form
               </Button>
        </div>
        <TableContainer className="tableContainer">
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