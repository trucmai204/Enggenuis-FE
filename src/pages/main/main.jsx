import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles1 from "./frame1.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar và Alert từ MUI

export default function Main() {
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Trạng thái hiển thị Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nội dung Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // Độ nghiêm trọng: "success", "error", "info", "warning"
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const params = new URLSearchParams(window.location.search);
    const status = params.get("vnp_TransactionStatus");
    if (status !== null) {
      if (status === "00") {
        upadateUserPermission();
      } else {
        showSnackbar("Thanh toán không thành công!", "error");
      }
    }
  }, []);

  const upadateUserPermission = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://localhost:5000/User/UpadateUserPermission?userId=${userId}`,
        {
          method: "POST",
          headers: {
            accept: "/",
          },
        }
      );

      if (response.ok) {
        localStorage.setItem("permission", 2);
        showSnackbar("Cập nhật quyền người dùng thành công!", "success");
      } else {
        showSnackbar("Không thể cập nhật người dùng.", "error");
      }
    } catch (error) {
      showSnackbar("Đã xảy ra lỗi khi cập nhật quyền người dùng.", "error");
    }
  };

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const handleUpgradeInfor = async () => {
    const permission = localStorage.getItem("permission");
    const userId = localStorage.getItem("userId");
    if (permission == 1) {
      const money = 100000;
      try {
        const apiUrl = `https://localhost:5000/api/Payment/Create?userId=${userId}&money=${money}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const paymentUrl = await response.text();
        window.location.href = paymentUrl;
      } catch (error) {
        showSnackbar("Lỗi khi tạo link thanh toán.", "error");
      }
    }
  };

  const handleAccountInfo = () => {
    navigate("/AccountInfoPage");
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="main">
      <div className={styles1.main_container}>
        <div className={styles1.rectangle}>
          <div className={styles1.rectangle_1}>
            <div
              className={styles1.flex_row_caf}
              onClick={handleMenuToggle}
              style={{ cursor: "pointer" }}
            >
              <div className={styles1.icon} />
              <span className={styles1.quang_mai}>
                {username || "Người dùng"}
              </span>
            </div>
            {showMenu && (
              <div className={styles1.menu}>
                <div className={styles1.menu_item} onClick={handleAccountInfo}>
                  Thông tin tài khoản
                </div>
                <div className={styles1.menu_item} onClick={handleUpgradeInfor}>
                  Nâng hạng
                </div>
                <div className={styles1.menu_item} onClick={handleLogout}>
                  Đăng xuất
                </div>
              </div>
            )}
            <span className={styles1.english_learning}>EngGenius</span>
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

      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
