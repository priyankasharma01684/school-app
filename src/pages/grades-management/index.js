import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchClasses } from '../../actions/classes-action-types';

const ClassesList = () => {
  const dispatch = useDispatch();
  const classes = useSelector((store) => store.classes.classes);

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchClasses(request));
  }, []);

  return (
    <div className="mb-3 card">
      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">Students</div>
      </div>
      <div className="main-card mb-1 card-body">
        <div className="row px-2">
          <div className="card-body col-sm-12 py-0 px-2">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
              <div className="row color-cards">
                {classes.map((singleClass) => (
                  <div className="col-md-4">
                    <div className="card  mb-3  text-white card-border class-card">
                      <a href="" id={singleClass.class_id} className="py-4 widget-chart text-white " onClick={() => dispatch(push(`/class-students/${singleClass.class_id}`))}>
                        <h5>
                          {'Class '}
                          {singleClass.class_name}
                        </h5>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
