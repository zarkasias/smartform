import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class Instructions extends Component {

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

    updateValue = event => {
        let propertyobject = this.state.propertyobject;
        propertyobject.value = event.target.value;
        this.props.updateproperty(propertyobject);
    }

    render() {

        const { propertyobject } = this.state;

        return (
            <div className="propertyContainer">   
                <TextField required className="createLabel" value={propertyobject.value} label={"Default value"} onChange={this.updateValue} />
            </div>
        );
    }
}