import { GetServerSideProps, NextPage } from "next";

const UserSettings: NextPage = (props) => {
  console.log(props);
  return (
    <>
      <div>Hello</div>
      <style jsx>{``}</style>
    </>
  );
};

type QueryProps = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<any, QueryProps> = async (
  context
) => {
  const { params } = context;
  console.log(params);

  return {
    props: {},
  };
};

export default UserSettings;
