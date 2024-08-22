import React from 'react';
import { Spin } from 'antd';

const Loader = ({ loading, children, minHeight, global }) => {
  return (
    <div style={{ position: 'relative', minHeight: minHeight || 'auto' }}>
      {loading && (
        <div
          style={{
            position: global ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            zIndex: 300,
            width: '100%',
            height: '100%',
            minHeight: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
          }}
        >
          <Spin />
        </div>
      )}
      {children}
    </div>
  );
};

export default Loader;
