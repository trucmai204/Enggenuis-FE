import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frame1 from './pages/frame1/frame1';
import Frame2 from './pages/frame2/frame2';
import Frame3 from './pages/frame3/frame3';
import Frame4 from './pages/frame4/frame4';
import Frame5 from './pages/frame5/frame5';
import Frame7 from './pages/frame7/frame7';
import Frame9 from './pages/frame9/frame9';
import Frame10 from './pages/frame10/frame10';

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