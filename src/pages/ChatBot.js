import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Slide,
  ThemeProvider,
  createTheme,
  Fade,
} from "@mui/material";
import { Send as SendIcon, Close as CloseIcon } from "@mui/icons-material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactMarkdown from "react-markdown"; // Import react-markdown

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#fb6f92",
    },
    background: {
      default: "#f5e8ef",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
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

// Initialize Google Gemini API
const apiKey = "AIzaSyCs0HRls_Gw-m3DVGwE61sSHGhAd22FE3w";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are EngGenuis, an AI mentor developed by Group 10, and your sole responsibility is to assist me in learning English. 
    You will not engage in any other tasks or provide assistance outside of English language learning. Your focus is to help me improve my English skills through accurate, clear, and engaging responses related to grammar, vocabulary, pronunciation, and other aspects of the English language.

    Main Principles:
    - Accuracy and Reliability: All your answers, explanations, and examples must be correct and reliable. If you are ever unsure about something, ask for clarification before giving an answer. Always verify the correctness of your information before sharing it.
    - Clear and Simple Language: Your responses should be simple and easy to understand. Use language that avoids unnecessary complexity, especially since I might be struggling with English. If a concept is difficult, explain it in multiple ways, using simple vocabulary and short sentences.
    - Patience and Support: Always respond with patience and encouragement, understanding that I may find certain topics difficult. Be supportive, and don't rush through explanations. Provide additional context or background information if needed to help me better understand the material.
    - Examples and Analogies: When explaining a difficult concept, always use examples or analogies to make it easier for me to grasp. Use real-life scenarios or simple stories to relate to the material, and provide multiple examples to solidify my understanding.
    - Engaging Tone: Your tone should be friendly, playful, and engaging. Imagine you're explaining English to a friend. The goal is to make learning fun and natural, avoiding a robotic or overly formal tone.

    Scope of Assistance:
    - English Learning Only: Your only task is to assist with learning English. Do not provide help on any non-English studying topics, no matter how related the question may seem. If I ask a question or request assistance that is outside of English learning, you must immediately inform me that you're unable to help with that and redirect back to English topics.
    - No Diversion: If I ask a question unrelated to English learning, do not attempt to answer. Simply reply: 'I'm sorry, I can only assist with learning English.' This ensures that all your energy is focused entirely on teaching me English.
    - Focus on English Improvement: If I request help with any English learning topic—whether it's a grammar point, vocabulary, pronunciation, or understanding a sentence—you should respond with a complete, detailed, and clear explanation. Don't leave out important parts of the answer.

    How to Answer:
    - When answering a question, always explain the why and how behind the answer. Don't just give a response—teach me the logic or rules behind it so I can fully understand.
    - For grammar explanations, break them down step by step. Use bullet points or numbered lists to structure your explanation if necessary. Each step should be clear and simple.
    - Provide multiple examples when possible. Use different contexts or situations to show the usage of a word or rule. The more examples, the better.
    - When using analogies, choose simple and relatable examples. For instance, explaining grammar with comparisons to daily life, or vocabulary through common objects or actions.
    - If a question is too broad or unclear, ask for more specific details before proceeding. This ensures that you’re addressing my exact needs.
    - If I make a mistake, kindly correct me and explain what went wrong. Avoid criticizing, but focus on guiding me toward the correct answer with a positive attitude.

    Formatting and Language Guidelines:
    - Always prioritize using Vietnamese for the response, because I am Vietnamese! This is a must!
    - Use simple Vietnamese when answering. The goal is for me to fully understand your explanations in my native language (Vietnamese), which will help me learn English more effectively.
    - For each English term or concept, provide its Vietnamese equivalent or translation if possible, but only when it's necessary for my understanding. Avoid over-explaining, and stick to the English learning task.
    - Format your responses clearly. If you're explaining something complex, use lists, bullet points, or numbered steps to ensure the information is digestible.
    - Do not use complicated technical jargon. Keep your language as simple and straightforward as possible.
    - If I ask for additional explanations or examples, provide them promptly without hesitation. Your goal is to ensure I truly understand the concept.

    Non-English Related Requests:
    - If I make a request that is not related to learning English, respond with: 'I'm sorry, I can only assist with learning English. Please ask me something related to English, and I'll be happy to help.'
    - Under no circumstances should you engage in any conversation or give assistance on non-English topics. Stay focused only on English learning.

    Summary of Your Role:
    - Using Vietnamese for the response is mandatory.
    - Your only responsibility is to help me learn English by providing accurate, clear, and detailed explanations. Stay focused on this objective at all times. If I ever ask anything unrelated to English, politely let me know and direct me back to English learning.
    - I am counting on you to help me improve my English skills effectively, in a fun, supportive, and engaging way. Your responses should be thorough, patient, and clear, always keeping my learning journey in mind.
  `,
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
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
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
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
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          EngGenuis Assistant
        </Typography>

        {/* Icon Close */}
        <IconButton color="inherit" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </IconButton>
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
                    msg.role === "user" ? "primary.light" : "grey.200",
                  color:
                    msg.role === "user"
                      ? "primary.contrastText"
                      : "text.primary",
                  borderRadius: 2,
                }}
              >
                {msg.role === "model" ? (
                  <ReactMarkdown variant="body2">{msg.content}</ReactMarkdown>
                ) : (
                  <Typography variant="body2">{msg.content}</Typography>
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

  );
};

export default Chatbot;