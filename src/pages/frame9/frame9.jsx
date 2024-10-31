import React from 'react';
import styles9 from './frame9.module.css';

export default function Main() {
  return (
    <div className={styles9.main_container}>
      <div className={styles9.rectangle}>
        <span className={styles9.tra_cuu}>Tra cứu</span>
        <div className={styles9.arrow_left_circle}>
          <div className={styles9.icon} />
        </div>
      </div>
      <div className={styles9.flex_row}>
        <span className={styles9.weather}>Weather</span>
        <span className={styles9.thoi_tiet_tiet_troi}>Thời tiết, tiết trời</span>
        <div className={styles9.icon_1} />
      </div>
      <div className={styles9.flex_row_ca}>
        <span className={styles9.noun}>noun</span>
        <span className={styles9.wea_ther}> /ˈweð.ɚ/</span>
      </div>
      <div className={styles9.line} />
      <div className={styles9.weather_description}>
        <span className={styles9.quote}> “ </span>
        <span className={styles9.weather_2}>Weather </span>
        <span className={styles9.quote_3}>
          ” là các điều kiện trong không khí trên trái đất như gió, mưa hoặc
          nhiệt độ, đặc biệt là một thời điểm cụ thể tại một khu vực cụ thể
        </span>
      </div>
      <div className={styles9.rectangle_4}>
        <div className={styles9.example}>
          <span className={styles9.example_5}>Ví dụ:</span>
        </div>
        <div className={styles9.add_circle}>
          <div className={styles9.icon_6} />
        </div>
        <span className={styles9.weather_clear}>
          The weather is expected to remain clear for the next few days
        </span>
        <div className={styles9.add_circle_7}>
          <div className={styles9.icon_8} />
        </div>
        <span className={styles9.fair_weather}>
          Fair weather was forecast for the following day
        </span>
        <div className={styles9.add_circle_9}>
          <div className={styles9.icon_a} />
        </div>
        <span className={styles9.good_weather}>
          The weather was good at the start of week
        </span>
        <div className={styles9.add_circle_b}>
          <div className={styles9.icon_c} />
        </div>
        <span className={styles9.bad_weather}>
          The rescue operation has been complicated by bad weather
        </span>
      </div>
    </div>
  );
}
