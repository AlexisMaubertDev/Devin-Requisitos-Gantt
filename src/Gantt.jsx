import { useEffect, useState } from "react";

const Gantt = () => {
  const [requeriments, setRequeriments] = useState([]);

  const MAX_COLUMNS = 30;

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

  function MatrixTable({ matrix }) {
    const [hoveredRow, setHoveredRow] = useState(null);

    // Manejadores de eventos para el mouse
    const handleMouseEnter = (rowIndex) => {
      setHoveredRow(rowIndex);
    };

    const handleMouseLeave = () => {
      setHoveredRow(null);
    };
    return (
      <table className="table-auto">
        <tbody>
          {matrix.map(({ row, cellColor }, rowIndex) => (
            <tr
              key={rowIndex}
              className="flex text-sm"
              onMouseEnter={() => handleMouseEnter(rowIndex)}
              onMouseLeave={handleMouseLeave}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`flex ${
                    cell !== ""
                      ? rowIndex === hoveredRow
                        ? "bg-slate-200 text-black cursor-pointer"
                        : cellColor
                      : "bg-slate-300 border"
                  } w-6  justify-center`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function sumEstimatedTimes(requeriment) {
    let total = 0;
    let predecessorsCount = 0;
    const predecessor = requeriments.find(
      (r) => r.name === requeriment.predecessor
    );
    if (predecessor) {
      predecessorsCount++;
      const [subTotal, subCount] = sumEstimatedTimes(predecessor); // Obtener sub-total y sub-contador
      total += parseInt(predecessor.estimatedTime, 10);
      total += subTotal;
      predecessorsCount += subCount; // Sumar el sub-contador al total de predecesores
    }
    return [total, predecessorsCount]; // Devolver tanto el total como el contador de predecesores
  }

  let matrix = [];

  for (let i = 0; i < requeriments.length; i++) {
    const row = [];

    const [space, predecessorsCount] = sumEstimatedTimes(requeriments[i]);

    const cellColor =
      predecessorsCount === 0
        ? "bg-red-500"
        : predecessorsCount === 1
        ? "bg-orange-500"
        : predecessorsCount === 2
        ? "bg-amber-500"
        : predecessorsCount === 3
        ? "bg-lime-600"
        : predecessorsCount === 4
        ? "bg-emerald-500"
        : predecessorsCount === 5
        ? "bg-cyan-500"
        : predecessorsCount === 6
        ? "bg-blue-500"
        : predecessorsCount === 7;

    row.push(...Array(space).fill(""));
    const order = requeriments[i].order;
    const estimatedTime = parseInt(requeriments[i].estimatedTime, 10);
    row.push(...Array(estimatedTime).fill(order));
    console.log(row.length);
    const remainingSpaces = MAX_COLUMNS - row.length;
    if (remainingSpaces > 0) {
      row.push(...Array(remainingSpaces).fill(""));
    }
    matrix.push({ row, cellColor }); // Agregar el color de la celda a la matriz
  }

  function generateDaysRow() {
    const daysRow = [];
    for (let i = 1; i <= MAX_COLUMNS; i++) {
      daysRow.push(i);
    }
    return daysRow;
  }

  // Agregar la fila de enumeración de días a la matriz
  matrix.unshift({ row: generateDaysRow(), cellColor: "bg-gray-500" });

  return (
    <div className="flex justify-start items-start">
      <MatrixTable matrix={matrix}></MatrixTable>
    </div>
  );
};

export default Gantt;
