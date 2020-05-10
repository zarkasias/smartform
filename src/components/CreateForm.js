import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import FormHeader from './FormSteps/FormHeader';
import SectionSelector from './FormSteps/SectionSelector';


import '../css/App.css';
import '../css/toolbar.css';

export default class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: 'http://localhost:4000',
      activeStep: 0,
      steps: ["Add Form Header", "Select Number of Sections", "Add Sections", "Add Footer"],
      formheader: {"Name": {"Name": "Name"}, "Description": {"Description": "Description"}, "Code": {"Code": "C-90-C"}, "Date": {"Date": "Now"}, "Schedule": {"Schedule Type": ""}, "Remark": {"Remark": ""}},
      duplicateheader: "",
      numberofsections: 0,
      formsections: [],
      formfooter: [],
      date: new Date()
    };
    this.updateFormHeader = this.updateFormHeader.bind(this);
    this.updateNumberofSections = this.updateNumberofSections.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <FormHeader duplicatelabel={this.state.duplicateheader} headervalues={this.state.formheader} updateHeader={this.updateFormHeader} />;
      case 1:
        return <SectionSelector numberofsections={this.state.numberofsections} updatesections={this.updateNumberofSections} />;
      case 2:
        return 'This is the bit I really care about!';
      case 3:
        return 'Swizzly!!';
      default:
        return 'Unknown step';
    }
  }

  updateFormHeader = (object, label) => {
    let header  = this.state.formheader;
    header[label] = object;
    this.setState({
      formheader: header
    });

  }



  setActiveStep = step => {
    this.setState({
      activeStep: step
    });
  }


  //~~~~~~ check active step ------~// 

  stepcheck = activestep => {
    let progress = {forward: false, label: ""};
    switch(activestep) {
      case 0:
        progress = this.checkheaderlabels();
        break;
      case 1:
        progress.forward = true;  
      default: 
        //code block 
    }
    if (progress.forward) {
      this.setActiveStep(activestep + 1);
    } else {
      switch(activestep) {
        case 0:
          this.setState({
            duplicateheader: progress.label
          });
          break;
         default:
           // code block 
      }
    }
  }

  checkheaderlabels = () => {
    let labels = [];
    let progression = {forward: true, label: ""};
    let formheader = this.state.formheader;
    let keys = Object.keys(formheader);
    keys.forEach(function (key) {  
      let labelkey = Object.keys(formheader[key])[0];
      if (!labels.includes(labelkey)) {
          labels.push(labelkey);
      } else {
        progression.forward = false;
        progression.label = labelkey;
      }
    })
    return progression;;
  }

  updateNumberofSections = event => {
    this.setState({
      numberofsections: Number(event.target.value)
    });
  }

  
  //~~~~~~~ step handlers ~~~~~~~~//
  
  handleNext = activestep => {
    this.stepcheck(activestep);
  };

  handleBack = activestep => {
    this.setActiveStep(activestep - 1);
  };

  handleCancel = () => {
    window.location.href = "/";
  }

  handleReset = () => {
    this.setActiveStep(0);
  };

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
                  {activeStep === 0 ? (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleCancel}>
                        Cancel
                      </Button>
                      <Button
                        className="stepButton"
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleNext(activeStep)}
                      >
                        Next
              </Button>
                    </div>
                  ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.handleBack(activeStep)}>
                          Back
                </Button>
                        <Button
                          className="stepButton"
                          variant="contained"
                          color="primary"
                          onClick={() => this.handleNext(activeStep)}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    )}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}