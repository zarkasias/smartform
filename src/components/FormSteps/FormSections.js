import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
            console.log(currentsection);
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
                    result[0][key].enabled = true;
                    result[0][key].value = ""
                    processedresults.push(result[0][key]);
                }
            }
        });
        console.log(processedresults);
        for (var i = 0; i < sections.length; i++) {
            sections[i].sectiontemplate = this.deepCopyObjectArray(processedresults);
        }
        let currentsection = sections[this.state.activesection];
            currentsection.sequence = this.state.activesection;
        this.setState({
            sectiontemplate: processedresults,
            formsections: sections,
            formsection: currentsection
        });
    }

    deepCopyObjectArray = (inObject) => {
        let outObject, value, key
      
        if (typeof inObject !== "object" || inObject === null) {
          return inObject // Return the value if inObject is not an object
        }
      
        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {}
      
        for (key in inObject) {
          value = inObject[key]
      
          // Recursively (deep) copy for nested objects, including arrays
          outObject[key] = this.deepCopyObjectArray(value)
        }
      
        return outObject
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

    configureField = label => {
        let sectiontemplate = this.state.formsection.sectiontemplate;
        for (var i = 0; i < sectiontemplate.length; i++) {
            if(sectiontemplate[i].label === label) {
                sectiontemplate[i].enabled = !sectiontemplate[i].enabled
            }
        }
        this.props.updateformtemplate(sectiontemplate, this.state.activesection);
    }

    updateLabel = (event, section) => {
        let sectiontemplate = this.state.formsection.sectiontemplate;
        console.log(section);
        for (var i = 0; i < sectiontemplate.length; i++) {
            if(sectiontemplate[i].label === section.label) {
                sectiontemplate[i].value = event.target.value;
            }
        }
        this.props.updateformtemplate(sectiontemplate, this.state.activesection);   
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
                                        <TextField className="createLabel" label={"Label for " + section.label} value={section.value} onChange={(e) => this.updateLabel(e, section)} />
                                       </div>
                            } else {
                                return <div className="createField" key={section.label}>
                                        <TextField className="createLabel" label={"Label for " + section.label} value={section.value} onChange={(e) => this.updateLabel(e, section)} />
                                        <div className="actionButton">
                                        <FormControlLabel control={
                                        <Switch
                                            checked={section.enabled}
                                            onChange={() => this.configureField(section.label)}
                                            name="remarkCheck"
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