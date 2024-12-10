import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Container, TextField, Typography, Box, Alert, CircularProgress, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://localhost:5000/User/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        }
      );
  
      setLoading(false);
  
      if (response.ok) {
        const data = await response.json(); // Parse dữ liệu JSON từ API
        console.log('Đăng nhập thành công:', data);
  
        // Lưu userId vào localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', data.name);
        localStorage.setItem('api', data.apiKey);
        localStorage.setItem('levelId', data.level.id);
        localStorage.setItem('permission', data.permission.id);

        navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
        window.location.reload();
      } else {
        const errorMessage = response.status === 400 ? 'Sai email hoặc mật khẩu!' : 'Đăng nhập thất bại. Vui lòng thử lại!';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setLoading(false);
      setError('Đã có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Login'
            )}
          </Button>

          {/* Dòng đăng ký tài khoản */}
          <Typography variant="body2" align="center">
            Bạn chưa có tài khoản sao?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/register')}
            >
              Hãy đăng ký tại đây
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
