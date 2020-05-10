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
            labels: { "Name": "Name", "Description": "Description", "Code": "Code", "Date": "Date", "Schedule": "Schedule" },
            header: { "Name": "Name", "Description": "Description", "Code": "Code", "Date": "Now", "Schedule": [] },    
            headerprops: {},
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

    componentDidUpdate(prevProps) {
        if (prevProps.headervalues !== this.props.headervalues) {
            this.processHeaders(this.props.headervalues);
        }
    }

    processHeaders = (headerproperties) => {
        let headers = this.state.header;
        let labels = this.state.labels;
        let headerprops = headerproperties;
        var keys = Object.keys(headerprops);
        keys.forEach(function (key) {
            var labelkey = Object.keys(headerprops[key]);
            labels[key] = labelkey[0];
            if (key === "Schedule") {
                headers[key] = headerprops[key][labelkey].split(",");
            } else {
                headers[key] = headerprops[key][labelkey];
            }   

        });
        this.setState({
            headerprops: headerproperties,
            labels: labels,
            headers: headers
        });
    }

    processResult = result => {
        let processedresults = [];
        let keys = Object.keys(result[0]);
        keys.forEach(function (key) {
            result[0][key].label = key;
            if (result[0][key].configurable === "yes") {
                processedresults.push(result[0][key]);
            }
        });
        this.setState({
            headerprops: this.props.headervalues,
            template: processedresults
        }, () => {
            this.processHeaders(this.props.headervalues);
        });
    }

    updateHeader = label => {
        var headerobj = {};
        headerobj[this.state.labels[label]] = this.state.header[label];
        this.props.updateHeader(headerobj, label);
    }

    updateLabel = (event, field) => {
        let labels = this.state.labels;
        labels[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            labels: labels
        }));
    }

    updateValue = (event, field) => {
        let header = this.state.header;
        header[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            header: header
        }));
    }

    handleSelectChange = (event, field) => {
        let header = this.state.header;
        header.Schedule = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            header: header
        }));
    }

    render() {

        const { template, header, labels, schedule, date } = this.state;

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
                                <TextField className="createHeaderLabel" value={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <TextField disabled className="createHeaderItem" label="Default Value" defaultValue={date} />
                                <div className="enableButton">
                                    <Button disableElevation disabled variant="contained" color="primary">Enable</Button>
                                </div>
                            </div>
                        } else if (field.label === "Schedule") {
                            return <div className="createHeaderField" key={field.label}>
                                <TextField className="createHeaderLabel" value={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <FormControl className="selectFormControl">
                                <InputLabel className="selectInputLabel" id="schedule-mutiple-checkbox-label">Default Value</InputLabel>
                                <Select
                                    labelId="schedule-mutiple-checkbox-label"
                                    multiple
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
                                    <Button disableElevation variant="contained" color="primary" onClick={() => this.updateHeader(field.label)}>Enable</Button>
                                </div>
                            </div>
                        } else {
                            return <div className="createHeaderField" key={field.label}>
                                <TextField className="createHeaderLabel" value={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <TextField className="createHeaderItem" type={field.type} value={header[field.label]} onChange={(e) => this.updateValue(e, field)} label="Default Value" />
                                <div className="enableButton">
                                    <Button disableElevation variant="contained" color="primary" onClick={() => this.updateHeader(field.label)}>Enable</Button>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        );
    }
}