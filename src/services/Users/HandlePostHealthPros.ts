import { HealthProInput, HealthProThing, postHealthPro } from "./PostHealthPro";
import { useState } from "react";

const handleAddHealthPro = async (newHealthPro: HealthProInput): Promise<HealthProThing> => {
  const [healthPros, setHealthPros] = useState<HealthProThing[]>([]);

  try {
    const addedHealthPro = await postHealthPro(newHealthPro);
    setHealthPros((prev: HealthProThing[]) => [...prev, addedHealthPro]);
    return addedHealthPro;
  } catch (err) {
    alert('Erro ao adicionar profissional de saúde.');
    throw err;
  }
};

export default handleAddHealthPro;