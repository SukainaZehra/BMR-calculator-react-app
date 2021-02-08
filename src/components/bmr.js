import React, { Component } from "react";
import "./bmr.css";

class bmr extends Component {
  constructor() {
    super();
    this.state = {
      calcType: "1",
      gender: "",
      weight: "",
      age: "",
      heightFeet: "",
      heightInches: "",
      activity: "",
      bmr: "",
      error: "",
      weightText: "Weight in Pounds",
      heightText: "Heigh in Feet and Inches"
    };
  }
  handleTypeChange = (event) => {
    this.setState({ calcType: event.target.value });
  };
  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };
  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };
  handleHeightFeetChange = (event) => {
    this.setState({ heightFeet: event.target.value });
  };
  handleHeightInchesChange = (event) => {
    this.setState({ heightInches: event.target.value });
  };
  handleActivityChange = (event) => {
    this.setState({ activity: event.target.value });
  };

  calculateBMR() {
    let gender = this.state.gender;
    let weight = this.state.weight;
    let age = this.state.age;
    let heightFeet = this.state.heightFeet;
    let heightInches = this.state.heightInches;
    if (
      gender === "" ||
      weight === "" ||
      age === "" ||
      heightFeet === "" ||
      heightInches === ""
    ) {
      this.setState({ error: "All fields are required!" });
      return;
    }

    let bmrCalc = "";
    if (this.state.calcType == 1) {
      let height = heightFeet * 30.48 + heightInches * 2.54;
      if (gender == 2) {
        bmrCalc = 66 + 6.2 * weight + 12.7 * height - 6.72 * age;
      } else if (gender == 1) {
        bmrCalc = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
      }
    } else if (this.state.calcType == 2) {
      let heightMeter = heightFeet * 0.3048; // 1feet = 0.3048m
      let heightCm = heightInches * 2.54; //1Inch = 2.54cm
      let heightTotalCm = heightMeter * 100 + heightCm; //1m=100cm
      let weightKg = weight * 0.453592; //1pounds=0.453592kg
      if (gender == 1) {
        //for woman
        bmrCalc = 655 + 9.563 * weightKg + 1.85 * heightTotalCm - 4.676 * age;
      } else if (gender == 2) {
        //for man
        bmrCalc = 66.5 + 13.75 * weightKg + 5.003 * heightTotalCm - 6.755 * age;
      }
    }
    this.setState({ bmr: bmrCalc });
    this.setState({ error: "" });
  }
  calculateCALORIES() {
    //console.log(this.state.activity);
    let activityValue = this.state.activity;
    let bmrStatus = this.state.bmr;
    //console.log(bmrStatus);
    if (activityValue == "" && bmrStatus > 0) {
      this.setState({
        error: "Please select a valid option from activity drop down"
      });
      return;
    }

    let CALORIESCalc = "";
    CALORIESCalc = this.state.bmr * activityValue;
    this.setState({ activity: CALORIESCalc });
    this.setState({ error: "" });
  }

  changeText() {
    let type = this.state.calcType;
    if (type === "1") {
      this.setState({ weightText: "Weight in Pounds" });
      this.setState({ heightText: "Height in Feet and Inches" });
    } else if (type === "2") {
      this.setState({ weightText: "Weight in KG" });
      this.setState({ heightText: "Height in Meters and Cm" });
    }
  }

  render() {
    let weightText;
    let heightText;
    if (this.state.calcType) {
      weightText = <label className="label">{this.state.weightText}</label>;
      heightText = <label className="label">{this.state.heightText}</label>;
    }
    let error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    let resultBMR;
    let resultCALORIES;
    if (this.state.bmr) {
      resultBMR = <div className="result">{this.state.bmr}</div>;
    }
    if (
      this.state.activity > 0 &&
      this.state.activity != 1.2 &&
      this.state.activity != 1.375 &&
      this.state.activity != 1.55 &&
      this.state.activity != 1.725 &&
      this.state.activity != 1.9 &&
      this.state.bmr
    ) {
      resultCALORIES = <div className="result">{this.state.activity}</div>;
    }

    return (
      <div id="bmrcalc">
        <div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          {error}
          <div className="inputwrap">
            <label className="label">Choose Calculation Type</label>
            <label>
              <input
                type="radio"
                checked={this.state.calcType === "1"}
                onChange={this.handleTypeChange}
                className="genderF"
                name="calctype"
                value="1"
                onClick={() => this.changeText()}
              />
              Imperial
            </label>
            <label>
              <input
                type="radio"
                checked={this.state.calcType === "2"}
                onChange={this.handleTypeChange}
                className="genderM"
                name="calctype"
                value="2"
                onClick={() => this.changeText()}
              />
              Metric
            </label>
          </div>
          <div className="inputwrap">
            <label className="label">Gender</label>
            <label>
              <input
                type="radio"
                checked={this.state.gender === "1"}
                onChange={this.handleGenderChange}
                className="genderF"
                name="gender"
                value="1"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                checked={this.state.gender === "2"}
                onChange={this.handleGenderChange}
                className="genderM"
                name="gender"
                value="2"
              />
              Male
            </label>
          </div>
          <div className="inputwrap">
            {weightText}
            <input
              type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              name="weight"
              className="weight"
              min="0"
              max="999"
            />
          </div>
          <div className="inputwrap">
            {heightText}
            <input
              type="number"
              value={this.state.heightFeet}
              onChange={this.handleHeightFeetChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="8"
            />
            <input
              type="number"
              value={this.state.heightInches}
              onChange={this.handleHeightInchesChange}
              name="heightInches"
              className="heightInches"
              min="0"
              max="11"
            />
          </div>
          <div className="inputwrap">
            <label className="label">Age in years</label>
            <input
              type="number"
              value={this.state.age}
              onChange={this.handleAgeChange}
              className="age"
              name="age"
              min="0"
              max="120"
            />
          </div>
          <button type="button" onClick={() => this.calculateBMR()}>
            Calculate BMR
          </button>
          {resultBMR}
          <div className="workout">
            <div className="inputwrap">
              <label className="label">Workout in a Week</label>
              <select
                className="activity"
                value={this.state.activity}
                onChange={this.handleActivityChange}
                name="activity"
              >
                <option value="">Select your Activity</option>
                <option value="1.2">
                  Sedentary (Very little or no exercise, and desk job)
                </option>
                <option value="1.375">
                  Lightly Active (Light exercise 1 to 3 days per week)
                </option>
                <option value="1.55">
                  Moderately Active (Moderate exercise 3 to 5 days per week)
                </option>
                <option value="1.725">
                  Very Active (Heavy exercise 6 to 7 days per week)
                </option>
                <option value="1.9">
                  Extremely Active (Very intense exercise, and physical job,
                  exercise multiple times per day)
                </option>
              </select>
            </div>
            <button type="button" onClick={() => this.calculateCALORIES()}>
              Calculate Calories
            </button>
            {resultCALORIES}
          </div>
        </div>
      </div>
    );
  }
}

export default bmr;
