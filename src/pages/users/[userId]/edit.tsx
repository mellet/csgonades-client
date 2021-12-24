import { GetServerSideProps, NextPage } from "next";
import { HeaderDefault } from "../../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { Navigation } from "../../../navigation/Navigation";
import { UserEditPage } from "../../../users/containers/UserEditPage";
import { UserApi } from "../../../users/data/UserApi";
import { useUser } from "../../../users/data/useUser";
import { User } from "../../../users/models/User";

type Props = {
  initialUser: User;
};

const UserSettings: NextPage<Props> = ({ initialUser }) => {
  const { user } = useUser(initialUser.steamId);
  const theUser = user || initialUser;

  return (
    <>
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserEditPage user={theUser} />}
      />
      <style jsx>{``}</style>
    </>
  );
};

type QueryProps = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<Props, QueryProps> = async (
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

export default UserSettings;
