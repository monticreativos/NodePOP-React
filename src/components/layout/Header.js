import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Icon } from '../../assets/twitter.svg';

import './Header.css';
import AuthButton from '../auth/AuthButton';

function Header({ className }) {
  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <h1>NodePOP</h1>
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          // className={({ isActive }) => (isActive ? 'active' : '')}
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
        >
          New Advert
        </NavLink>
        <NavLink
          to="/adverts"
          // className={({ isActive }) => (isActive ? 'active' : '')}
          style={({ isActive }) => (isActive ? { color: 'green', margin: '0px 20px 0px 20px' } : null)}
          end
        >
          See all adverts
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
