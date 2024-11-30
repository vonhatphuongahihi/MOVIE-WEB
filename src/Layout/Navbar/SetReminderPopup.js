import React, { useState } from 'react';
import styled from 'styled-components';

const PopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const TimeInput = styled.input`
  width: 50px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #28BD11;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #23a30f;
  }
`;

function SetReminderPopup({ onClose }) {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleSetReminder = () => {
    alert(`Đã hẹn giờ đi ngủ lúc ${hours} giờ ${minutes} phút!`);
    onClose(); // Đóng popup sau khi đã thiết lập nhắc nhở
  };

  return (
    <PopupBackdrop>
      <PopupContainer>
        <h2>Hẹn Giờ Đi Ngủ</h2>
        <div>
          <TimeInput 
            type="number" 
            placeholder="Giờ" 
            value={hours}
            onChange={(e) => setHours(e.target.value)} 
          />
          <span>:</span>
          <TimeInput 
            type="number" 
            placeholder="Phút" 
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)} 
          />
        </div>
        <Button onClick={handleSetReminder}>Xác Nhận</Button>
        <Button onClick={onClose} style={{ marginLeft: '10px', backgroundColor: '#f44336' }}>
          Đóng
        </Button>
      </PopupContainer>
    </PopupBackdrop>
  );
}