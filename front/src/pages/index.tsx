import type { NextPage } from 'next';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  const socket = io('http://localhost:5000');
  socket.on('test', socket => {
    console.log(socket);
  });
  const handleRequestSocket = () => {
    socket.emit('test', {
      data: 'test socket on client',
    });
  };
  function handleChange() {
    console.log('change handle');
  }
  return (
    <div>
      <button type="button" onClick={handleRequestSocket}>
        Request
      </button>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Home;
