import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propertyobject: this.props.propertyobject
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.propertyobject !== this.props.propertyobject) {
            this.setState({
                propertyobject: this.props.propertyobject
            })
        }
    }

    updateLabel = event => {
        let propertyobject = this.state.propertyobject;
        propertyobject.label = event.target.value;
        this.props.updateproperty(propertyobject);
    }

    updateUnit = event => {
        let propertyobject = this.state.propertyobject;
        propertyobject.unit = event.target.value;
        this.props.updateproperty(propertyobject);
    }


    render() {

        const { propertyobject } = this.state;

        return (
            <div className="propertyContainer">   
                <TextField required className="createLabel" value={propertyobject.label} label={"Label for Name"} onChange={this.updateLabel} />
                <TextField className="createLabel" value={propertyobject.unit} label={"Unit if Required"} onChange={this.updateUnit} />
            </div>
        );
    }
}