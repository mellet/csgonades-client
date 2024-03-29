import { FC } from "react";
import { useAdminPendingNades } from "../data/hooks/useAdminPendingNades";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { NadeLight } from "../../nade/models/NadePartial";

export const AdminPendingContainer: FC = () => {
  const { pendingNades } = useAdminPendingNades();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <AdminPageTitle
        title="Pending Nades"
        description="Nades waiting for approval"
      />
      <CsgnList<NadeLight>
        data={pendingNades}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
};
