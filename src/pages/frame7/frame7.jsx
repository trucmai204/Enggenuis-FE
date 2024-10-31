import React from 'react';
import styles7 from './frame7.module.css';

export default function Main() {
  return (
    <div className={styles7.main_container}>
      <div className={styles7.rectangle}>
        <span className={styles7.lich_su}>Lịch sử</span>
        <div className={styles7.icon} />
      </div>
      <div className={styles7.flex_row_aae}>
        <div className={styles7.clock} />
        <div className={styles7.book_open}>
          <div className={styles7.icon_1} />
        </div>
        <div className={styles7.book}>
          <div className={styles7.icon_2} />
        </div>
        <div className={styles7.icon_3} />
        <div className={styles7.message_square}>
          <div className={styles7.icon_4} />
        </div>
      </div>
      <div className={styles7.flex_row}>
        <span className={styles7.tu_dien}>Từ điển</span>
        <span className={styles7.luyen_viet}>Luyện viết</span>
        <span className={styles7.bai_tap}>Bài tập</span>
        <span className={styles7.tu_van}>Tư vấn</span>
      </div>
      <div className={styles7.flex_row_ef}>
        <span className={styles7.cai_dat}>Cài đặt</span>
        <button className={styles7.rectangle_5}>
          <div className={styles7.icon_6} />
        </button>
      </div>
      <div className={styles7.flex_row_fc}>
        <button className={styles7.rectangle_7}>
          <div className={styles7.log_out}>
            <div className={styles7.icon_8} />
          </div>
        </button>
        <span className={styles7.dang_xuat}>Đăng xuất</span>
      </div>
    </div>
  );
}
