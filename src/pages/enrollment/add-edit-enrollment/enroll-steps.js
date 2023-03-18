import React from 'react';
import { arrayOf, string } from 'prop-types';

const EnrollSteps = ({ active }) => (
  <ul className="nav nav-tabs steps" id="myTab" role="tablist">
    <li className="nav-item ">
      <a className={`nav-link ${active.includes('student') ? 'active' : ''}`} href='javascript:void(0);' id="step1">
        <span className="num">1</span>
        Student Info
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${active.includes('parent') ? 'active' : ''}`} href='javascript:void(0);' id="step2">
        <span className="num">2</span>
        Parent Info
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${active.includes('medical') ? 'active' : ''}`} href='javascript:void(0);' id="step3">
        <span className="num">3</span>
        Medical Info
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${active.includes('transport') ? 'active' : ''}`} href='javascript:void(0);' id="step4">
        <span className="num">4</span>
        Transport
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${active.includes('payment') ? 'active' : ''}`} href='javascript:void(0);' id="step5">
        <span className="num">5</span>
        Payment
      </a>
    </li>
  </ul>
);

EnrollSteps.propTypes = { active: arrayOf(string).isRequired };

export default EnrollSteps;
