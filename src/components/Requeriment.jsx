import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Requeriment = ({ requeriment, predecessor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: requeriment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex bg-blue-300 hover:bg-sky-500"
    >
      <div className=" border-b-2 border-slate-200 text-black flex-1">
        <h2>{requeriment.name}</h2>
      </div>
      <div className="   border-b-2 border-l-2 border-slate-200 text-black text-center w-32 flex-none">
        <h2>{requeriment.estimatedTime}</h2>
      </div>
      <div className="  border-b-2 border-l-2 border-slate-200 text-black w-32 text-center flex-none">
        {predecessor}
      </div>
    </div>
  );
};

export default Requeriment;
