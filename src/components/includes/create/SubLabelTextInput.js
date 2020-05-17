import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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

    updateSubText = (event, index) => {
        let propertyobject = this.state.propertyobject;
        propertyobject.sublabel[index].text = event.target.value;
        this.props.updateproperty(propertyobject);
    }

    updateSubUnit = (event, index) => {
        let propertyobject = this.state.propertyobject;
        propertyobject.sublabel[index].unit = event.target.value;
        this.props.updateproperty(propertyobject);
    }

    configureSubField = (label, index) => {
        let propertyobject = this.state.propertyobject;
        let subobject = propertyobject.sublabel[index];
        subobject.enabled = !subobject.enabled;
        this.props.updateproperty(propertyobject);
    }

    addsublabel = () => {
        let templateobject = {"text": "", "unit": "", "enabled": true};
        let propertyobject = this.state.propertyobject;
        let subobject = Object.assign({}, templateobject);
        propertyobject.sublabel.push(subobject);
        this.props.updateproperty(propertyobject);
    }

    render() {

        const { propertyobject } = this.state;
        let sublabel = propertyobject.sublabel;
        console.log(sublabel);

        return (
            <div className="propertyContainer">   
                <TextField required className="createLabel" value={propertyobject.label} label={"Label for Name"} onChange={this.updateLabel} />
                    <div className="subLabelContainer">
                    {sublabel.map((sub, index) => (
                       <div className="subLabelItem" key={index}> 
                        <div>
                            <TextField className="createLabel" value={sub.text} label={"Sub Label Name"} onChange={(e) => this.updateSubText(e, index)} />
                            <TextField className="createLabel" value={sub.unit} label={"Unit if Required"} onChange={(e) => this.updateSubUnit(e, index)} />
                         </div>   
                        <div className="enableButton">
                            <FormControlLabel control={
                                <Switch
                                    checked={sub.enabled}
                                    onChange={() => this.configureSubField(sub.label, index)}
                                    name="enableCheck"
                                    color="primary"
                                    />
                                }
                                label="Enabled"
                            />
                        </div>
                    </div>
                    ))}
                  </div>
                  <div className="addButton">
                    <Button startIcon={<AddIcon />} onClick={this.addsublabel}>
                    Add more
                    </Button>          
                  </div>
                </div>
        );
    }
}