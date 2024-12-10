import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Container,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Snackbar,
  CircularProgress,
  IconButton,
  Alert,
  Divider,
  Fade,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AssignmentPage from "../Assignment";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // green[800]
      light: "#4caf50",
      dark: "#1b5e20",
    },
    background: {
      default: "#c2e7c6",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default function TestCreator() {
  const [state, setState] = useState({
    questionTypes: [],
    questionCount: 10,
    topic: "",
    loading: false,
    error: null,
    success: false,
    questions: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  const fetchQuestionTypes = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        "https://localhost:5000/api/Question/GetListQuestionTypes"
      );
      const data = await response.json();
      setState((prev) => ({
        ...prev,
        questionTypes: data.map((type) => ({ ...type, isChecked: false })),
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Không thể tải danh sách loại câu hỏi.",
        loading: false,
      }));
    }
  };

  const handleSubmit = async () => {
    const selectedTypes = state.questionTypes
      .filter((type) => type.isChecked)
      .map((type) => type.id);

    if (!state.topic.trim()) {
      setState((prev) => ({ ...prev, error: "Vui lòng nhập chủ đề." }));
      return;
    }

    if (selectedTypes.length === 0) {
      setState((prev) => ({ ...prev, error: "Vui lòng chọn loại câu hỏi." }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://localhost:5000/api/Question/CreateQuestions?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            topic: state.topic,
            totalQuestion: state.questionCount,
            questionTypes: selectedTypes,
          }),
        }
      );

      if (!response.ok) throw new Error("Tạo bài tập thất bại");

      const questions = await response.json();
      setState((prev) => ({
        ...prev,
        success: true,
        loading: false,
        questions,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const handleCloseError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  if (state.questions) {
    return <AssignmentPage questions={state.questions} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: 6,
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <Button
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIcon />}
            sx={{ position: "absolute", top: 24, left: 24 }}
          >
            Quay lại
          </Button>

          <Fade in={true} timeout={800}>
            <Paper
              elevation={4}
              sx={{
                mt: 8,
                p: 4,
                backgroundColor: "white",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                color="primary"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Tạo Bài Tập Mới
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Chủ đề bài tập
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập chủ đề bài tập..."
                  value={state.topic}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, topic: e.target.value }))
                  }
                  variant="outlined"
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Số lượng câu hỏi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        questionCount: Math.max(10, prev.questionCount - 1),
                      }))
                    }
                    disabled={state.questionCount <= 10}
                    color="primary"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    variant="h5"
                    sx={{ width: 50, textAlign: "center" }}
                  >
                    {state.questionCount}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        questionCount: Math.min(100, prev.questionCount + 1),
                      }))
                    }
                    disabled={state.questionCount >= 100}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Loại câu hỏi
                </Typography>
                <FormGroup sx={{ mt: 2 }}>
                  {state.questionTypes.map((type) => (
                    <FormControlLabel
                      key={type.id}
                      control={
                        <Checkbox
                          checked={type.isChecked}
                          onChange={() => {
                            setState((prev) => ({
                              ...prev,
                              questionTypes: prev.questionTypes.map((t) =>
                                t.id === type.id
                                  ? { ...t, isChecked: !t.isChecked }
                                  : t
                              ),
                            }));
                          }}
                          color="primary"
                        />
                      }
                      label={type.description}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={state.loading}
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                  }}
                >
                  {state.loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Tạo bài tập"
                  )}
                </Button>
              </Box>
            </Paper>
          </Fade>

          <Snackbar
            open={Boolean(state.error)}
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {state.error}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
