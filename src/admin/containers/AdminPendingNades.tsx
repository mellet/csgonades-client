import { FC } from "react";
import { useAdminPendingNades } from "../data/hooks";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { NadeItem } from "../../common/nadeitem/NadeItem";
import { CsgnList } from "../../common/list/CsgnList";

export const AdminPendingNades: FC = () => {
  const { pendingNades } = useAdminPendingNades();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <CsgnList<NadeLight>
      data={pendingNades}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
