import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, AppBar, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { marked } from "marked";

export default function Main() {
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');  // Thêm state cho chủ đề
  const [openDialog, setOpenDialog] = useState(false); // Quản lý trạng thái hộp thoại
  const [result, setResult] = useState(''); // Kết quả đánh giá trả về
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(''); // Thông báo lỗi
  const navigate = useNavigate();

  // Component NavBar được định nghĩa ngay trong file Main.js
  const NavBar = () => (
    <AppBar position="static" sx={{ backgroundColor: '#FFB6C1' }}>
      <Toolbar>
        <Button 
          onClick={() => navigate('/')} 
          sx={{
            color: 'black', 
            marginRight: '20px', 
            minWidth: 'auto',
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          LUYỆN VIẾT
        </Typography>
      </Toolbar>
    </AppBar>
  );

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTopicChange = (event) => {  // Hàm xử lý thay đổi chủ đề
    setTopic(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Bắt đầu loading khi gửi yêu cầu
    setError(''); // Reset lỗi trước khi gọi API

    try {
      const userId = localStorage.getItem('userId');
      console.log('User ID:', userId);

      const response = await fetch(`https://localhost:7198/api/Writing/Review?userId=${userId}`, {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic, // Gửi chủ đề
          content: content, // Gửi nội dung bài viết
        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi khi gọi API');
      }

      const data = await response.text(); // Nhận kết quả trả về dưới dạng văn bản (Markdown)
      setResult(marked(data)); // Cập nhật kết quả vào state
      setOpenDialog(true); // Mở hộp thoại hiển thị kết quả
    } catch (error) {
      setError('Lỗi khi gửi yêu cầu. Vui lòng thử lại!');
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 'auto', maxHeight: 'auto', margin: '0 auto', padding: '20px', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <TextField
          label="Chủ đề"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={handleTopicChange} // Sử dụng handleTopicChange cho chủ đề
          sx={{
            marginBottom: '20px',
            backgroundColor: '#FFF',
            borderRadius: '4px',
          }}
        />
        <TextField
          label="Nội dung bài viết của bạn"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={handleContentChange}
          placeholder="Ex: My name is Engenius. I live in Vietnam. I work in a small software company..."
          sx={{
            maxHeight: '500px',
            marginBottom: '20px',
            backgroundColor: '#FFF',
            borderRadius: '4px',
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          disabled={loading} // Vô hiệu hóa nút khi đang loading
          sx={{
            backgroundColor: '#FFB6C1',
            color: 'white',
            '&:hover': {
              backgroundColor: '#FF8C94',
            },
            width: '30%',
            padding: '10px',
            borderRadius: '4px',
            alignItems: 'center',
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'ĐÁNH GIÁ'}
        </Button>

        {/* Hiển thị thông báo lỗi nếu có */}
        <Snackbar
          open={!!error}
          message={error}
          autoHideDuration={4000}
          onClose={() => setError('')}
        />
      </div>

      {/* Hộp thoại hiển thị kết quả đánh giá */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Kết quả đánh giá</DialogTitle>
        <DialogContent>
          {result ? (
            <div dangerouslySetInnerHTML={{ __html: result }} />
          ) : (
            <Typography variant="body1">Chưa có kết quả</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
