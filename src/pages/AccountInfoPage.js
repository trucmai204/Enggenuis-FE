import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Box, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem, FormHelperText, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AccountInfoPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");
  const [levelId, setLevelId] = useState(parseInt(localStorage.getItem("levelId")));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7198/User/GetUserById`,
          {
            params: {
              userId: userId,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `https://localhost:7198/User/Update?userId=${userId}`,
        {
          name: user.name,
          password: user.password,
          apiKey: user.apiKey,
          levelId:levelId,
        }   
      );
      
      localStorage.setItem("name", user.name); // Cập nhật username
      localStorage.setItem("levelId", user.levelId);   // Cập nhật cấp độ nếu cần
  
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update user information.");
    }
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleBack = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Thông tin người dùng
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          maxWidth: 500,
          margin: "0 auto",
          marginTop: 3,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Quản lý tài khoản
        </Typography>
        <TextField
          label="Tên"
          value={user.name || ""}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("name", e.target.value)}
          InputProps={{ readOnly: !isEditing }}
        />
        <TextField
          label="Mật khẩu"
          value={user.password || ""}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("password", e.target.value)}
          InputProps={{ readOnly: !isEditing }}
        />
        <TextField
          label="API Key"
          value={user.apiKey || ""}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("apiKey", e.target.value)}
          InputProps={{ readOnly: !isEditing }}
        />
        {isEditing ? (
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Cấp độ</InputLabel>
            <Select
              value={levelId}
              onChange={(e) => setLevelId(e.target.value)}
              label="Cấp độ"
            >
              <MenuItem value={1}>Người mới bắt đầu</MenuItem>
              <MenuItem value={2}>Sơ cấp</MenuItem>
              <MenuItem value={3}>Trung cấp</MenuItem>
              <MenuItem value={4}>Trung cao cấp</MenuItem>
              <MenuItem value={5}>Cao cấp</MenuItem>
              <MenuItem value={6}>Thành thạo</MenuItem>
            </Select>
            <FormHelperText>Chọn cấp độ của bạn</FormHelperText>
          </FormControl>
        ) : (
          <TextField
            label="Cấp độ"
            value={levelId}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {!isEditing ? (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Chỉnh sửa
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleSave}>
              Lưu
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AccountInfoPage;
