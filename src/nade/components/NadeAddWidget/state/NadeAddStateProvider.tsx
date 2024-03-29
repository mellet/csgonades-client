import React, {
  createContext,
  FC,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialNadeAddState, NadeCreateSteps } from "./NadeAddState";
import { NadeCreateBody } from "../../../models/NadeCreateBody";
import { nadeAddReducer } from "./nadeAddReducer";
import { NadeAddCallbacks, useNadeAddActions } from "./useNadeAddWidgetState";
import { useGameMode } from "../../../../core/useGameMode";

interface NadeAddStateContext {
  step: NadeCreateSteps;
  nade: Partial<NadeCreateBody>;
  actions: NadeAddCallbacks;
}

const NadeAddStateContextCreator = createContext<NadeAddStateContext | null>(
  null
);

export const CreateNadeProvider: FC = ({ children }) => {
  const { gameMode } = useGameMode();
  const [state, dispatch] = useReducer(nadeAddReducer, {
    ...initialNadeAddState,
    nadeData: {
      ...initialNadeAddState.nadeData,
      gameMode,
    },
  });
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
