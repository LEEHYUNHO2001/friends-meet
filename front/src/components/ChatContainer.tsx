import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import { io } from 'socket.io-client';

export const ChatContainer = () => {
  const socket = io('http://localhost:5000');
  const [userInput, setUserInput] = useState<string>('');

  socket.on('test', socket => {
    console.log(socket);
  });

  const handleRequestSocket = () => {
    socket.emit('test', {
      data: userInput,
    });
  };

  const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <ChatForm>
        <ChatTextarea onChange={handleUserInput} value={userInput} />
        <ChatSubmitBtn type="button" onClick={handleRequestSocket}>
          전송
        </ChatSubmitBtn>
      </ChatForm>
    </div>
  );
};

const ChatForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ChatTextarea = styled.textarea`
  width: 80%;
  height: 200px;
  border: 1px solid #000;
`;
const ChatSubmitBtn = styled.button`
  width: 10%;
  height: 50px;
  border: 1px solid #000;
`;
