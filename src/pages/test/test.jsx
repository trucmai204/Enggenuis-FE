import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles4 from './frame4.module.css';

export default function Main() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };
  return (
    <div className={styles4.main_container}>
      <div className={styles4.topic_section}>
        <span className={styles4.topic_section_1}>Chủ đề cho bài tập:</span>
      </div>
      <div className={styles4.question_section}>
        <span className={styles4.question_section_2}>Số lượng câu hỏi:</span>
      </div>
      <div className={styles4.empty} />
      <div className={styles4.line} />
      <span className={styles4.so_luong_cau_hoi}>Số lượng câu hỏi từ 10 đến 100</span>
      <div className={styles4.chon_loai_cau_hoi}>
        <span className={styles4.chon_loai_cau_hoi_3}>Chọn loại câu hỏi</span>
      </div>
      <span className={styles4.most_suitable_word}>
        Most Suitable Word ( Chọn từ thích hợp nhất )
      </span>
      <div className={styles4.icon} />
      <span className={styles4.grammar}>Grammar ( Ngữ Pháp )</span>
      <div className={styles4.icon_4} />
      <span className={styles4.verb_conjugation}>
        Verb Conjugation ( Chia động từ )
      </span>
      <div className={styles4.icon_5} />
      <span className={styles4.reading_comprehension}>
        Reading Comprehension ( Đọc hiểu văn bản )
      </span>
      <div className={styles4.icon_6} />
      <span className={styles4.sentence_completion}>
        Sentence Completion ( Điền vào chỗ trống )
      </span>
      <div  className={styles4.icon_7} />
      <span className={styles4.exercise}>Bài tập</span>
      <div className={styles4.arrow_left_circle}>
        <div onClick={handleBackToHome} className={styles4.icon_8} />
      </div>
      <button className={styles4.suggestion_chip}>
        <div className={styles4.state_layer}>
          <span className={styles4.label_text}>Gợi ý</span>
        </div>
      </button>
      <div className={styles4.ex_traveling} />
      <div className={styles4.line_9} />
    </div>
  );
}
