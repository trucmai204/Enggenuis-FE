// Main.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles9 from './frame9.module.css';

export default function Main() {
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Component NavBar được định nghĩa ngay trong file Main.js
  const NavBar = () => (
    <div style={navbarStyle}>
      <button onClick={() => navigate('/')} style={backButtonStyle}> {/* Sử dụng navigate */}
        <i className="fas fa-arrow-left" style={{ fontSize: '18px', color: 'black' }}></i>
      </button>
      <h1 style={titleStyle}>LUYỆN VIẾT</h1>
    </div>
  );

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    alert("Nội dung đánh giá: " + content);
  };

  return (
    <>
      <NavBar /> {/* Hiển thị NavBar ở đầu trang */}
      <div className={styles9.container}>
        <label htmlFor="writingContent" className={styles9.label}>
          Nội dung bài viết của bạn *
        </label>
        <textarea
          id="writingContent"
          className={styles9.textarea}
          value={content}
          onChange={handleContentChange}
          placeholder="Ex: My name is EngAce. I live in Vietnam. I work in a small software company. I like to listen to music and watch movies. English is very hard for me. I have learned English for a long time. My speech is not clear, making it hard for people to understand. I feel shy when I speak English. I want to improve for my job and future."
        />
        <button className={styles9.submitBtn} onClick={handleSubmit}>
          ĐÁNH GIÁ
        </button>
      </div>
    </>
  );
}

// Style cho NavBar
const navbarStyle = {
  backgroundColor: '#ff7f50',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  fontSize: '1.8em',
  fontWeight: 'bold',
  color: 'white',
};

// Style cho nút Back
const backButtonStyle = {
  position: 'absolute',
  left: '20px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
};
