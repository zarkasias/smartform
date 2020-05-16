import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import InstructionsProperty from './Instructions';
import CheckBoxProperty from './CheckBox';
import TextInputProperty from './TextInput';
import SubLabelTextInputProperty from './SubLabelTextInput';



export default class FormProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4000',
            id: this.props.id,
            propertyobject: this.props.propertyobject,
            propertytypes: ["instructions", "sublabeltextinput", "textinput", "checkbox"],
        };
       // this.editFormHandler = this.editFormHandler.bind(this);
    }

    getPropertyType(type) {
        switch (type) {
          case "textinput":
            return <TextInputProperty updateproperty={this.props.updateproperty} propertyobject={this.state.propertyobject} />;
          case "sublabeltextinput":
            return <SubLabelTextInputProperty updateproperty={this.props.updateproperty} propertyobject={this.state.propertyobject} />;
          case "checkbox":
            return <CheckBoxProperty updateproperty={this.props.updateproperty} propertyobject={this.state.propertyobject} />;
          case "instructions":
            return <InstructionsProperty updateproperty={this.props.updateproperty} propertyobject={this.state.propertyobject} />;
          default:
            return '';
        }
      }

    componentDidUpdate(prevProps) {
        if (prevProps.propertyobject !== this.props.propertyobject) {
            this.setState({
                propertyobject: this.props.propertyobject
            })
        }
    }

    handleSelectChange = event => {
        let propertyobject = this.resetproperty(this.state.propertyobject);
        propertyobject.type = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            propertyobject: propertyobject
        }));
    }

    resetproperty = property => {
        property.value = "";
        property.label = "";
        property.unit = "";
        property.sublabels = [{}];
        return property;
    }


    render() {

        const { id, propertytypes, propertyobject } = this.state;

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
            <div className="createField">
                <FormControl className="selectPropertyFormControl">
                    <InputLabel className="selectInputLabel" id="property-type-label">Property Type</InputLabel>
                    <Select
                        labelId="property-type-label"
                        value={propertyobject.type}
                        onChange={this.handleSelectChange}
                        input={<Input />}
                        displayEmpty
                        MenuProps={MenuProps}
                    >
                        {propertytypes.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>    
                        ))}
                    </Select>
                </FormControl>
                {this.getPropertyType(propertyobject.type)}
                <div className="actionButton">
                    <IconButton onClick={() => this.props.deleteproperty(id)}>
                        <DeleteIcon fontSize="large" />       
                    </IconButton>    
                </div>            
            </div>
        );
    }
}