import "./App.css";
import CardList from "./components/CardList";
import InputList from "./components/InputList";
import { useState, useEffect } from "react";
import AlertSnackbar from "./components/Alert/Alert";
function App() {
  const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
  const [goals, setGoals] = useState(storedGoals);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  function addGoalToList(goal) {
    if (!goals.includes(goal) && goal.trim() !== "") {
      setGoals([...goals, goal]);
    } else if (goal.trim() === "") {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "Please enter a goal.",
      });
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "This goal already exists!",
      });
    }
  }

  const deleteGoalsHandler = (goalTitle) => {
    let confirm = window.confirm(
      `Are you sure you want to delete this ${goalTitle}?`
    );
    if (confirm) {
      setGoals(goals.filter((goal) => goal !== goalTitle));
    }
  };

  const editGoalsHandler = (prevGoal, newGoal) => {
    if (!goals.includes(newGoal) && newGoal.trim() !== "") {
      setGoals(goals.map((goal) => (goal === prevGoal ? newGoal : goal)));
    } else if (newGoal.trim() === "") {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "Please enter a goal.",
      });
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "This goal already exists!",
      });
    }
  };

  return (
    <>
      <section className="card">
        <InputList addGoal={addGoalToList} />
        <CardList
          goalsList={goals}
          deleteGoal={deleteGoalsHandler}
          editGoal={editGoalsHandler}
        />
        <AlertSnackbar
          open={snackbar.open}
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          message={snackbar.message}
        />
      </section>
    </>
  );
}

export default App;
