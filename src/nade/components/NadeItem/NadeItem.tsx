import { FC, memo } from "react";
import {
  useFavorites,
  useIsNadeFavorited,
} from "../../../favorites/data/useFavorites";
import { NadeItemView } from "./Views/NadeItemView";
import { NadeLight } from "../../models/NadePartial";

interface Props {
  nade: NadeLight;
  onClick?: (nade: NadeLight) => void;
}

export const NadeItem: FC<Props> = memo(({ nade, onClick }) => {
  const { addNadeAsFavorite, removeNadeAsFavorite } = useFavorites();
  const isFavorited = useIsNadeFavorited(nade.id);

  return (
    <NadeItemView
      isFavorited={isFavorited}
      nade={nade}
      onAddAsFavorite={addNadeAsFavorite}
      onRemoveAsFavorite={removeNadeAsFavorite}
      onClick={onClick}
    />
  );
});
