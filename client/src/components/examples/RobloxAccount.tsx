import RobloxAccount from '../RobloxAccount';

export default function RobloxAccountExample() {
  return (
    <div className="max-w-2xl">
      <RobloxAccount onProfileLoaded={(profile) => console.log('Profile loaded:', profile)} />
    </div>
  );
}