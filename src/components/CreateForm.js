import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import FormHeader from './FormSteps/FormHeader';
import FormSections from './FormSteps/FormSections';
import SectionSelector from './FormSteps/SectionSelector';


import '../css/App.css';
import '../css/toolbar.css';

export default class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: 'http://localhost:4000',
      activeStep: 0,
      activeSection: 0,
      steps: ["Add Form Header", "Select Number of Sections", "Add Sections", "Add Footer"],
      formheader: {"Name": {"Name": "Name", "enabled": true}, "Description": {"Description": "Description", "enabled": true}, "Code": {"Code": "C-90-C", "enabled": true}, "Date": {"Date": "Now", "enabled": true}, "Schedule": {"Schedule Type": "", "enabled": true}, "Remark": {"Remark": "", "enabled": true}},
      duplicateheader: "",
      numberofsections: 0,
      informsections: false,
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
        return <FormSections activesection={this.state.activeSection} />;
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

  setActiveSection = section => {
    this.setState({
      activeSection: section
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
        this.setState({
          informsections: true
        }); 
        break;
       case 2:
         progress.forward = true;
        break;  
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

  sectionNext = (activestep, activesection) => {
    if (activestep === 2 && (activesection + 1) === this.state.numberofsections) {
      this.setState({
        informsections: false
      }); 
      this.handleNext(activestep);
    } else {
      this.setActiveSection(activesection + 1);
    }
  };

  sectionBack = (activestep, activesection) => {
    if (activestep === 2 && activesection === 0) {
      this.setState({
        informsections: false
      }); 
      this.handleBack(activestep);
    } else {
    this.setActiveSection(activesection - 1);
    }
  };
  
  handleNext = activestep => {
    this.stepcheck(activestep);
  };

  handleBack = activestep => {
    if (activestep === 3) {
      this.setState({
        informsections: true
      }); 
    } 
      this.setActiveStep(activestep - 1);
  };

  handleCancel = () => {
    window.location.href = "/";
  }

  handleReset = () => {
    this.setActiveStep(0);
  };

  render() {

    const { activeStep, activeSection, informsections, numberofsections, steps } = this.state

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
                        onClick={informsections ? () => this.sectionNext(activeStep, activeSection) : () => this.handleNext(activeStep)}
                      >
                        Next
              </Button>
                    </div>
                  ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={informsections ?  () => this.sectionBack(activeStep, activeSection) : () => this.handleBack(activeStep)}>
                          Back
                      </Button>
                      {activeStep === 1 ? (
                          <Button
                          className="stepButton"
                          variant="contained"
                          color="primary"
                          disabled={numberofsections === 0 ? true : false}
                          onClick={informsections ? () => this.sectionNext(activeStep, activeSection) : () => this.handleNext(activeStep)}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      ): (
                        <Button
                        className="stepButton"
                        variant="contained"
                        color="primary"
                        onClick={informsections ? () => this.sectionNext(activeStep, activeSection) : () => this.handleNext(activeStep)}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                      )}
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