import { useContext } from "react";
import { EditNadeContextCreator } from "./EditNadeProvider";

export const useEditNade = () => {
  const context = useContext(EditNadeContextCreator);

  if (!context) {
    throw Error("Trying to consume EditNadeContextCreator without provider.");
  }

  return context;
};
