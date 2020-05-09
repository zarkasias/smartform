import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import FormHeader from './FormSteps/FormHeader';


import '../css/App.css';
import '../css/toolbar.css';

export default class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: 'http://localhost:4000',
            activeStep: 0,
            steps: ["Add Form Header", "Select Number of Sections", "Add Sections", "Add Footer"],
            date: new Date()
        };
        //this.editFormHandler = this.editFormHandler.bind(this);
    }

    getStepContent(step) {
        switch (step) {
          case 0:
            return <FormHeader />;
          case 1:
            return 'What is an ad group anyways?';
          case 2:
            return 'This is the bit I really care about!';
          case 3:
            return 'Swizzly!!';
          default:
            return 'Unknown step';
        }
      }

      setActiveStep = step => {
          this.setState({
              activeStep: step
          });
      }

      handleNext = activestep => {
        this.setActiveStep(activestep + 1);
      };
    
      handleBack = activestep => {
        this.setActiveStep(activestep - 1);
      };
    
      handleReset = () => {
        this.setActiveStep(0);
      };

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



    render() {

        const { activeStep, steps } = this.state

        return (
            <div className="componentContainer">
                <div className="toolbarContainer">
                    <div className="toolbarTitle">
                        Create Smart Form
                    </div>
                </div>
                <div className="contentContainer">
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
        {activeStep === steps.length ? (
          <div>
              All steps completed - you&apos;re finished
            <Button onClick={this.handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {this.getStepContent(activeStep)}
            <div>
              <Button 
              disabled={activeStep === 0} 
              onClick={() => this.handleBack(activeStep)}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleNext(activeStep)}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
                </div>
            </div>
        );
    }
}