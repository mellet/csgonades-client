import { GetServerSideProps, NextPage } from "next";
import { HeaderDefault } from "../../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { Navigation } from "../../../navigation/Navigation";
import { SEO } from "../../../shared-components/SEO";
import { UserApi } from "../../../users/data/UserApi";
import { User } from "../../../users/models/User";
import { UserMain } from "../../../users/UserMain";

type Props = {
  user: User;
};

const UserPageComponent: NextPage<Props> = ({ user }) => {
  return (
    <>
      <SEO title={user.nickname} canonical={`/user/${user.steamId}`} />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserMain user={user} key={user.steamId} />}
      />
    </>
  );
};

type GSSParams = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<Props, GSSParams> = async (
  context
) => {
  const steamId = context.params?.userId;

  if (!steamId) {
    return {
      notFound: true,
    };
  }

  const result = await UserApi.fetchUser(steamId);

  if (result.isErr()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: result.value,
    },
  };
};

export default UserPageComponent;
