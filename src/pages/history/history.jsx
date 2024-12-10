import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { marked } from 'marked';
import styles7 from './frame7.module.css';

export default function Main() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchHistoryData = async () => {
      const userId = localStorage.getItem('userId');
      console.log('User ID:', userId);
      try {
        const response = await axios.get(`https://localhost:5000/User/History?userId=${userId}`, {
          headers: { 'accept': 'text/plain', 'Accept-Charset': 'utf-8' },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu lịch sử:', error);
        setErrorMessage('Không thể tải lịch sử người dùng. Vui lòng thử lại sau.');
      }
    };
    fetchHistoryData();
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  return (
    <div className={styles7.main_container}>
      <div className={styles7.rectangle}>
        <span className={styles7.lich_su}>Lịch sử</span>
        <div onClick={handleBackToHome} className={styles7.icon} />
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <TableContainer component={Paper}>
        <Table aria-label="user history table">
          <TableHead>
            <TableRow>
              <TableCell>Action Type</TableCell>
              <TableCell>Action Time</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => toggleRowExpansion(index)}>
                  <TableCell>
                    {row.actionTypeId === 1 ? 'Tra cứu từ điển' : row.actionTypeId === 2 ? 'Luyện viết' : 'Làm bài tập'}
                  </TableCell>
                  <TableCell>{new Date(row.actionTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton>
                      {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={expandedRows[index]} timeout="auto" unmountOnExit>
                      <div style={{ margin: '10px' }}>
                        <strong>Chi tiết hành động:</strong>
                        <p><strong>Input:</strong> {row.input}</p>
                        <div>
                          <strong>Output:</strong>
                          {/* Chuyển đổi Markdown thành HTML và hiển thị */}
                          <div
                            dangerouslySetInnerHTML={{ __html: marked(row.output || '') }}
                            style={{ maxHeight: '200px', overflow: 'auto' }}
                          />
                        </div>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
