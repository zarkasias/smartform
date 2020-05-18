import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

export default class FormReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header,
            displayheader: [],
            sections: this.props.sections,
            footer: this.props.footer
        };
    }

    componentDidMount() {
        this.processHeaders();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.header !== this.props.header) {
            this.setState({
                header: this.props.header
            })
        }
        if (prevProps.sections !== this.props.sections) {
            this.setState({
                sections: this.props.sections
            })
        }
        if (prevProps.footer !== this.props.footer) {
            this.setState({
                footer: this.props.footer
            })
        }
    }

    processHeaders = () => {
        let headers = this.state.header;
        let displayheaders = [];
        let keys = Object.keys(headers);
        keys.forEach(function (key) {
            let labelkey = Object.keys(headers[key]);
            let headobject = {headercategory: key, headerlabelvalue: labelkey[0], headeractualvalue: headers[key][labelkey[0]], state: labelkey[1] === "enabled" ? true : false};
            displayheaders.push(headobject); 
        });
        this.setState({
            displayheader: displayheaders
        })

    }

    render() {

        const { displayheader, footer, sections } = this.state;
        console.log(footer);

        return (
            <div className="formContainer">
                Review Prepared Form
                <div className="formContent">
                    <div className="sectionTitle">Header</div>
                {displayheader.map((header,index) => (
                    <div className="createField" key={index}>
                    <TextField disabled className="createLabel" value={header.headerlabelvalue} label={"Label for " + header.headercategory} />
                    <TextField disabled className="createItem"  value={header.headeractualvalue} label="Default Value" />
                    <div className="actionButton">
                        <FormControlLabel control={
                            <Switch
                                checked={header.state}
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
                <div className="formContent">
                    <div className="sectionTitle">Sections</div>
                    {sections.map(section => (
                        <div>
                            {section.sectiontemplate.map(template => (
                                <div className="createField" key={template.label}>
                                        <TextField disabled className="createLabel" value={template.value} label={"Label for " + template.label} />
                                        <div className="actionButton">
                                        <FormControlLabel control={
                                            <Switch
                                                checked={template.enabled}
                                                name="enableCheck"
                                                color="primary"
                                                />
                                            }
                                            label="Enabled"
                                        />
                                        </div>
                                </div>
                            ))}
                            {section.formproperties.map(formproperty => {
                                if (formproperty.type === "instructions" || formproperty.type === "checkbox") {
                                    return <div className="createField" key={formproperty.sequence + formproperty.type}>
                                            <TextField disabled className="createLabel" value={formproperty.value} label={"Value for " + formproperty.type} />
                                            </div>
                                    }
                                else if (formproperty.type === "textinput") {
                                    return <div className="createField" key={formproperty.sequence + formproperty.type}>
                                            <TextField disabled className="createLabel" value={formproperty.label} label={"Label for " + formproperty.type} />
                                            <TextField disabled className="createLabel" value={formproperty.unit} label={"Unit for " + formproperty.type} />
                                            </div>
                                }
                                else if (formproperty.type === "sublabeltextinput") {
                                    return <div className="createField" key={formproperty.sequence + formproperty.type}>
                                            <TextField disabled className="createLabel" value={formproperty.label} label={"Label for " + formproperty.type} />
                                            {formproperty.sublabel.map((sub, index) => (
                                            <div className="subLabelItem" key={sub.text + index}> 
                                                <div>
                                                    <TextField disabled className="createLabel" value={sub.text} label={"Sub Label Name"} />
                                                    <TextField disabled className="createLabel" value={sub.unit} label={"Sub Label Unit"} />
                                                </div>   
                                                <div className="enableButton">
                                                    <FormControlLabel control={
                                                        <Switch
                                                            checked={sub.enabled}
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
                                } 
                                else {
                                    return <div></div>
                                }    
             
                            })}
                        </div>
                    ))}
                </div>    
                {/* <div>
                {sections}
                </div>
                <div>
                {footer}
                </div>  */}
            </div>
        );
    }
}