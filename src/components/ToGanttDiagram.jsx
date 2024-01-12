import { Link } from "react-router-dom";

const ToGanttDiagram = () => {
  return (
    <div className="p-4 font-bold bg-green-400 flex-1 flex justify-center gap-20 text-black align-center">
      <p className="p-4">Diagrama de Gantt</p>
      <Link
        to={"/gantt"}
        className="bg-green-600 min-w-20 rounded-md py-1 px-5 flex justify-center self-center text-white "
      >
        Ir
      </Link>
    </div>
  );
};

export default ToGanttDiagram;
