import React from 'react';

const EnrollSteps = () => {
  const [active, setActive] = React.useState('active');
  
  const onNavigate = () =>{
    dispatch(push('/enrollments'));
  } 

  return (

    <ul className="nav nav-tabs steps" id="myTab" role="tablist">
      <li className="nav-item ">
        <a className="nav-link active" data-toggle="tab" href="#step-1" id="step1" onClick={() => setActive('active')}>
          <span className="num">1</span>
          Student Info
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link " data-toggle="tab" href="#step-2" id="step2" onClick={() => setActive('active')}>
          <span className="num">2</span>
          Parent Info
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#step-3" id="step3" onClick={() => setActive('active')}>
          <span className="num">3</span>
          Medical Info
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#step-4" id="step4" onClick={() => setActive('active')}>
          <span className="num">4</span>
          Transport
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#step-5" id="step5" onClick={() => setActive('active')}>
          <span className="num">5</span>
          Payment
        </a>
      </li>
    </ul>

  );
};

export default EnrollSteps;
