import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frame1 from './pages/main/main';
import Frame2 from './pages/dictionary/dictionary';
import Frame3 from './pages/login/login';
import Frame4 from './pages/test/test';
import Frame5 from './pages/advisory/advisory';
import Frame7 from './pages/history/history';
import Frame9 from './pages/writting/writting';
import Frame10 from './pages/account/account';

// Import các frame khác tương tự
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Frame1 />} />
                <Route path="/dictionary" element={<Frame2 />} />
                <Route path="/login" element={<Frame3 />} />
                <Route path="/test" element={<Frame4 />} />
                <Route path="/advisory" element={<Frame5 />} />
                <Route path="/history" element={<Frame7 />} />
                <Route path="/search" element={<Frame9 />} />
                <Route path="/account" element={<Frame10 />} />
                {/* Thêm các route cho các frame khác */}
            </Routes>
        </Router>
    );
}

export default App;