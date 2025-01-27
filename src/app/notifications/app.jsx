import React from 'react';
import Navbar from '../../components/notifications/Navbar';
import NotificationsContent from '../../components/notifications/NotificationsContent'
import InfoPanel from '../../components/notifications/InfoPanel';
import '../styles-as.css'; // Importing global styles under different name

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="mainContent">
        <NotificationsContent />
        
      </div>
    </div>
  );
}