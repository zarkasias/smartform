import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import '../../css/Form.css';

export default class FormHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4001',
            template: [],
            header: { "Name": "", "Description": "", "Code": "", "Date": "Now", "Schedule": [] },
            schedule: ["Annual", "Quaterly", "Monthly", "On-demand"],
            date: new Date()
        };
        //this.editFormHandler = this.editFormHandler.bind(this);
    }

    componentDidMount() {
        fetch(this.state.host + "/formheader")
            .then(res => res.json())
            .then(
                result => {
                    this.processResult(result);
                }
            )
    }

    processResult = result => {
        let processedresults = [];
        let keys = Object.keys(result[0]);
        keys.forEach(function (key) {
            result[0][key].label = key;
            result[0][key].disabled = true;
            if (result[0][key].configurable === "yes") {
                processedresults.push(result[0][key]);
            }
        });
        this.setState({
            template: processedresults
        });
    }

    updateValue = (event, field) => {
        let template = this.state.template;
        let header = this.state.header;
        template.forEach(function (item) {
            if (item.label === field.label) {
                item.disabled = event.target.value.length === 0 ? true : false;
            }
        });
        header[field.label] = event.target.value;
        this.setState({
            template: template,
            header: header
        });
    }

    handleSelectChange = (event, field) => {
        let template = this.state.template;
        let header = this.state.header;
        console.log(template);
        console.log(field);
        template.forEach(function (item) {
            if (item.label === field.label) {
                item.disabled = event.target.value.length === 0 ? true : false;
            }
        });
        header.Schedule = event.target.value;
        this.setState({
            template: template,
            header: header
        });
    }

    render() {

        const { template, header, schedule, date } = this.state;

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };

        return (
            <div className="formContainer">
                Form Header
                <div className="formContent">
                    {template.map(field => {
                        if (field.label === "Date") {
                            return <div className="createHeaderField" key={field.label}>
                                <div className="createHeaderLabel createHeaderItem">
                                    {field.label}
                                </div>
                                <TextField disabled className="createHeaderItem" label="Default Value" defaultValue={date} />
                                <div className="enableButton">
                                    <Button disableElevation disabled variant="contained" color="primary">Enable</Button>
                                </div>
                            </div>
                        } else if (field.label === "Schedule") {
                            return <div className="createHeaderField" key={field.label}>
                                <div className="createHeaderLabel createHeaderItem">
                                    {field.label}
                                </div>
                                <FormControl className="selectFormControl">
                                <InputLabel className="selectInputLabel" id="schedule-mutiple-checkbox-label">Default Value</InputLabel>
                                <Select
                                    labelId="schedule-mutiple-checkbox-label"
                                    multiple
                                    className="createHeaderItem"
                                    value={header.Schedule}
                                    onChange={(e) => this.handleSelectChange(e, field)}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    >
                                    {schedule.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={header.Schedule.indexOf(item) > -1} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                                <div className="enableButton">
                                    <Button disableElevation disabled={field.disabled} variant="contained" color="primary">Enable</Button>
                                </div>
                            </div>
                        } else {
                            return <div className="createHeaderField" key={field.label}>
                                <div className="createHeaderLabel createHeaderItem">
                                    {field.label}
                                </div>
                                <TextField className="createHeaderItem" type={field.type} value={header[field.label]} onChange={(e) => this.updateValue(e, field)} label="Default Value" />
                                <div className="enableButton">
                                    <Button disableElevation disabled={field.disabled} variant="contained" color="primary">Enable</Button>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        );
    }
}