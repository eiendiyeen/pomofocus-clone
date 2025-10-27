import Header from "./components/Header";
import classes from "./App.module.css";
import Timer from "./components/Timer";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Tasks from "./components/Tasks";

function App() {
  const mode = useSelector((state) => state.timer.mode);

  return (
    <div className={clsx(classes.container, classes[mode])}>
      <Header />
      <div className={classes.content}>
        <Timer />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
