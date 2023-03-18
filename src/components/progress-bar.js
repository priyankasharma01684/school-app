
import { any, string } from 'prop-types';
import React from 'react';

const ProgressBar = ({
  children, className, backgroundColor, completed, ...rest
}) => {
  const barStyles = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  };
  const containerStyles = {
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    height: '1rem',
    marginBottom: 20,
    marginLeft: 5,
    marginTop: 10,
    width: 150,
  };

  const fillerStyles = {
    backgroundColor: '#3ac47d',
    borderRadius: 'inherit',
    height: '100%',
    textAlign: 'right',
    width: `${completed}%`,
  };

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  };

  const percentStyles = {
    color: '#3ac47d',
    fontSize: '1.6rem',
    fontWeight: 'bold',

  };

  return (
    <div style={barStyles}>
      <div style={percentStyles}>
        {`${completed}%`}
      </div>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles} {...rest} />
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  backgroundColor: string,
  children: any.isRequired,
  className: string,
  completed: string.isRequired,

};

ProgressBar.defaultProps = {
  backgroundColor: '#6a1b9a',
  className: 'progress-bar progress-bar-primary',
};

export default ProgressBar;
