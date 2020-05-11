import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../../css/Form.css';

export default class FormSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4001',
            activesection: this.props.activesection,
            sectiontemplate: [],
            propertytypes: []
        };
    }

    componentDidMount() {
        fetch(this.state.host + "/section")
            .then(res => res.json())
            .then(
                result => {
                    this.processResult(result);
                }
            );

        fetch(this.state.host + "/property")
        .then(res => res.json())
        .then(
            result => {
                console.log(result);
                this.setState({
                    propertytypes: result
                })
            }
        );     
    }

    componentDidUpdate(prevProps) {
        if (prevProps.numberofsections !== this.props.numberofsections) {
            this.setState({
                numberofsections: this.props.numberofsections
                
            });
        }
        if (prevProps.activesection !== this.props.activesection) {
            this.setState({
                activesection: this.props.activesection
                
            });
        }
    }

    processResult = result => {
        let processedresults = [];
        let keys = Object.keys(result[0]);
        keys.forEach(function (key) {
            if(typeof result[0][key] === 'object') {
                result[0][key].label = key;
                if (result[0][key].configurable === "yes") {
                    processedresults.push(result[0][key]);
                }
            }
        });
        this.setState({
            //headerprops: this.props.headervalues,
            sectiontemplate: processedresults
        // }, () => {
        //     this.processHeaders(this.props.headervalues);
        // });
        });
    }

    addPropertyHandler = () => {

    }

    render() {
 
        const { activesection, sectiontemplate } = this.state;

        return (
            <div className="formContainer">
                {"Form Section #" +  (activesection + 1)}
                <div className="formContent">
                {sectiontemplate.map(section => (
                    <div className="createField" key={section.label}>
                      <TextField className="createLabel" label={"Label for " + section.label} />  
                      <div className="enableButton">
                            <Button disableElevation variant="contained" color="primary">Enable</Button>
                     </div>
                    </div>
                ))}
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

                </div>
            </div>
        );
    }
}