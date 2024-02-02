import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { nanoid } from "nanoid";
import { useState } from "react";
import "./Card.css";

function CardList({ goalsList, deleteGoal, editGoal }) {
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoalText, setNewGoalText] = useState("");

  const handleToggle = (goal) => {
    const updatedCheckedGoals = checkedGoals.includes(goal)
      ? checkedGoals.filter((checkedGoal) => checkedGoal !== goal)
      : [...checkedGoals, goal];

    setCheckedGoals(updatedCheckedGoals);
  };

  const handleEditClick = (goal) => {
    setEditingGoal(goal);
    setNewGoalText(goal);
  };

  const handleEditSave = (goal) => {
    if (newGoalText.trim() === "") {
      return;
    }
    editGoal(goal, newGoalText.trim());
    setEditingGoal("");
    setNewGoalText("");
  };

  const jsx = goalsList.map((goal) => (
    <List
      key={nanoid()}
      style={{
        margin: "10px",
        borderRadius: "10px",
        textDecoration: checkedGoals.includes(goal) ? "line-through" : "none",
      }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          {editingGoal === goal ? (
            <>
              <ListItemIcon>
                <DoneIcon onClick={() => handleEditSave(goal)} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <input
                    type="text"
                    style={{
                      fontSize: "1rem",
                      marginLeft: "3rem",
                      width: "80%",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    autoFocus
                  />
                }
              />
            </>
          ) : (
            <ListItemText
              style={{
                textAlign: "center",
                fontFamily: "cursive",
                opacity: checkedGoals.includes(goal) ? 0.5 : 1,
                cursor: "pointer",
              }}
              onClick={() => handleToggle(goal)}
              primary={goal}
            />
          )}
          <ListItemIcon>
            <EditIcon onClick={() => handleEditClick(goal)} />
            <DeleteIcon onClick={() => deleteGoal(goal)} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  ));

  return <div className="card-list">{jsx}</div>;
}

export default CardList;
