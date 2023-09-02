import { FC, useEffect } from "react";
import { Nade } from "../../models/Nade";
import { useCanEditNade } from "../../data/useCanEditNade";
import { SEO } from "../../../shared-components/SEO";
import { NadeEditSwitcher } from "./NadeEditSwitcher";
import { EditNadeProvider } from "../../data/NadeEdit/EditNadeProvider";
import { useGameMode } from "../../../core/useGameMode";

type Props = {
  nade: Nade;
};

export const EditNadeMain: FC<Props> = ({ nade }) => {
  const canEdit = useCanEditNade(nade.steamId);
  const { setGameMode } = useGameMode();

  useEffect(() => {
    setGameMode(nade.gameMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <EditNadeProvider nade={nade}>
        <SEO
          canonical={`/nades/${nade.slug || nade.id}/edit`}
          key={`seo-${nade.id}`}
          title={"Edit nade"}
        />
        <NadeEditSwitcher nade={nade} />
      </EditNadeProvider>
    </>
  );
};
