import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class SubLabelTextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            label: this.props.label,
            sublabels: this.props.sublabels,
            subheaders: [],
            value: ''
        };
    }

    componentDidMount() {
        let headers = [];
        for (var i = 0; i < this.props.sublabels.length; i++) {
            var headerobj = {};
            headerobj.label = Object.keys(this.props.sublabels[i])[0];
            headerobj.value = "";
            headers.push(headerobj);
        }
        console.log(headers);
        this.setState({
            subheaders: headers,
            loading: true
        });
    }


    // updateLabel = event => {
    //     let propertyobject = this.state.propertyobject;
    //     propertyobject.label = event.target.value;
    //     this.props.updateproperty(propertyobject);
    // }

    // updateUnit = event => {
    //     let propertyobject = this.state.propertyobject;
    //     propertyobject.unit = event.target.value;
    //     this.props.updateproperty(propertyobject);
    // }


    render() {

        const { label, loading, subheaders } = this.state;

        return (
            <div className="entryPropertyContainer">   
                <div>
                    {label}
                </div>
                <div className="sublabelFields">
                {loading ? 
                     <div className="sublabelHeaderContainer">
                         {subheaders.map(subheader => (
                         <div className="sublabelColumn" key={subheader.label}>
                             {subheader.label}
                             <TextField value={subheader.value} />
                         </div>     
                     ))}
                     </div>
                : null 
                }   
                </div>
            </div>
        );
    }
}