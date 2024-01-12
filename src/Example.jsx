import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Requeriment from "./components/Requeriment";
import AddRequeriment from "./components/AddRequeriment";
import ToGanttDiagram from "./components/ToGanttDiagram";

const alphabet = "0123456789".split("");

const combinations = [];
for (let i = 0; i < alphabet.length; i++) {
  for (let j = 0; j < alphabet.length; j++) {
    const combination = alphabet[i] + alphabet[j];
    combinations.push(combination);
  }
}
combinations.shift();

function Example() {
  const [requeriments, setRequeriments] = useState([]);
  const indexColumn = combinations.slice(0, requeriments.length);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = requeriments.findIndex(
        (requeriment) => requeriment.id === active.id
      );
      const newIndex = requeriments.findIndex(
        (requeriment) => requeriment.id === over.id
      );

      const updateOrder = async (index, order) => {
        const requerimentId = requeriments[index]._id;
        await fetch(`http://localhost:3000/api/requeriments/${requerimentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order }), // Enviar el nuevo valor de "order"
        });
      };

      setRequeriments((requeriments) => {
        const updatedRequeriments = arrayMove(requeriments, oldIndex, newIndex);

        updateOrder(oldIndex, newIndex + 1);
        updateOrder(newIndex, oldIndex + 1);
        updatedRequeriments.forEach((requeriment, index) => {
          const newOrder = index + 1; // El nuevo orden basado en el índice
          requeriment.order = newOrder; // Actualizar el orden en el objeto local
        });
        return updatedRequeriments;
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/requeriments");
        const data = await response.json();
        setRequeriments(data);
      } catch (error) {
        console.error("Error al cargar los requerimientos:", error);
      }
    };

    fetchData();
  }, []);

  // Guardar requeriments en el archivo JSON cuando cambie

  return (
    <div className="flex justify-start items-start">
      <div className="w-4/6 min-h-screen bg-slate-300">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div style={{ display: "flex" }}>
            <div className="bg-blue-400 font-bold">
              <h2 className="">Orden</h2>
              {indexColumn.map((letter) => (
                <div
                  className="bg-blue-600	text-center  border-b-2 border-slate-200 "
                  key={letter}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex-1 bg-blue-200">
              <div className="flex justify-between bg-blue-400 font-bold">
                <h2 className="px-4">Requerimientos</h2>
                <div className="flex">
                  <h2 className=" self-center px-4">Estimated Time</h2>
                  <h2 className=" self-center px-4">Predecessor</h2>
                </div>
              </div>
              <SortableContext
                items={requeriments}
                strategy={verticalListSortingStrategy}
              >
                {requeriments.map((requeriment) => (
                  <Requeriment
                    requeriment={requeriment}
                    key={requeriment.id}
                    predecessor={
                      indexColumn[
                        requeriments.findIndex(
                          (item) => item.name === requeriment.predecessor
                        )
                      ]
                    }
                  />
                ))}
              </SortableContext>
            </div>
          </div>
        </DndContext>
      </div>
      <aside className="flex-1 min-h-screen bg-slate-300">
        <AddRequeriment
          requeriments={requeriments}
          setRequeriments={setRequeriments}
        />
        <ToGanttDiagram />
      </aside>
    </div>
  );
}

export default Example;
