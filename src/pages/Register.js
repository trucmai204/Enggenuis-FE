import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [levelId, setLevelId] = useState('');
  const [apiKey, setApiKey] = useState(''); // Thêm state cho API key
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      password,
      apiKey, // Gửi API key cùng các thông tin khác
      levelId: parseInt(levelId),
    };

    try {
      const response = await axios.post('https://localhost:5000/User/Register', userData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        console.log('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="API Key"  // Thêm trường API key
          variant="outlined"
          fullWidth
          margin="normal"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}  // Cập nhật giá trị API key
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Level</InputLabel>
          <Select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            label="Level"
          >
            <MenuItem value={1}>Beginner (Người mới bắt đầu)</MenuItem>
            <MenuItem value={2}>Elementary (Sơ cấp)</MenuItem>
            <MenuItem value={3}>Intermediate (Trung cấp)</MenuItem>
            <MenuItem value={4}>Upper-Intermediate (Trung cao cấp)</MenuItem>
            <MenuItem value={5}>Advanced (Cao cấp)</MenuItem>
            <MenuItem value={6}>Proficient (Thành thạo)</MenuItem>
          </Select>
          <FormHelperText>Choose your level</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
        <Typography variant="body2" align="center" sx="mt: 10">
            Nếu bạn đã có tài khoản{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </Link>
          </Typography>
      </form>
    </div>
  );
};

export default RegisterPage;
