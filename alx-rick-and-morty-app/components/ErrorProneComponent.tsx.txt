import React, { useEffect } from 'react';

const ErrorProneComponent: React.FC = () => {
  useEffect(() => {
    throw new Error('This is a test error!');
  }, []);

  return null;
};

export default ErrorProneComponent;
