import { useState } from 'react';
import SelectedItems from '../SelectedItems';

export default function SelectedItemsExample() {
  const [count, setCount] = useState(3);

  return (
    <div className="max-w-md">
      <SelectedItems 
        selectedCount={count} 
        onClaimSelected={() => {
          console.log('Claim selected triggered!');
          setCount(0);
        }} 
      />
    </div>
  );
}