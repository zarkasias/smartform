import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class SectionSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberofsections: this.props.numberofsections
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.numberofsections !== this.props.numberofsections) {
            this.setState({
                numberofsections: this.props.numberofsections
            })
        }
    }

    render() {

        const { numberofsections } = this.state;

        return (
            <div className="formContainer">
                Number of Form Sections Needed
                <div>
                <TextField className="createHeaderLabel" value={numberofsections} label="Form Sections" onChange={this.props.updatesections} />
                </div>
            </div>
        );
    }
}