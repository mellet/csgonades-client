import { GetServerSideProps, NextPage } from "next";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { UserPage } from "../../users/UsersPage";
import { SEO } from "../../layout/SEO";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { HeaderDefault } from "../../defaultheader/Header";
import { Navigation } from "../../navigation/Navigation";

type Props = {
  user: User | null;
};

const UserPageComponent: NextPage<Props> = ({ user }) => {
  if (!user) {
    return <div>404! User not found</div>;
  }

  return (
    <>
      <SEO title={user.nickname} canonical={`/user/${user.steamId}`} />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserPage user={user} key={user.steamId} />}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.query.user as string;

  const result = await UserApi.fetchUser(steamId);

  if (result.isErr()) {
    context.res.statusCode = 404;
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user: result.value,
    },
  };
};

export default UserPageComponent;
