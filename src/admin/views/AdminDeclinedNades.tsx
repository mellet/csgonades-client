import { FC, useState, useEffect } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { useGetOrUpdateToken } from "../../core/authentication/useGetToken";
import { NadeApi } from "../../nade/data/NadeApi";
import { AdminPageTitle } from "../components/AdminPageTitle";

export const AdminDeclinedNades: FC = () => {
  const getToken = useGetOrUpdateToken();
  const [declinedNades, setDeclinedNades] = useState<NadeLight[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      const res = await NadeApi.getDeclined(token);
      if (res.isOk()) {
        setDeclinedNades(res.value);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          title="Declined Nades"
          description="Nades that have been declined. If the person who uploaded the nade
        does not fix the issues the nade can be deleted."
        />

        <CsgnList<NadeLight>
          data={declinedNades}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </div>
    </>
  );
};
