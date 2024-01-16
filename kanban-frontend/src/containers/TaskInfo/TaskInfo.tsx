import Checkbox from "@/components/Checkbox/Checkbox";

import './task-info.scss';

const TaskInfo = () => {
  return (
    <div className="task-info-container">
      <h2 className="task-title">Research pricing points of various competitors and trial different business models</h2>
      <p className="task-description">We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
      <div className="subtasks-container">
        <h5 className="subtask-info">Subtasks (2 of 3)</h5>
        <div className="subtasks">
          <Checkbox>Research competitor pricing and business models</Checkbox>
          <Checkbox>Outline a business model that works for our solution</Checkbox>
          <Checkbox>Talk to potential customers about our proposed solution and ask for fair price expectancy</Checkbox>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo;