import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/default_profile.png';
import './Photo.css';

const Photo = ({ className, photo, ...props }) => (
  <img
    className={classNames('photo', className)}
    src={photo ? photo : defaultPhoto}
    alt=""
    {...props}
  />
);

export default Photo;
