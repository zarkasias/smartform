import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import '../../css/Form.css';

export default class FormFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4001',
            template: [],
            labels: { "Remark": "Remark", "TechnicianSignature": "TechnicianSignature", "CustomerSignature": "CustomerSignature" },
            footer: { "Remark": "Remark", "TechnicianSignature": "TechnicianSignature", "CustomerSignature": "CustomerSignature" },    
            footerprops: {},
            duplicatelabel: ""
        };
    }

    componentDidMount() {
        fetch(this.state.host + "/formfooter")
            .then(res => res.json())
            .then(
                result => {
                    this.processResult(result);
                }
            )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.footervalues !== this.props.footervalues) {
            this.processFooters(this.props.footervalues);
        }
        if (prevProps.duplicatelabel !== this.props.duplicatelabel) {
            this.setState({
                duplicatelabel: this.props.duplicatelabel
            })
        }
    }

    processFooters = (footerproperties) => {
        let footers = this.state.footer;
        let labels = this.state.labels;
        let footerprops = footerproperties;
        var keys = Object.keys(footerprops);
        keys.forEach(function (key) {
            var labelkey = Object.keys(footerprops[key]);
            labels[key] = labelkey[0];
            footers[key] = footerprops[key][labelkey[0]];
        });
        this.setState({
            footerprops: footerproperties,
            labels: labels,
            footer: footers
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
            footerprops: this.props.footervalues,
            template: processedresults
        }, () => {
            this.processFooters(this.props.footervalues);
        });
    }

    updateFooter = label => {
        let footerprops = this.state.footerprops;
        let currentfooterobj = footerprops[label];
        let footerobj = {};
        footerobj[this.state.labels[label]] = this.state.footer[label];
        footerobj.enabled = currentfooterobj.enabled;
        this.props.updateFooter(footerobj, label, "footer");
    }

    configureField = label => {
        let footerprops = this.state.footerprops;
        let footerobj = footerprops[label];
        footerobj.enabled = !footerobj.enabled;
        this.props.updateFooter(footerobj, label, "footer");
    }

    updateLabel = (event, field) => {
        let labels = this.state.labels;
        labels[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            labels: labels
        }));
        this.updateFooter(field.label);
    }

    updateValue = (event, field) => {
        let footer = this.state.footer;
        footer[field.label] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            footer: footer
        }));
        this.updateFooter(field.label);
    }


    render() {

        const { template, footer, labels, footerprops, duplicatelabel} = this.state;
    
        return (
            <div className="formContainer">
                Form Footer
                <div className="formContent">
                    {template.map(field => (
                        <div className="createField" key={field.label}>
                                <TextField error={duplicatelabel === labels[field.label] ? true : false} className="createLabel" value={labels[field.label]} label={"Label for " + field.label} onChange={(e) => this.updateLabel(e, field)} />
                                <TextField className="createItem" type={field.type} value={footer[field.label]} onChange={(e) => this.updateValue(e, field)} label="Default Value" />
                                <div className="actionButton">
                                    <FormControlLabel control={
                                        <Switch
                                            checked={footerprops[field.label].enabled}
                                            onChange={() => this.configureField(field.label)}
                                            name="enableCheck"
                                            color="primary"
                                            />
                                        }
                                        label="Enabled"
                                    />
        
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}