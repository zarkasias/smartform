import React, { Component } from 'react';

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4000',
            formid: this.props.match.params.formid,
            forms: [],
            date: new Date()
        };
        this.editFormHandler = this.editFormHandler.bind(this);
        this.enterDataHandler = this.enterDataHandler.bind(this);
    }

    //componentDidMount() {
    //     fetch(this.state.host + "/smartforms")
    //         .then(res => res.json())
    //         .then(
    //             result => {
    //                 this.setState({
    //                     forms: result
    //                 });
    //             }
    //         )
    // }

    editFormHandler = formId => {
        console.log(formId);
    }

    enterDataHandler = formId => {
        console.log(formId);
    }

    render() {

        return (
            <div className="componentContainer">   
                Edit Form {this.state.formid}
            </div>
        );
    }
}