import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles1 from "./frame1.module.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy tên người dùng từ localStorage khi trang được tải
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleNavigation = () => {
    navigate("/AccountInfoPage"); // Chuyển đến trang User
  };

  return (
    <div className="main">
      <div className={styles1.main_container}>
        <div className={styles1.rectangle}>
          <div className={styles1.rectangle_1}>
            <div
              className={styles1.flex_row_caf}
              onClick={handleNavigation}
              style={{ cursor: "pointer" }}
            >
              <div className={styles1.icon} />
              {/* Hiển thị tên người dùng */}
              <span className={styles1.quang_mai}>
                {username || "Người dùng"}
              </span>
            </div>
            <span className={styles1.english_learning}>EngGenius</span>
            <div className={styles1.flex_row_f}>
              <div className={styles1.edit}>
                <div className={styles1.icon_2} />
              </div>
              <div className={styles1.book_open}>
                <div className={styles1.icon_3} />
              </div>
              <div className={styles1.book}>
                <div className={styles1.icon_4} />
              </div>
              <div className={styles1.message_square}>
                <div className={styles1.icon_5} />
              </div>
              <div className={styles1.clock}>
                <div className={styles1.icon_6} />
              </div>
            </div>
          </div>
        </div>

        <Link to="/history" className={styles1.rectangle_7}>
          <div className={styles1.rectangle_8}>
            <span className={styles1.lich_su}>Lịch sử</span>
          </div>
        </Link>

        <Link to="/search" className={styles1.rectangle_9}>
          <span className={styles1.luyen_viet}>Luyện viết</span>
        </Link>

        <Link to="/advisory" className={styles1.rectangle_a}>
          <span className={styles1.tu_van}>Tư vấn</span>
        </Link>

        <Link to="/test" className={styles1.rectangle_b}>
          <span className={styles1.bai_tap}>Bài tập</span>
        </Link>

        <Link to="/dictionary" className={styles1.rectangle_c}>
          <span className={styles1.tu_dien}>Từ điển</span>
        </Link>
      </div>
    </div>
  );
}
