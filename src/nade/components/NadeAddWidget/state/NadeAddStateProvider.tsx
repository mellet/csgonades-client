import React, {
  createContext,
  FC,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialNadeAddState, NadeCreateSteps } from "./NadeAddState";
import { NadeCreateBody } from "../../../models/Nade";
import { nadeAddReducer } from "./nadeAddReducer";
import { NadeAddCallbacks, useNadeAddActions } from "./useNadeAddWidgetState";

interface NadeAddStateContext {
  step: NadeCreateSteps;
  nade: Partial<NadeCreateBody>;
  actions: NadeAddCallbacks;
}

const NadeAddStateContextCreator = createContext<NadeAddStateContext | null>(
  null
);

export const CreateNadeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(nadeAddReducer, initialNadeAddState);
  const actions = useNadeAddActions(dispatch);

  const createNadeInternalState = useMemo<NadeAddStateContext>(() => {
    return {
      step: state.currentStep,
      nade: state.nadeData,
      actions: actions,
    };
  }, [state, actions]);

  return (
    <NadeAddStateContextCreator.Provider value={createNadeInternalState}>
      {children}
    </NadeAddStateContextCreator.Provider>
  );
};

export const useCreateNade = () => {
  const context = useContext(NadeAddStateContextCreator);

  if (!context) {
    throw Error(
      "Trying to consume NadeAddStateContextCreator without provider."
    );
  }

  return context;
};
