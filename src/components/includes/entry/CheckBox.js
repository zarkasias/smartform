import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class CheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            property: this.props.property,
            label: this.props.label,
            checked: false
        };
    }

    handleChange = event => {
        let property = this.state.property;
        this.setState({
            checked: event.target.checked 
        });
        this.props.update(event, property.type, property.formsectionid, "check" )
    }

    // updateValue = event => {
    //     let propertyobject = this.state.propertyobject;
    //     propertyobject.value = event.target.value;
    //     this.props.updateproperty(propertyobject);
    // }

    render() {

        const { label, checked } = this.state;

        return (
            <div className="entryPropertyContainer">   
                <FormControlLabel
                control={
                <Checkbox
                    checked={checked}
                    onChange={this.handleChange}
                    name="checkfield"
                />
                }
                label={label}
            />
            </div>
        );
    }
}