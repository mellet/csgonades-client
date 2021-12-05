import { FC, memo, useState, useEffect } from "react";
import { Nade } from "../../nade/models/Nade";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeItemMobile } from "../../nade/components/NadeItem/NadeItemMobile";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { useMediaQuery } from "react-responsive";

interface Props {
  nadeSlug: string;
}

export const BlogNadeItem: FC<Props> = memo(({ nadeSlug }) => {
  const [nade, setNade] = useState<Nade | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 600 });

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

  return (
    <>
      {isMobile && <NadeItemMobile nade={nade} />}
      {!isMobile && <NadeItem nade={nade} />}
    </>
  );
});
