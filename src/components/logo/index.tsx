import * as React from 'react';

const styles = {
  width: 128,
  fontSize: '32px',
  fontWeight: 400 as any,
  color: '#a7b7c2'
};

export default function Logo() {
  return (
    <div className="flex items-center">
      <div style={ styles }> Hole</div>
    </div>
  );
}
