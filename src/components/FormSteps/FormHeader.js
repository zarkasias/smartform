import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            duplicatelabel: "",
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
        if (prevProps.duplicatelabel !== this.props.duplicatelabel) {
            this.setState({
                duplicatelabel: this.props.duplicatelabel
            })
        }
    }

    processHeaders = (headerproperties) => {
        let headers = this.state.header;
        let labels = this.state.labels;
        let headerprops = headerproperties;
        let keys = Object.keys(headerprops);
        keys.forEach(function (key) {
            let labelkey = Object.keys(headerprops[key]);
            labels[key] = labelkey[0];
            if (key === "Schedule") {
                headers[key] = headerprops[key][labelkey[0]].length > 0 ? headerprops[key][labelkey[0]].split(",") : headerprops[key][labelkey[0]].split("");
            } else {
                headers[key] = headerprops[key][labelkey[0]];
            }   
        });
        this.setState({
            headerprops: headerproperties,
            labels: labels,
            header: headers
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
        let headerprops = this.state.headerprops;
        let currentheaderobj = headerprops[label];
        let headerobj = {};
        headerobj[this.state.labels[label]] = this.state.header[label];
        headerobj.enabled = currentheaderobj.enabled;
        this.props.updateHeader(headerobj, label, "header");
    }

    configureField = label => {
        let headerprops = this.state.headerprops;
        let headerobj = headerprops[label];
        headerobj.enabled = !headerobj.enabled;
        this.props.updateHeader(headerobj, label, "header");
    }

    updateLabel = (event, field) => {
        let labels = this.state.labels;
        labels[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            labels: labels
        }));
        this.updateHeader(field.label);
    }

    updateValue = (event, field) => {
        let header = this.state.header;
        header[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            header: header
        }));
        this.updateHeader(field.label);
    }

    handleSelectChange = (event, field) => {
        let header = this.state.header;
        header.Schedule = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            header: header
        }));
        this.updateHeader(field.label);
    }

    render() {

        const { template, header, labels, headerprops, schedule, duplicatelabel, date } = this.state;

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
                            return <div className="createField" key={field.label}>
                                <TextField error={duplicatelabel === labels[field.label] ? true : false} className="createLabel" defaultValue={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <TextField disabled className="createItem" label="Default Value" defaultValue={date} />
                                <div className="actionButton">
                                    <FormControlLabel control={
                                        <Switch
                                            checked={headerprops[field.label].enabled}
                                            onChange={() => this.configureField(field.label)}
                                            name="enableCheck"
                                            color="primary"
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </div>
                            </div>
                        } else if (field.label === "Schedule") {
                            return <div className="createField" key={field.label}>
                                <TextField error={duplicatelabel === labels[field.label] ? true : false} className="createLabel" defaultValue={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
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
                                <div className="actionButton">
                                    <FormControlLabel control={
                                        <Switch
                                            checked={headerprops[field.label].enabled}
                                            onChange={() => this.configureField(field.label)}
                                            name="enableCheck"
                                            color="primary"
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </div>
                            </div>
                        } else {
                            return <div className="createField" key={field.label}>
                                <TextField error={duplicatelabel === labels[field.label] ? true : false} className="createLabel" defaultValue={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <TextField className="createItem" type={field.type} required={(field.label === "Name" || field.label === "Code") ? true : false} defaultValue={header[field.label]} onChange={(e) => this.updateValue(e, field)} label="Default Value" />
                                <div className="actionButton">
                                    <FormControlLabel control={
                                        <Switch
                                            checked={headerprops[field.label].enabled}
                                            onChange={() => this.configureField(field.label)}
                                            name="enableCheck"
                                            color="primary"
                                            />
                                        }
                                        label="Enabled"
                                    />
        
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        );
    }
}