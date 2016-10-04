import * as React from 'react';
const LogoImage = require('../../assets/rangleio-logo.svg');

const styles = {
  width: 128,
  fontSize: "40px",
  fontWeight: "500",
};

export default function Logo() {
  return (
    <div className="flex items-center">
      <div style={ styles }> Hole</div>
    </div>
  );
}
