import React, { useEffect } from 'react';

const NotFound : React.FC = () => {
  useEffect(() => {
    document.title = 'exRap - 404';
  }, []);

  return (
    <div>
      <h1> 404 </h1>
    </div>
  );
};

export default NotFound;
