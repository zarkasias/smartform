import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormProperty from '../includes/create/FormProperty';

import '../../css/Form.css';

export default class FormSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4001',
            activesection: this.props.activesection,
            formsection: {smarformid: 1, sequence: this.activesection},
            formsections: this.props.formsections,
            formproperties: [],
            propertytypes: []
        };
        this.updatePropertyHandler = this.updatePropertyHandler.bind(this);
        this.deletePropertyHandler = this.deletePropertyHandler.bind(this);
    }

    componentDidMount() {
        let formsections = this.state.formsections;
        let currentsection = formsections[this.state.activesection];
        currentsection.sequence = this.state.activesection;
        //if currentsection does not have properties array, then set it to []
        if (!currentsection.formproperties) {
            currentsection.formproperties = [];
        }
        if (!currentsection.sectiontemplate) {
            fetch(this.state.host + "/section")
            .then(res => res.json())
            .then(
                result => {
                    this.processResult(result, formsections);
                }
            );
        } else {
            this.setState({
                formsections: formsections,
                formsection: currentsection,
                sectiontemplate: currentsection.sectiontemplate,
                formproperties: currentsection.formproperties
            });
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.numberofsections !== this.props.numberofsections) {
            this.setState({
                numberofsections: this.props.numberofsections
            });
        }
        if (prevProps.activesection !== this.props.activesection) {
            let formsections = this.state.formsections;
            let currentsection = formsections[this.props.activesection];
            //if currentsection does not have properties array, then set it to []
            if (!currentsection.sectiontemplate) {
                currentsection.sectiontemplate = this.state.sectiontemplate
            }
            if (!currentsection.formproperties) {
                currentsection.formproperties = [];
            }
                currentsection.sequence = this.props.activesection;
            this.setState({
                activesection: this.props.activesection,
                formsection: currentsection,
                formproperties: currentsection.formproperties
            });
        }
    }

    processResult = (result, sections) => {
        let processedresults = [];
        let keys = Object.keys(result[0]);
        keys.forEach(function (key) {
            if (typeof result[0][key] === 'object') {
                result[0][key].label = key;
                if (result[0][key].configurable === "yes") {
                    processedresults.push(result[0][key]);
                }
            }
        });
        for (var i = 0; i < sections.length; i++) {
            sections[i].sectiontemplate = processedresults;
        }
        let currentsection = sections[this.state.activesection];
            currentsection.sequence = this.state.activesection;
        this.setState({
            sectiontemplate: processedresults,
            formsections: sections,
            formsection: currentsection
        });
    }

    updatePropertyHandler = property => {
        let formproperties = this.state.formproperties;
        for (var i = 0; i < formproperties.length; i++) {
            if (formproperties[i].id === property.id) {
                formproperties[i] = property;
            }
        }
        this.props.updateformsections(formproperties, this.state.activesection);
    }

    addPropertyHandler = () => {
        let formproperties = this.state.formproperties;
        let formproperty = {id: (formproperties.length + 1), sequence: (formproperties.length + 1), type: "", label: "", value: "", unit: "", sublabels: [{}] };
        formproperties.push(formproperty);
        this.props.updateformsections(formproperties, this.state.activesection);
    }

    deletePropertyHandler = id => {
        let formproperties = this.state.formproperties; 
        for (var i = 0; i < formproperties.length; i++) {
            if (formproperties[i].id === id) {
                formproperties.splice(i, 1);
                break;
            }
        }
        this.props.updateformsections(formproperties, this.state.activesection);
    }

    render() {

        const { activesection, formsection } = this.state;
                let sectiontemplate = formsection.sectiontemplate || [];
                let formproperties = formsection.formproperties || [];
        return (
            <div className="formContainer">
                {"Form Section #" + (activesection + 1)}
                <div className="formContent">
                        {sectiontemplate.map(section => {
                            if (section.label === "Name") {
                                return <div className="createField" key={section.label}>
                                        <TextField className="createLabel" label={"Label for " + section.label} />
                                       </div>
                            } else {
                                return <div className="createField" key={section.label}>
                                        <TextField className="createLabel" label={"Label for " + section.label} />
                                        <div className="actionButton">
                                            <Button disableElevation variant="contained" color="primary">Enable</Button>
                                        </div>
                                       </div>
                            }
                        })}
                </div>
                <div className="sectionPropertiesToolbar">
                    Selection Properties
                    <div className="toolbarButton">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.addPropertyHandler}
                            disableElevation>
                            Add New Property
                        </Button>
                    </div>
                </div>
                <div className="formContent">
                        {formproperties.map(property => (
                            <FormProperty key={property.id} propertyobject={property} id={property.id} updateproperty={this.updatePropertyHandler} deleteproperty={this.deletePropertyHandler} />
                        ))}
                </div>
            </div>
        );
    }
}