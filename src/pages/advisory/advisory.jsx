import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles5 from './frame5.module.css';

export default function Main() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };
  return (
    <div className={styles5.main_container}>
      <div className={styles5.rectangle}>
        <div className={styles5.arrow_left_circle}>
          <div onClick={handleBackToHome} className={styles5.icon} />
        </div>
        <span className={styles5.tu_van}>Tư vấn</span>
        <div className={styles5.icon_1} />
      </div>
      <div className={styles5.rectangle_2}>
        <div className={styles5.rectangle_3}>
          <span className={styles5.aaa}>Aaa</span>
        </div>
        <div className={styles5.send}>
          <div className={styles5.icon_4} />
        </div>
      </div>
    </div>
  );
}
