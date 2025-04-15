import { PacientThing, PacientInput, postPacient } from "./PostPacient";
import { useState } from "react";

const handleAddPacient = async (newPacient: PacientInput): Promise<PacientThing> => {
  const [pacients, setPacients] = useState<PacientThing[]>([]);

  try {
    const addedPacient = await postPacient(newPacient);
    setPacients((prev: PacientThing[]) => [...prev, addedPacient]);
    return addedPacient;
  } catch (err) {
    alert('Erro ao adicionar paciente.');
    throw err;
  }
};

export default handleAddPacient;