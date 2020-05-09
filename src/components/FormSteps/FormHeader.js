import React, { Component } from 'react';

import '../../css/Form.css';

export default class FormHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4001',
            headertemplate: [],
            date: new Date()
        };
        //this.editFormHandler = this.editFormHandler.bind(this);
    }

    componentDidMount() {
        fetch(this.state.host + "/formheader")
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        headertemplate: result
                    });
                }
            )
    }

    // editFormHandler = formId => {
    //     console.log(formId);
    // }

    // enterDataHandler = formId => {
    //     console.log(formId);
    // }

    render() {

        return (
            <div className="formContainer">   
               Form Header
            </div>
        );
    }
}