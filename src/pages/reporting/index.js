import React from 'react';
import FinanceReport from './financial-report';
import RecapInfo from './recap-information';

const EnrollmentFinanceReport = () => {
  const [active, setActive] = React.useState(['finance']);

  return (
    <div>
      <div className="main-card mb-1 ">
        <div className="card">
          <div className="row px-2">
            <div className="card-body  col-sm-12">
              <ul className="nav nav-tabs financeTabs " id="myTab" role="tablist">
                <li className="nav-item ">
                  <a className={`nav-link ${active.includes('finance') ? 'active' : ' '}`} href='javascript:void(0);' id="step1" onClick={() => setActive(['finance'])}>
                    Financial report
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${active.includes('recap') ? 'active' : ' '}`} href='javascript:void(0);' id="step2" onClick={() => setActive(['recap'])}>
                    Recap Table

                  </a>
                </li>
              </ul>

              {active.includes('finance') && <FinanceReport />}
              {active.includes('recap') && <RecapInfo />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFinanceReport;
