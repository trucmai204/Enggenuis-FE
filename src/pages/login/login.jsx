import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng
import styles3 from './frame3.module.css';

export default function Main() {
  const [email, setEmail] = useState(''); // Khởi tạo state cho email
  const [password, setPassword] = useState(''); // Khởi tạo state cho password
  const navigate = useNavigate(); // Khởi tạo hook để điều hướng trang

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn việc reload trang
    try {
      const response = await fetch(
        `https://enggeinus.azurewebsites.net/User/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: 'GET',
          headers: {
            'accept': 'text/plain',
          },
        }
      );
      
      if (response.ok) {
        const data = await response.text();
        console.log('Đăng nhập thành công:', data);
        navigate('/frame1'); // Điều hướng sau khi đăng nhập thành công
      } else {
        console.error('Đăng nhập thất bại:', response.status);
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  
  return (
    <div className={styles3.main_container}>
      {/* Avatar Placeholder */}
      <div className={styles3.generic_avatar}>
        <div className={styles3.avatar_placeholder} />
      </div>

      {/* Input cho Email */}
      <div className={styles3.gmail}>
        <input
          type="email"
          className={styles3.gmail_1}
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Cập nhật email khi người dùng nhập
        />
      </div>

      {/* Input cho Password */}
      <div className={styles3.password_input}>
        <input
          type="password"
          className={styles3.password_text}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Cập nhật password khi người dùng nhập
        />
      </div>

      {/* Nút Login */}
      <button className={styles3.button} onClick={handleSubmit}>
        <div className={styles3.state_layer}>
          <span className={styles3.login_label_text}>Login</span>
        </div>
      </button>
    </div>
  );
}
