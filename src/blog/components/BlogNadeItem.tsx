import { FC, memo, useState, useEffect } from "react";
import { Nade } from "../../nade/models/Nade";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";

interface Props {
  nadeSlug: string;
}

export const BlogNadeItem: FC<Props> = memo(({ nadeSlug }) => {
  const [nade, setNade] = useState<Nade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await NadeApi.byId(nadeSlug);
      if (res.isOk()) {
        setNade(res.value);
      }
      setLoading(false);
    })();
  }, [nadeSlug]);

  if (!nade || loading) {
    return <div>Loading...</div>;
  }

  return <NadeItem nade={nade} />;
});
