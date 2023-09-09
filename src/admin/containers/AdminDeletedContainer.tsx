import { FC } from "react";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { useAdminDeletedNades } from "../data/hooks/useAdminDeletedNades";
import { NadeLight } from "../../nade/models/NadePartial";

export const AdminDeletedContainer: FC = () => {
  const { deletedNades } = useAdminDeletedNades();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div>
        <AdminPageTitle
          title="Deleted Nades"
          description="Nades that have been marked to be deleted."
        />

        <CsgnList<NadeLight>
          data={deletedNades}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </div>
    </>
  );
};
