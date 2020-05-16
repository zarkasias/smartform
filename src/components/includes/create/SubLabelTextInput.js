import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class SubLabelTextInput extends Component {

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

    render() {

        const { propertyobject } = this.state;

        return (
            <div className="propertyContainer">   
                <TextField required className="createLabel" value={propertyobject.label} label={"Label for Name"} onChange={this.updateLabel} />
                <div className="subLabelContainer">
                    {/* <TextField className="createItem" type={} value={} onChange={} label="Sub Label Name" />
                    <div className="actionButton">
                        <Button disableElevation variant="contained" color="primary" onClick={() => this.disableField()}>Enable</Button>
                    </div> */}
                </div>
            </div>
        );
    }
}