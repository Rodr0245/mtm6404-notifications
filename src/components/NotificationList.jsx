import React, { useState, useEffect } from 'react';
import initialNotifications from '../notifications';
import Notification from './Notification';

// My states
function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [removedNotifications, setRemovedNotifications] = useState([]);

  // This section is for adding notifications one by one
  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationIndex < initialNotifications.length) {
        setNotifications([...notifications, initialNotifications[notificationIndex]]);
        setNotificationIndex(notificationIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [notifications, notificationIndex]);

  // This section is for clearing notification
  const handleClearNotification = (id) => {
    const notificationToRemove = notifications.find(notification => notification.id === id);
    setRemovedNotifications([...removedNotifications, notificationToRemove]);
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // This section is for undoing a clear
  const handleUndoClear = () => {
    if (removedNotifications.length > 0) {
      const lastRemovedNotification = removedNotifications.pop();
      setNotifications([...notifications, lastRemovedNotification]);
    }
  };

  // This section is for clearing all notifications
  const handleClearAll = () => {
    setRemovedNotifications([...removedNotifications, ...notifications]);
    setNotifications([]);
  };

  return (
    <div className="w-96">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto h-[750px]">
        <h2 className="text-2xl font-semibold mb-4">Notifications ({notifications.length})</h2>
        <div className="btnGroup flex gap-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-full mb-4 transition ease duration-300 shadow-sm"
            onClick={handleClearAll}
          >
            Clear
          </button>
          {removedNotifications.length > 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full mb-4 transition ease duration-300 shadow-sm"
              onClick={handleUndoClear}
            >
              Undo
            </button>
          )}
        </div>
        <div className="">
          {notifications.map(notification => (
            <Notification key={notification.id} onClear={() => handleClearNotification(notification.id)}>
              <div className="flex items-center">
                <div className="flex-1">
                  <strong className="font-semibold">{notification.name}</strong>
                  <p className="text-gray-600">{notification.message}</p>
                </div>
              </div>
            </Notification>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;

