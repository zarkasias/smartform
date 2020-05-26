import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Instructions from './includes/entry/Instructions'
import TextInput from './includes/entry/TextInput'
import CheckBox from './includes/entry/CheckBox'

export default class EnterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4000',
            formid: this.props.match.params.formid,
            loaded: false,
            form: {},
            namelabel: "",
            name: "",
            remarklabel: "",
            remark: "",
            descriptionlabel: "",
            description: "",
            codelabel: "",
            code: "",
            schedulelabel: "",
            schedule: "",
            datelabel: "",
            date: new Date()
        };
        this.editFormHandler = this.editFormHandler.bind(this);
        this.enterDataHandler = this.enterDataHandler.bind(this);
    }

    componentDidMount() {
        fetch(this.state.host + "/smartforms/" + this.state.formid)
            .then(res => res.json())
            .then(
                result => {
                    this.processform(result);
                }
            )
    }

    processform = result => {

        console.log(result);

     let namelabel = Object.keys(result.Name)[0];  
     let remarklabel = Object.keys(result.Remark)[0]; 
     let descriptionlabel = Object.keys(result.Description)[0];  
     let codelabel = Object.keys(result.Code)[0];
     let schedulelabel = Object.keys(result.Schedule)[0];
     let datelabel = Object.keys(result.Date)[0];
     let techsignaturelabel = Object.keys(result.TechnicianSignature)[0];
     let custsignaturelabel = Object.keys(result.CustomerSignature)[0];

        this.setState({
            namelabel: namelabel,
            name: result.Name[namelabel],
            remarklabel: remarklabel,
            remark: result.Remark[remarklabel],
            descriptionlabel: descriptionlabel,
            description: result.Description[descriptionlabel],
            codelabel: codelabel,
            code: result.Code[codelabel],   
            schedulelabel: schedulelabel,
            schedule: result.Schedule[schedulelabel],
            datelabel: datelabel,
            techsignaturelabel: techsignaturelabel,
            techsignature: result.TechnicianSignature[techsignaturelabel],
            custsignaturelabel: custsignaturelabel,
            custsignature: result.CustomerSignature[custsignaturelabel],
            form: result,
            loaded: true
        });
    }

    editFormHandler = formId => {
        console.log(formId);
    }

    enterDataHandler = formId => {
        console.log(formId);
    }

    processformType = formproperty => {
        console.log(formproperty);
        switch(formproperty.type) {
            case "instructions":
                return <Instructions instruction={formproperty.value} />;
            case "textinput":
                return <TextInput label={formproperty.label} unit={formproperty.unit} />  
             case "checkbox":
                 return <CheckBox label={formproperty.value} />;     
            default:
                return '';    
        }
    }

    renderProperties = id => {
        let property = [];
        let formproperties = this.state.form.formproperties;
        console.log(formproperties);
        formproperties.forEach(function(formproperty) {
            if (formproperty.formsectionid === id) {
                property.push(this.processformType(formproperty));

            }
        }.bind(this));
        return property;
    }



    render() {

        const { 
            form,
            namelabel, 
            name, 
            remarklabel, 
            remark, 
            descriptionlabel, 
            description, 
            codelabel, 
            code, 
            schedulelabel, 
            schedule, 
            datelabel, 
            date,
            techsignaturelabel,
            techsignature,
            custsignaturelabel,
            custsignature } = this.state;

        return (
            <div>
                {
                this.state.loaded 
                ? <div className="formContainer">  
                    Enter Data for Prepared Form
                    <div className="formContent">
                        <div className="enterField">
                            <TextField className="enterItem" value={name} label={namelabel} />
                        </div>
                        <div className="enterField">
                            <TextField className="enterItem" value={description} label={descriptionlabel} />
                            <TextField className="enterItem" value={code} label={codelabel} /> 
                        </div>
                        <div className="enterField">
                            <TextField className="enterItem" value={schedule} label={schedulelabel} />
                            <TextField disabled className="enterItem" value={date.toLocaleDateString()} label={datelabel} /> 
                        </div>
                        {form.formsections.map(section => (
                            <div className="enterField enterSection" key={section.id + section.name}>
                                <div>
                                {section.name}
                               </div> 
                                <div className="propertyEntryField">
                                    {this.renderProperties(section.id)}
                                </div>   
                            </div>    
                        ))}
                        <div className="enterField">
                            <TextField className="enterItem" value={remark} label={remarklabel} />
                        </div>
                        <div className="enterField">
                            <TextField className="enterItem" value={techsignature} label={techsignaturelabel} />
                            <TextField disabled className="enterItem" value={custsignature} label={custsignaturelabel} /> 
                        </div>
                    </div>
                </div>
                : null
                }
            </div>    
        );
    }
}