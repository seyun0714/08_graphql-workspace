import { useState } from 'react';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  return (
    <>
      <UserList setSelectedUserId={setSelectedUserId} />
      {selectedUserId && <UserDetail userId={selectedUserId} />}
    </>
  );
}

export default App;
