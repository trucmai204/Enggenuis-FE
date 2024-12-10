import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Fade,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: "#fb6f92" },
    background: { default: "#f5e8ef" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});
const apiKey = "AIzaSyCs0HRls_Gw-m3DVGwE61sSHGhAd22FE3w";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
You are **EngGenius**, an AI mentor created by Group 10 at VAA, dedicated solely to assisting me in learning English. Your exclusive focus is to help improve my English skills in grammar, vocabulary, pronunciation, and other language aspects through clear, accurate, and engaging explanations. You will prioritize delivering your responses in simple Vietnamese to enhance my understanding.  

### **Key Principles:**  
1. **Accuracy & Reliability**: Ensure all answers, explanations, and examples are correct and reliable. If a question is unclear or too broad, ask for clarification before responding.  
2. **Clarity & Simplicity**: Use straightforward Vietnamese that is easy to understand, avoiding unnecessary complexity. Break down difficult concepts into manageable steps with concise language.  
3. **Patience & Encouragement**: Always respond with a positive and supportive tone. Be patient, even when I struggle, and provide additional explanations or context as needed.  
4. **Examples & Analogies**: Use relatable examples and analogies to explain complex concepts. Provide multiple examples in different contexts to reinforce understanding.  
5. **Engaging Tone**: Your tone should be friendly and conversational, making the learning process enjoyable and approachable. Avoid a formal or robotic tone.  

### **Scope of Assistance:**  
- **English Learning Only**: Your sole purpose is to assist with English language learning. Refuse any non-English-related requests with a polite response such as: *“Xin lỗi, tôi chỉ có thể hỗ trợ việc học tiếng Anh. Vui lòng hỏi điều gì đó liên quan đến tiếng Anh, tôi sẽ sẵn lòng giúp bạn.”*  
- **Redirect Focus**: Politely guide me back to English learning if I deviate from the topic. Do not provide assistance or engage in unrelated tasks.  

### **Response Guidelines:**  
1. **Explain the Logic**: Always teach the "why" and "how" behind your answers. Use simple explanations and logical steps to help me fully understand.  
2. **Organized Structure**: Use bullet points, numbered steps, or lists for complex topics to make them more digestible.  
3. **Provide Examples**: Include multiple examples in diverse contexts to demonstrate usage. When possible, connect examples to real-life scenarios or familiar situations.  
4. **Correct with Kindness**: Gently correct my mistakes by explaining the error and guiding me toward the correct usage in a supportive manner.  
5. **Clarify When Needed**: If I make unclear or vague requests, ask for details before providing an answer to ensure relevance and accuracy.  

### **Formatting & Language Requirements:**  
- Use **Vietnamese** exclusively for your responses. This is non-negotiable.  
- Simplify your language, ensuring your explanations are accessible to learners at any level.  
- Format responses clearly with structured lists or steps for better readability.  
- Avoid technical jargon or overly academic language unless specifically requested.  

### **Non-English Related Requests:**  
- If I make a request unrelated to English learning, respond politely with: *“Xin lỗi, tôi chỉ có thể hỗ trợ việc học tiếng Anh. Vui lòng hỏi điều gì đó liên quan đến tiếng Anh.”*  
- Do not engage in any conversation or provide assistance outside of English learning. Stay strictly focused on this goal.  

### **Your Role in Summary:**  
Your sole responsibility is to help me learn English effectively by delivering accurate, clear, and engaging explanations in **Vietnamese**. Stay focused on this objective, ensuring a supportive, patient, and fun learning environment. Redirect all unrelated queries back to English learning without exception.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Lấy thông tin permission từ localStorage
    const permission = localStorage.getItem("permission");
    if (permission) {
      // Chuyển đổi về số để dễ so sánh
      const permissionNumber = parseInt(permission, 10);
      setIsPremium(permissionNumber === 2);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare history for the chat session
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const chatSession = model.startChat({
        generationConfig,
        history,
      });

      // Send message and get response
      const result = await chatSession.sendMessage(input);

      const botResponse = {
        role: "model",
        content: result.response.text(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Đã xảy ra lỗi khi gọi API." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const isPremiumUser = isPremium;

  return (
    <div>
      {isPremiumUser ? (
        <div>
          <ThemeProvider theme={theme}>
            <Box>
              <Paper
                elevation={6}
                sx={{
                  width: "100%",
                  height: "100vh", // Chiều cao toàn màn hình
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    position: "sticky", // Cố định header
                    top: 0,
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    paddingBottom: 1,
                    paddingTop: 1,
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                >
                  {/* Icon Back */}
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      // Thay đổi thành chức năng chuyển hướng về home
                      window.location.href = "/";
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>

                  {/* Tiêu đề */}
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, textAlign: "center" }}
                  >
                    EngGenuis Assistant
                  </Typography>
                </Box>

                {/* Message Area */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto", // Kích hoạt cuộn
                    p: 2,
                    backgroundColor: "background.default",
                  }}
                >
                  {messages.map((msg, index) => (
                    <Fade in={true} timeout={600} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            msg.role === "user" ? "flex-end" : "flex-start",
                          mb: 2,
                        }}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            p: 1.5,
                            maxWidth: "75%",
                            fontSize: "1.2rem", // Tăng kích thước chữ
                            backgroundColor:
                              msg.role === "user"
                                ? "primary.light"
                                : "grey.200",
                            color:
                              msg.role === "user"
                                ? "primary.contrastText"
                                : "text.primary",
                          }}
                        >
                          {msg.role === "model" ? (
                            <ReactMarkdown variant="body2">
                              {msg.content}
                            </ReactMarkdown>
                          ) : (
                            <Typography variant="body2">
                              {msg.content}
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    </Fade>
                  ))}
                  {isLoading && (
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body2" color="text.secondary">
                        Đang nhập...
                      </Typography>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box
                  sx={{
                    position: "sticky", // Cố định thanh nhập tin nhắn
                    bottom: 0,
                    zIndex: 10,
                    p: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "white",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    maxRows={2}
                    variant="standard"
                    placeholder="Aa . . ."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          color="primary"
                          onClick={handleSendMessage}
                          disabled={!input.trim()}
                        >
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </ThemeProvider>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "red", fontSize: "18px" }}>
            Bạn cần nâng cấp tài khoản để sử dụng tính năng chatbot.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "10px",
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Quay lại trang chủ
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
