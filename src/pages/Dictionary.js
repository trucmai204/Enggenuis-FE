import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { marked } from "marked";

export default function Main() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState();
  const [context, setContext] = useState();
  const [dictionaryType, setDictionaryType] = useState(0);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm xử lý quay lại trang chủ
  const handleBackToHome = () => {
    navigate("/");
  };

  // Hàm gọi API tra cứu từ
  const handleSearch = async () => {
    setIsLoading(true); // Bắt đầu loading
    setError(null); // Xóa lỗi cũ nếu có

    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      const response = await axios.get(
        `https://localhost:7198/api/Dictionary/Search?userId=${userId}&keyword=${keyword}`,
        {
          headers: {
            accept: "text/plain",
            "accept-charset": "utf-8",
          },
        }
      );

      setResult(marked(response.data));
    } catch (error) {
      console.error("Lỗi khi tra cứu từ:", error);
      setError("Đã xảy ra lỗi khi tra cứu từ. Vui lòng thử lại sau."); // Đặt thông báo lỗi
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Nút quay lại */}
      <Box style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <IconButton onClick={handleBackToHome}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Cột bên trái (Form nhập liệu) */}
        <Grid item xs={12} md={6}>
          <Paper
            style={{ padding: "1rem", borderRadius: "8px", maxWidth: "50vw" }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Từ điển
            </Typography>

            {/* Trường từ */}
            <Typography variant="body1" gutterBottom align="left">
              Từ:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />

            {/* Trường ngữ cảnh */}
            <Typography variant="body1" gutterBottom align="left">
              Ngữ cảnh nếu có:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />

            {/* Chọn loại từ điển */}
            <Typography variant="body1" gutterBottom align="left">
              Loại từ điển:
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Loại từ điển
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dictionaryType}
                onChange={(e) => setDictionaryType(e.target.value)}
                label="Loại từ điển"
              >
                <MenuItem value={0}>Anh-Việt</MenuItem>
                <MenuItem value={1}>Việt-Anh</MenuItem>
              </Select>
            </FormControl>

            {/* Nút tra cứu */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSearch}
              sx={{ marginTop: "1rem" }}
              disabled={isLoading} // Vô hiệu hóa khi đang loading
            >
              {isLoading ? <CircularProgress size={24} /> : "Tra cứu"}{" "}
              {/* Loading icon */}
            </Button>
          </Paper>
        </Grid>

        {/* Cột bên phải (Hiển thị kết quả) */}
        <Grid item xs={12} md={6}>
          <Paper
            style={{
              padding: "1rem",
              borderRadius: "8px",
              maxHeight: "80vh",
              overflow: "auto",
              maxWidth: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Kết quả:
            </Typography>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Hiển thị kết quả tra cứu */}
            {result ? (
              <div dangerouslySetInnerHTML={{ __html: result }} />
            ) : (
              !error && <Typography variant="body1">Chưa có kết quả</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
