import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { toggleDrawer, toggleDrawerMenu } from '../../actions/app-action-types';
import { logoutSuccess } from '../../actions/user-action-types';
import ProfileDropDown from './profile-dropdown';

const Header = ({
  isDrawerOpen, title, user,
}) => {
  const dispatch = useDispatch();

  const [profile, setProfileVisibility] = React.useState(false);
  const iconClass = isDrawerOpen ? '' : 'is-active';

  const onClick = () => dispatch(toggleDrawer(isDrawerOpen ? 'hidden' : 'visible'));

  const onLogout = () => {
    dispatch(logoutSuccess());
    dispatch(push('/'));
  };

  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div>
            <button type="button" className={`hamburger close-sidebar-btn hamburger--elastic ${iconClass}`} onClick={onClick}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav" onClick={onClick}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>
      <h5 className="mb-1 d-none d-md-block">{title}</h5>
      <div className="app-header__menu">
        <span>
          <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6" />
            </span>
          </button>
        </span>
      </div>
      <div className="app-header__content">
        <div className="app-header-right">
          <ProfileDropDown
            handleDrawerMenu={() => dispatch(toggleDrawerMenu(null))}
            open={profile}
            onClick={(payload) => setProfileVisibility(payload)}
            onLogout={onLogout}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  isDrawerOpen: bool.isRequired,
  title: string.isRequired,
  user: shape({ name: string.isRequired }),
};

Header.defaultProps = { user: null };

export default Header;
