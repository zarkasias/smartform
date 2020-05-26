import React, { Component } from 'react';

export default class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instruction: this.props.instruction
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.instruction !== this.props.instruction) {
            this.setState({
                instruction: this.props.instruction
            })
        }
    }

    render() {

        const { instruction } = this.state;

        return (
            <li>   
                {instruction}
            </li>
        );
    }
}