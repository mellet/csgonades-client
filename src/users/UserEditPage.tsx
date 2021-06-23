import { FC } from "react";
import { User } from "./models/User";

type Props = {
  user: User;
};

export const UserEditPage: FC<Props> = ({}) => {
  return (
    <>
      <div>
        <h4>Stuff</h4>
        <div>Display name</div>
        <div>User handle</div>
        <div>E-mail</div>
        <div>Role</div>
        <h4>Settings</h4>
        <div>Theme</div>
        <div>Default tickrate</div>
        <div>Default video quality</div>
        <h4>Notfications</h4>
        <div>New comments</div>
        <div>New favorites</div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
