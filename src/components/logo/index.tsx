import * as React from 'react';
import './logo.less'
const logo = require('../../assets/frog.svg')
const styles = {
  width: 128,
  fontSize: '32px',
  fontWeight: 400 as any,
  color: '#a7b7c2'
};

export default function Logo({ size = 34, textColor = '#a7b7c2' }) {
  return (
    <div className="flex items-center logo-container" style={ { color: textColor } }>
      <img src={ logo } alt="logo" style={ { width: size } } />
      <span >excited</span>
      <span className="rotate-text" >!</span>
    </div>
  );
}
