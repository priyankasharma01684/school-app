import React from 'react';
import { Helmet } from 'react-helmet';
import { any, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { Drawer, Footer, Header } from '../components';
import { USER_SCHOOL_ADMIN, USER_PARENT, USER_STUDENT, USER_TEACHER } from '../constants';

const PublicLayout = ({
  children, title,
}) => {
  const {
    activeDrawerMenu, drawer, user,
  } = useSelector((store) => ({
    activeDrawerMenu: store.app.activeDrawerMenu,
    drawer: store.app.drawer,
    user: store.user.userDetail,
  }));
  const isDrawerOpen = drawer === 'visible';
  const drawerClass = isDrawerOpen ? '' : 'closed-sidebar';
  const schoolName = [USER_SCHOOL_ADMIN, USER_PARENT, USER_STUDENT, USER_TEACHER].includes(user?.user_type_id) ? user.name.capitalizeEachLetter() : '';

  return (
    <div className={`app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header ${drawerClass}`}>
      <Helmet>
        <title>{`${title} - Skulman`}</title>
      </Helmet>
      <Header isDrawerOpen={isDrawerOpen} title={schoolName} user={user} />
      <div className="app-main">
        <Drawer user={user} activeDrawerMenu={activeDrawerMenu} />
        <div className="app-main__outer">
          <div className="app-main__inner">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

PublicLayout.propTypes = {
  children: any.isRequired,
  title: string.isRequired,
};

export default PublicLayout;
