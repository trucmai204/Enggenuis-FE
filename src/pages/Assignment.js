import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Alert,
  Container,
  IconButton,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  Check,
  Clear,
  Timer,
  Refresh,
  Menu as MenuIcon,
  ArrowBack,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiCardHeader-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiCardActions-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));

const QuestionButton = styled(Button, {
  shouldForwardProp: (prop) => !["isAnswered", "isCorrect"].includes(prop),
})(({ theme, isAnswered, isCorrect }) => ({
  minWidth: "60px",
  margin: theme.spacing(0.5),
  ...(isAnswered && {
    backgroundColor: isCorrect
      ? theme.palette.success.light
      : theme.palette.error.light,
    color: isCorrect
      ? theme.palette.success.contrastText
      : theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: isCorrect
        ? theme.palette.success.main
        : theme.palette.error.main,
    },
  }),
}));

const AssignmentPage = ({ questions, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSubmitted) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, isSubmitted]);

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home page
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChoiceSelect = (choiceIndex) => {
    if (!isSubmitted || isReviewMode) {
      setSelectedChoice(choiceIndex);
      setAnswers({
        ...answers,
        [currentQuestionIndex]: choiceIndex,
      });
    }
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedChoice(answers[index]);
    setDrawerOpen(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const startReview = () => {
    setIsReviewMode(true);
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (answer === questions[questionIndex].resultChoiceIndex) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const isQuestionAnswered = (index) => answers.hasOwnProperty(index);
  const isAnswerCorrect = (index) =>
    answers[index] === questions[index].resultChoiceIndex;

  const questionNavigationContent = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tiến độ làm bài
      </Typography>
      <Grid container spacing={1}>
        {questions.map((_, index) => (
          <Grid item key={index}>
            <QuestionButton
              variant="contained"
              onClick={() => handleQuestionSelect(index)}
              isAnswered={isQuestionAnswered(index)}
              isCorrect={isSubmitted && isAnswerCorrect(index)}
            >
              {index + 1}
            </QuestionButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Mobile drawer for question navigation */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {questionNavigationContent}
        </Drawer>
      )}

      {/* Header with progress and timer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleBackToHome} aria-label="back to home">
            <ArrowBack />
          </IconButton>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ width: "200px" }}>
            <LinearProgress
              variant="determinate"
              value={(Object.keys(answers).length / questions.length) * 100}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Object.keys(answers).length}/{questions.length}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Timer fontSize="small" />
          <Typography variant="body2">{formatTime(elapsedTime)}</Typography>
        </Box>
      </Box>

      {/* Main content grid */}
      <Grid container spacing={3}>
        {/* Question navigation for desktop */}
        {!isMobile && (
          <Grid item xs={12}>
            {questionNavigationContent}
          </Grid>
        )}

        {/* Question card */}
        <Grid item xs={12}>
          <StyledCard>
            <CardHeader
              title={`Câu hỏi ${currentQuestionIndex + 1}`}
              titleTypography={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                {questions[currentQuestionIndex].content}
              </Typography>
              <RadioGroup
                value={selectedChoice}
                onChange={(e) => handleChoiceSelect(Number(e.target.value))}
              >
                {questions[currentQuestionIndex].choices.map(
                  (choice, index) => (
                    <Fade
                      in={true}
                      key={index}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          mb: 2,
                          cursor: "pointer",
                          bgcolor: (() => {
                            if (isSubmitted || isReviewMode) {
                              if (
                                index ===
                                questions[currentQuestionIndex]
                                  .resultChoiceIndex
                              ) {
                                return theme.palette.success.light;
                              }
                              if (selectedChoice === index) {
                                return index ===
                                  questions[currentQuestionIndex]
                                    .resultChoiceIndex
                                  ? theme.palette.success.light
                                  : theme.palette.error.light;
                              }
                            }
                            return selectedChoice === index
                              ? theme.palette.action.selected
                              : theme.palette.background.paper;
                          })(),
                        }}
                        onClick={() => handleChoiceSelect(index)}
                      >
                        <FormControlLabel
                          value={index}
                          control={<Radio />}
                          label={choice}
                          sx={{ width: "100%", margin: 0 }}
                        />
                      </Paper>
                    </Fade>
                  )
                )}
              </RadioGroup>
              {(isSubmitted || isReviewMode) && (
                <Fade in={true}>
                  <Alert
                    severity={
                      isAnswerCorrect(currentQuestionIndex)
                        ? "success"
                        : "error"
                    }
                    sx={{ mt: 2 }}
                  >
                    {questions[currentQuestionIndex].explainationForTheResult}
                  </Alert>
                </Fade>
              )}
            </CardContent>
            <CardActions>
              <Button
                startIcon={<NavigateBefore />}
                onClick={() => handleQuestionSelect(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
              >
                Câu trước
              </Button>
              {!isSubmitted ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                  endIcon={<Check />}
                >
                  Nộp bài
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={startReview}
                  endIcon={<Refresh />}
                >
                  Xem đáp án
                </Button>
              )}
              <Button
                endIcon={<NavigateNext />}
                onClick={() => handleQuestionSelect(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === questions.length - 1}
                variant="contained"
              >
                Câu tiếp
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Results Dialog */}
      <Dialog
        open={showResults}
        onClose={() => setShowResults(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Kết quả làm bài</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography
              variant="h3"
              gutterBottom
              color={calculateScore() >= 70 ? "success.main" : "error.main"}
            >
              {calculateScore().toFixed(0)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateScore()}
              sx={{ height: 10, borderRadius: 5, mb: 2 }}
            />
            <Typography color="text.secondary" gutterBottom>
              Thời gian hoàn thành: {formatTime(elapsedTime)}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Tóm tắt
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Chip
                  icon={<Check />}
                  label={`Correct: ${
                    Object.entries(answers).filter(
                      ([index, answer]) =>
                        answer === questions[Number(index)].resultChoiceIndex
                    ).length
                  }`}
                  color="success"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<Clear />}
                  label={`Incorrect: ${
                    Object.entries(answers).filter(
                      ([index, answer]) =>
                        answer !== questions[Number(index)].resultChoiceIndex
                    ).length
                  }`}
                  color="error"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)}>Đóng</Button>
          <Button onClick={startReview} variant="contained" color="primary">
            Xem đáp án
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssignmentPage;
