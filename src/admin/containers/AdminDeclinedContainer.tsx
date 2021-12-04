import { FC } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { NadeApi } from "../../nade/data/NadeApi";
import { AdminPageTitle } from "../components/AdminPageTitle";
import useSWR from "swr";

async function fetchDeclinedNades() {
  const res = await NadeApi.getDeclined();
  return res;
}

const useDeclinedNades = () => {
  const { data: declinedNades } = useSWR(
    ["/nades/declined"],
    fetchDeclinedNades,
    { errorRetryCount: 1, focusThrottleInterval: 1000 * 60 }
  );

  return declinedNades || [];
};

export const AdminDeclinedContainer: FC = () => {
  const declinedNades = useDeclinedNades();

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
