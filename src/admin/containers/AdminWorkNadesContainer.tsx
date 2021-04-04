import { FC } from "react";
import { useAdminWorkNades } from "../data/hooks";
import { NadeLight } from "../../nade/models/Nade";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { AdminPageTitle } from "../components/AdminPageTitle";

export const AdminUncompleteNadesContainer: FC = () => {
  const { nades } = useAdminWorkNades();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <AdminPageTitle
        title="Uncomplete"
        description="Nades missing some information"
      />
      <CsgnList<NadeLight>
        data={nades}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
};
