import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class FormReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header,
            sections: this.props.sections,
            footer: this.props.footer
        };
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

    render() {

        const { header, footer, sections } = this.state;
        console.log(header);
        console.log(sections);
        console.log(footer);

        return (
            <div className="formContainer">
                Review Prepared Form
                {/* <div>
                {header}
                </div>
                <div>
                {sections}
                </div>
                <div>
                {footer}
                </div> */}
            </div>
        );
    }
}