import React from 'react';
import styles10 from './frame10.module.css';

export default function Main() {
  return (
    <div className={styles10.main_container}>
      <div className={styles10.rectangle}>
        <div className={styles10.rectangle_1}>
          <div className={styles10.icon} />
          <span className={styles10.english_learning}>English Learning</span>
          <div className={styles10.flex_row_ba}>
            <div className={styles10.edit}>
              <div className={styles10.icon_2} />
            </div>
            <div className={styles10.book}>
              <div className={styles10.icon_3} />
            </div>
            <div className={styles10.message_square}>
              <div className={styles10.icon_4} />
            </div>
            <div className={styles10.clock}>
              <div className={styles10.icon_5} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles10.rectangle_6}>
        <span className={styles10.quang_mai}>Quang Mai</span>
        <div className={styles10.user_check}>
          <div className={styles10.icon_7} />
        </div>
        <span className={styles10.tran_quang_mai}>Trần Quang Mai</span>
        <span className={styles10.email}>email: 123@gmail.com</span>
        <div className={styles10.line} />
        <button className={styles10.button}>
          <div className={styles10.state_layer}>
            <div className={styles10.label_text}>
              <span className={styles10.logout}>Logout</span>
            </div>
          </div>
        </button>
        <button className={styles10.button_8}>
          <div className={styles10.state_layer_9}>
            <div className={styles10.label_text_a}>
              <span className={styles10.setting}>Setting</span>
            </div>
          </div>
        </button>
        <div className={styles10.book_open}>
          <div className={styles10.icon_b} />
        </div>
      </div>
      <div className={styles10.rectangle_c}>
        <div className={styles10.rectangle_d}>
          <span className={styles10.lich_su}>Lịch sử</span>
        </div>
      </div>
      <div className={styles10.rectangle_e}>
        <span className={styles10.luyen_viet}>Luyện viết</span>
      </div>
      <div className={styles10.rectangle_f}>
        <span className={styles10.tu_van}>Tư vấn</span>
      </div>
      <div className={styles10.rectangle_10}>
        <span className={styles10.bai_tap}>Bài tập</span>
      </div>
      <div className={styles10.rectangle_11}>
        <span className={styles10.tu_dien}>Từ điển</span>
      </div>
    </div>
  );
}
