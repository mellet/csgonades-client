import { FC } from "react";
import { Message } from "semantic-ui-react";

export const UserNotFound: FC = () => {
  return (
    <>
      <div className="not-found">
        <Message negative size="large">
          <Message.Header>404 NOT FOUND</Message.Header>
          <p>We could not find the user.</p>
        </Message>
      </div>
      <style jsx>{`
        .not-found {
          min-height: 50vh;
          margin: 18px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};
