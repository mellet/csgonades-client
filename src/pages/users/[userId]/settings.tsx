import { GetServerSideProps, NextPage } from "next";

const UserSettings: NextPage = (props) => {
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

export const getServerSideProps: GetServerSideProps<
  any,
  QueryProps
> = async () => {
  return {
    props: {},
  };
};

export default UserSettings;
