import { useState } from 'react';
import AdminPanel from '../AdminPanel';

export default function AdminPanelExample() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="h-screen relative">
      <AdminPanel 
        isVisible={isVisible} 
        onToggle={() => setIsVisible(!isVisible)} 
      />
    </div>
  );
}