import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles2 from './frame2.module.css';

export default function Main() {
  // Đặt `useNavigate` bên ngoài phần return
  const navigate = useNavigate();

  // Hàm xử lý quay về trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles2.main_container}>
      <span className={styles2.search_input}>Sản phẩm</span>
      <div className={styles2.rectangle}>
        <span className={styles2.weather}>The weather</span>
      </div>
      <span className={styles2.context}>Ngữ cảnh nếu có:</span>
      <div className={styles2.rectangle_1}>
        <span className={styles2.the_weather_today}>
          The weather is so beautiful today
          <br />
        </span>
      </div>
      <span className={styles2.loai_tu_dien}>Loại từ điển:</span>
      <div className={styles2.rectangle_2}>
        <span className={styles2.anh_viet}>Anh - Việt</span>
        <div className={styles2.icon} />
      </div>
      <button className={styles2.button}>
        <div className={styles2.state_layer}>
          <div className={styles2.label_text}>
            <span className={styles2.tra_cuu}>Tra cứu</span>
          </div>
        </div>
      </button>
      <span className={styles2.tu_dien}>Từ điển</span>
      {/* Nút quay về trang chủ */}
      <div className={styles2.arrow_left_circle}>
        <div onClick={handleBackToHome} className={styles2.icon_3} />
      </div>
    </div>
  );
}
