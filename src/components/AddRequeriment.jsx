import { useState } from "react";

const AddRequeriment = ({ requeriments, setRequeriments }) => {
  const [formData, setFormData] = useState({
    name: "",
    estimatedTime: 0,
    predecessor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let error = false;

    if (formData.name === "" || formData.estimatedTime === 0) {
      console.log("Completar todos los campos");
      error = true;
    }
    if (
      requeriments.some((requeriment) => requeriment.name === formData.name)
    ) {
      console.log("Ya existe un requerimiento con ese nombre");
      error = true;
    }

    if (!error) {
      formData.id = requeriments.length + 1;
      setRequeriments((prevData) => prevData.concat(formData));
    }
  };

  return (
      <div className="bg-green-200 flex flex-1 text-black text-center flex-col">
        <h2 className="p-4 font-bold bg-green-400 flex-1">
          Agregar requerimiento
        </h2>
        <form
          className=" flex flex-1 gap-5 p-10 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5">
            <label className="flex-1 text-left">Nombre</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              className="w-2/3"
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  name: value,
                }));
              }}
            />
          </div>
          <div className="flex gap-5">
            <label className="flex-1 text-left">Tiempo estimado</label>
            <input
              className="w-2/3"
              type="number"
              id="time"
              value={formData.estimatedTime}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  estimatedTime: value,
                }));
              }}
            />
          </div>
          <div className="flex gap-5">
            <label className="flex-1 text-left">Precedencia</label>
            <select
              className="w-2/3"
              id="select"
              value={formData.predecessor}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  predecessor: value,
                }));
              }}
            >
              <option hidden>Selecciona un requerimiento</option>
              {requeriments.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-green-600 min-w-20 rounded-md p-1 text-white self-center"
            type="submit"
          >
            Agregar
          </button>
        </form>
      </div>
  );
};

export default AddRequeriment;
