import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import FormHeader from './FormSteps/FormHeader';
import FormSections from './FormSteps/FormSections';
import SectionSelector from './FormSteps/SectionSelector';
import FormFooter from './FormSteps/FormFooter';
import FormReview from './FormSteps/FormReview';


import '../css/App.css';
import '../css/toolbar.css';

export default class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      host: 'http://localhost:4000',
      activeStep: 0,
      activeSection: 0,
      steps: ["Add Form Header", "Select Number of Sections", "Add Sections", "Add Footer", "Review"],
      formheader: {"Name": {"Name": "", "enabled": true}, "Description": {"Description": "", "enabled": true}, "Code": {"Code": "", "enabled": true}, "Date": {"Date": "Now", "enabled": true}, "Schedule": {"Schedule Type": "", "enabled": true}, "Remark": {"Remark": "", "enabled": true}},
      duplicateheader: "",
      duplicatefooter: "",
      numberofsections: 0,
      informsections: false,
      formsections: [],
      formslength: 0,
      formfooter: {"Remark": {"Remark": "Remark", enabled: true}, "TechnicianSignature": {"TechicianSignature": "TechnicianSignature", enabled: true}, "CustomerSignature": {"CustomerSignature": "CustomerSignature", enabled: true}},
      date: new Date()
    };
    this.updateFormTemplate = this.updateFormTemplate.bind(this);
    this.updateFormArea = this.updateFormArea.bind(this);
    this.updateNumberofSections = this.updateNumberofSections.bind(this);
    this.updateFormSections = this.updateFormSections.bind(this);
  }

  componentDidMount() {
    fetch(this.state.host + "/smartforms")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            formslength: result.length
          });
        }
      )
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <FormHeader duplicatelabel={this.state.duplicateheader} headervalues={this.state.formheader} updateHeader={this.updateFormArea} />;
      case 1:
        return <SectionSelector numberofsections={this.state.numberofsections} updatesections={this.updateNumberofSections} />;
      case 2:
        return <FormSections updateformtemplate={this.updateFormTemplate} updateformsections={this.updateFormSections} formsections={this.state.formsections} activesection={this.state.activeSection} />;
      case 3:
        return <FormFooter duplicatelabel={this.state.duplicatefooter} footervalues={this.state.formfooter} updateFooter={this.updateFormArea} />;
      case 4:
        return <FormReview header={this.state.formheader} sections={this.state.formsections} footer={this.state.formfooter} />;
        default:
        return 'Unknown step';
    }
  }

  updateFormArea = (object, label, section) => {
    let area  = section === "header" ? this.state.formheader : this.state.formfooter;
    area[label] = object;
    if (section === "header") {
      this.setState({
        formheader: area
      });
    } else {
      this.setState({
        formfooter: area
      });
    }

  }

  updateFormTemplate = (template, activesection) => {
    let formsections = this.state.formsections;
    formsections[activesection].sectiontemplate = template;
    this.setState({
      formsections: formsections
    })
  }

  updateFormSections = (section, activesection) => {
    let formsections = this.state.formsections;
    formsections[activesection].formproperties = section;
    this.setState({
      formsections: formsections
    })
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
        case 3:
         progress.forward = true;
        break;  
        case 4:
          this.handleSave();
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
    let sections = this.state.formsections;
    let sectionnumbers = event.target.value;
    for (var i = 0; i < sectionnumbers; i++) {
      if (!sections[i]) {
        sections[i] = {smarformid: 1, sequence: "", formproperties: []};
      } 
    }
    if (sectionnumbers > 0) {
      sections.length = sectionnumbers;
    }
    this.setState({
      numberofsections: Number(sectionnumbers),
      formsections: sections
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

  handleSave = () => {
      let header = this.state.formheader;
      let sections = this.state.formsections;
      let footer = this.state.formfooter;

      let formsectionsid = 1;
      let formpropertiesid = 1;

      let smartform = {
             "id": Number(this.state.formslength) + 1,
             "status": "active",
             "version": 1,
             formsections: [],
             formproperties: []
       };

      let keys = Object.keys(header);
      keys.forEach(function(key) {
        let headerobj = header[key];
        if (headerobj.enabled) {
          let propertykeys = Object.keys(headerobj);
          let property = {};
          if(key === "Schedule") {
            property[propertykeys[0]] = headerobj[propertykeys[0]].toString();
          } else {
            property[propertykeys[0]] = headerobj[propertykeys[0]];
          }
          smartform[key] = property;
        }
      });
      
      let fkeys = Object.keys(footer);
      fkeys.forEach(function(key) {
        let footerobj = footer[key];
        if (footerobj.enabled) {
          let propertykeys = Object.keys(footerobj);
          let property = {};
            property[propertykeys[0]] = footerobj[propertykeys[0]];
            smartform[key] = property;
        }
      });
      
      let templatesequenceid = 1, propertysequenceid = 1;
      sections.forEach(function(section) {   
        var sectionobj = {
          id: formsectionsid,
          sequence: templatesequenceid
        };   
        section.sectiontemplate.forEach(function(template) {
          
          if (template.label === "Name" && template.enabled) {
            sectionobj.name = template.value;
          }
          if (template.label === "Remark" && template.enabled) {
            sectionobj.remark = template.value;
          }
        });
        smartform.formsections.push(sectionobj);
        templatesequenceid++;

        section.formproperties.forEach(function(property) {
          let type  = property.type;
          var propertyobj = {
              id: formpropertiesid,
              sequence: propertysequenceid,
              formsectionid: formsectionsid
          };
            if (type) {
              propertyobj.type = type;
              if (type === "instructions" || type === "checkbox") {
                propertyobj.value = property.value;
              }
              if (type === "textinput") {
                propertyobj.label = property.label;
                propertyobj.unit = property.unit;
              }
              if (type === "sublabeltextinput") {
                propertyobj.label = property.label;
                propertyobj.sublabels = [];
                property.sublabel.forEach(function(sub) {
                  var subobj = {};
                  subobj[sub.text] = sub.unit;
                  propertyobj.sublabels.push(subobj);
                })
              }
            }
            smartform.formproperties.push(propertyobj);
            propertysequenceid++;
            formpropertiesid++;
        });
        formsectionsid++;
      });

      fetch(this.state.host + "/smartforms", {
        method: "post",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(smartform)
    }).then(res => res.json())
      .then(
      (result) => {
          window.location.href = "/";
      },
      (error) => {
          console.log(error);
      }
  )
  }

  handleReset = () => {
    this.setActiveStep(0);
  };

  render() {

    const { formsections, activeStep, activeSection, informsections, numberofsections, steps } = this.state;
    let activeformsection = formsections[activeSection] || [];
    let fproperties = activeformsection.formproperties || [];

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
                <div>
                You have Completed Creating the form.
                </div>
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
                          Next
                        </Button>
                      ): (
                        <Button
                        className="stepButton"
                        variant="contained"
                        color="primary"
                        disabled={(activeStep === 2 && fproperties.length === 0) ? true : false}
                        onClick={informsections ? () => this.sectionNext(activeStep, activeSection) : () => this.handleNext(activeStep)}
                      >
                        {activeStep === steps.length - 1 ? 'Save' : 'Next'}
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