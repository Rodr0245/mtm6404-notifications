import React from 'react';

function Notification({ children, onClear }) {
  return (
    <div className="motion-preset-blur-right-md motion-duration-1500 bg-white rounded-lg hover:shadow-lg transition ease duration-300 p-4 border border-gray-200 relative my-2 notificationItem">
      <div className="flex items-start ">
        <div className="flex-1 ">
          {children}
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 transition ease duration-300 rounded-full p-1 ml-2" onClick={onClear}>
          <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

export default Notification;