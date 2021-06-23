import { GetServerSideProps, NextPage } from "next";
import { HeaderDefault } from "../../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { Navigation } from "../../../navigation/Navigation";
import { UserEditPage } from "../../../users/UserEditPage";
import { SEO } from "../../../shared-components/SEO";
import { UserApi } from "../../../users/data/UserApi";
import { User } from "../../../users/models/User";

type Props = {
  user: User;
};

const ProfileEditScreen: NextPage<Props> = ({ user }) => {
  return (
    <>
      <SEO title={user.nickname} canonical={`/user/${user.steamId}`} />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserEditPage user={user} />}
      />
    </>
  );
};

type Params = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
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

export default ProfileEditScreen;
