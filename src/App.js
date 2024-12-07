import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Frame1 from './pages/main/main';
import Frame2 from './pages/Dictionary';
import Frame3 from './pages/Login';
import Frame4 from './pages/test/test';
import ChatbotInterface from './pages/ChatBot.js';
import Frame7 from './pages/history/history.jsx';
import Frame9 from './pages/Writting';
import Frame10 from './pages/account/account';
import RegisterPage from './pages/Register';
import DoTest from './pages/Assignment.js';

// Component App chính
function App() {
    const [notification, setNotification] = useState(''); // Trạng thái thông báo
    const isLoggedIn = !!localStorage.getItem('userId'); // Lấy userId từ localStorage

    const ProtectedRoute = ({ element }) => {
        if (!isLoggedIn) {
            setNotification('Bạn cần đăng nhập để sử dụng EngGenius'); // Cập nhật thông báo
            return <Navigate to="/login" replace />;
        }
        return element;
    };

    useEffect(() => {
        if (notification) {
            // Tự động ẩn thông báo sau 3 giây
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer); // Dọn dẹp timer khi component bị hủy
        }
    }, [notification]);

    return (
        <>
            {/* Hiển thị thông báo nếu có */}
            {notification && (
                <div style={{ backgroundColor: '#ffdddd', color: '#d8000c', padding: '10px', textAlign: 'center' }}>
                    {notification}
                </div>
            )}

            <Routes>
                <Route path="/login" element={<Frame3 />} />
                <Route path="/" element={<Frame1 />}/>
                <Route path="/dictionary" element={<ProtectedRoute element={<Frame2 />} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/test" element={<ProtectedRoute element={<Frame4 />} />} />
                <Route path="/advisory" element={<ProtectedRoute element={<ChatbotInterface />} />} />
                <Route path="/history" element={<ProtectedRoute element={<Frame7 />} />} />
                <Route path="/search" element={<ProtectedRoute element={<Frame9 />} />} />
                <Route path="/account" element={<ProtectedRoute element={<Frame10 />} />} />
                <Route path="/DoTest" element={<ProtectedRoute element={<DoTest />} />} />
            </Routes>
        </>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
