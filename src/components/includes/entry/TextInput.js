import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            unit: this.props.unit,
            value: '',
            inputvalue: ''
        };
    }


    // updateLabel = event => {
    //     let propertyobject = this.state.propertyobject;
    //     propertyobject.label = event.target.value;
    //     this.props.updateproperty(propertyobject);
    // }

    // updateUnit = event => {
    //     let propertyobject = this.state.propertyobject;
    //     propertyobject.unit = event.target.value;
    //     this.props.updateproperty(propertyobject);
    // }


    render() {

        const { label, unit, value, inputvalue } = this.state;

        return (
            <div className="entryPropertyContainer">   
                <div>
                    {label}
                </div>
                <TextField className="createLabel entryField" defaultValue={value} />
                <div className="entryunit">
                    {unit}
                </div>
                <TextField className="createLabel entryField" defaultValue={inputvalue} />
            </div>
        );
    }
}