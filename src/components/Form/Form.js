import React from "react";
import "./Form.css";
import { useState, useEffect, useRef } from "react";

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [skills, setSkills] = useState([]);
  const [active, setActive] = useState(false);
  const [header, setHeader] = useState(
    "Try it free 7 days then ₹180/mo. thereafter"
  );

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleRemoveSkill = (Removeskill) => {
    setSkills((selectedSkills) =>
      selectedSkills.filter((skill) => skill !== Removeskill)
    );
  };

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    event.target.value = "";
    event.target.setCustomValidity("");
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills((selectedSkills) => [...selectedSkills, selectedSkill]);
    }
}
    const isFormSubmit = () => {
      if (
        formValues.name &&
        formValues.email &&
        formValues.password &&
        skills.length > 0
      ) {
        return true;
      } else {
        if (skills.length === 0) {
          document
            .getElementById("formSelect")
            .setCustomValidity("Please select an item");
          document.getElementById("formSelect").reportValidity();
        }
        return false;
      }
    };

  const claimTrial = (event) => {
    event.preventDefault();
    if (!isFormSubmit()) {
      return;
    }
    setHeader("You have successfully subscribed to our plan");
    setFormValues({ name: "", email: "", password: "" });
    setSkills([]);
    setActive(false);
  };

  useEffect(() => {
    setActive(skills.length > 0 && isFormSubmit());
  }, [skills, formValues]);

  return (
    <div className="form">
      <div className="header">{header}</div>
      <form className="formBody" onSubmit={claimTrial}>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <select
          id="formSelect"
          name="skills"
          className="formSelect"
          onChange={handleSkillChange}
        >
          <option value=""></option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="REACT">React</option>
        </select>

        {skills && (
          <div className="skills">
            {skills.map((skill) => {
              return (
                <div key={skill} className="Tag">
                  {skill}&nbsp;
                  <span onClick={() => handleRemoveSkill(skill)}>X</span>
                </div>
              );
            })}
          </div>
        )}

        <button
          type="submit"
          className={`${active ? 'formButtonActive' : 'formButton'}`}
        >
          CLAIM YOUR FREE TRAIL
        </button>
        <div className='disclaimer'>
          By clicking the button you are agreeing to our{" "}
          <span style={{ color: "red" }}>Terms and Services</span>
        </div>
      </form>
    </div>
  );
};

export default Form;
