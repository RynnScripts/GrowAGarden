import PetGrid from '../PetGrid';

export default function PetGridExample() {
  return (
    <div className="max-w-4xl">
      <PetGrid onSelectionChange={(selection) => console.log('Pets selected:', selection)} />
    </div>
  );
}