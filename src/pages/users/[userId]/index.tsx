import { GetServerSideProps, NextPage } from "next";
import { HeaderDefault } from "../../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { Navigation } from "../../../navigation/Navigation";
import { SEO } from "../../../shared-components/SEO";
import { UserApi } from "../../../users/data/UserApi";
import { useUser } from "../../../users/data/useUser";
import { User } from "../../../users/models/User";
import { UserMain } from "../../../users/UserMain";

type Props = {
  initialUser: User;
};

const UserPageComponent: NextPage<Props> = ({ initialUser }) => {
  const { user } = useUser(initialUser.steamId);
  const theUser = user || initialUser;

  return (
    <>
      <SEO title={theUser.nickname} canonical={`/user/${theUser.steamId}`} />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserMain user={theUser} key={theUser.steamId} />}
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
      initialUser: result.value,
    },
  };
};

export default UserPageComponent;
