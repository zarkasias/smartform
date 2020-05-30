import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Instructions from './includes/entry/Instructions'
import TextInput from './includes/entry/TextInput'
import CheckBox from './includes/entry/CheckBox'
import SubLabelTextInput from './includes/entry/SubLabelTextInput'

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
            schedule: [],
            datelabel: "",
            checklist: ["Version", "Description", "Schedule", "Date", "Remark", "TechnicianSignature", "CustomerSignature"],
            date: new Date()
        };
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

            this.state.checklist.forEach(function(check) {
                if (!result.hasOwnProperty(check)) {
                    result[check] = {};
                }
            })

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
            schedule: result.Schedule[schedulelabel].split(","),
            datelabel: datelabel,
            techsignaturelabel: techsignaturelabel,
            techsignature: result.TechnicianSignature[techsignaturelabel],
            custsignaturelabel: custsignaturelabel,
            custsignature: result.CustomerSignature[custsignaturelabel],
            scheduleselect: "",
            form: result,
            loaded: true
        });
        this.updateProperty = this.updateProperty.bind(this);
    }


    processformType = formproperty => {
        switch(formproperty.type) {
            case "instructions":
                return <Instructions instruction={formproperty.value} key={formproperty.value} />;
            case "textinput":
                return <TextInput property={formproperty} label={formproperty.label} unit={formproperty.unit} key={formproperty.label} update={this.updateProperty} />  
             case "checkbox":
                 return <CheckBox property={formproperty} label={formproperty.value} key={formproperty.value} update={this.updateProperty} />;
             case "sublabeltextinput":
                 return <SubLabelTextInput property={formproperty} label={formproperty.label} key={formproperty.label} sublabels={formproperty.sublabels} update={this.updateProperty} />;         
            default:
                return '';    
        }
    }

    renderProperties = id => {
        let property = [];
        let formproperties = this.state.form.formproperties;
        formproperties.forEach(function(formproperty) {
            if (formproperty.formsectionid === id) {
                property.push(this.processformType(formproperty));

            }
        }.bind(this));
        return property;
    }

    updateProperty = (event, type, id, key, label) => {
        let form = this.state.form;
        let formproperties = form.formproperties;
        for (var i = 0; i < formproperties.length; i++) {
            if (formproperties[i].formsectionid === id && formproperties[i].type === type) {
                if (key === "label") {
                    formproperties[i].value = event.target.value;
                }
                if (key === "unit") {
                    formproperties[i].unitvalue = event.target.value;
                }
                if (key === "check") {
                    formproperties[i].checked = event.target.checked;
                }
                if (key === "sublabel") {
                    let sublabels = formproperties[i].sublabels;
                       for (var l = 0; l < sublabels.length; l++) {
                           if (Object.keys(sublabels[l])[0] === label) {
                               sublabels[l][label] = event.target.value;
                               console.log(sublabels[l]);
                           }
                       } 
                }
        }
    }
    this.setState(prevState => ({
        ...prevState,
        form: form
    }));
    }

    handleSelectChange = event => {
        let selection = this.state.scheduleselect;
        selection = event.target.value;
        let form = this.state.form;
        form["Schedule"].selection = selection;
        this.setState(prevState => ({
            ...prevState,
            form: form,
            scheduleselect: selection
        }));

    }

    updateValue = (event, fieldkey) => {
        let form = this.state.form;
        let field = form[fieldkey];
        let fieldlabel = Object.keys(field)[0];
        field[fieldlabel] = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            form: form
        }));
    }

    saveform = () => {
        let form = this.state.form;
        fetch(this.state.host + "/smartforms/" + this.state.formid, {
            method: "put",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        }).then(res => res.json())
          .then(
          (result) => {
              window.location.href = "/";
          },
          (error) => {
              console.log(error);
          })
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
            custsignature,
            scheduleselect } = this.state;

            const ITEM_HEIGHT = 48;
            const ITEM_PADDING_TOP = 30;
            const MenuProps = {
            PaperProps: {
                style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                },
            },
            };

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
                            <TextField className={(descriptionlabel ? "enterItem" : "hidefield")} defaultValue={description} label={descriptionlabel} onChange={(e) => this.updateValue(e, "Description")} />
                            <TextField className="enterItem" value={code} label={codelabel} /> 
                        </div>
                        <div className="enterField selectField">
                        <FormControl className={"selectScheduleFormControl" + (schedule.length > 1 ? "" : " hidefield")}>
                        <InputLabel className="selectInputLabel" id="schedule-label">{schedulelabel}</InputLabel>
                            <Select
                                labelId="schedule-label"
                                value={scheduleselect}
                                onChange={this.handleSelectChange}
                                input={<Input />}
                                displayEmpty
                                MenuProps={MenuProps}
                            >
                                {schedule.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>    
                                ))}
                            </Select>
                        </FormControl>
                            <TextField className={(datelabel ? "enterItem" : "hidefield")} defaultValue={date.toLocaleDateString()} label={datelabel} onChange={(e) => this.updateValue(e, "Date")} /> 
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
                            <TextField className={(remarklabel ? "enterItem" : "hidefield")} defaultValue={remark} label={remarklabel} onChange={(e) => this.updateValue(e, "Remark")} />
                        </div>
                        <div className="enterField">
                            <TextField className={(techsignaturelabel ? "enterItem" : "hidefield")} defaultValue={techsignature} label={techsignaturelabel} onChange={(e) => this.updateValue(e, "TechnicianSignature")} />
                            <TextField className={(custsignaturelabel ? "enterItem" : "hidefield")} defaultValue={custsignature} label={custsignaturelabel} onChange={(e) => this.updateValue(e, "CustomerSignature")} /> 
                        </div>
                    </div>
                    <Button
                        className="saveButton"
                        variant="contained"
                        color="primary"
                        onClick={this.saveform}
                      >
                        Save
                      </Button>
                </div>
                : null
                }
            </div>    
        );
    }
}