import React, { useState } from 'react';
import createClient from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import Setup from './components/Setup';


const App: React.FC = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);

  const handleSelection = (numberOfPlayers: number) => {
    setPlayerCount(numberOfPlayers);
  }

  let Client;
  if (playerCount) {
    Client = createClient(playerCount);
  }

  return (
    <div>
      {
          Client ?
            <Client /> :
            <Setup handleSelection={handleSelection} />
        }
    </div>
  );
}

export default App;
