import React, { useState, useEffect } from 'react';

export default function Alert({ message }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {showAlert && (
        <div className="absolute rounded-md text-xs p-2 -top-7 text-red-500">
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
