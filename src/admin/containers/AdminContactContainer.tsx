import { FC } from "react";
import { AdminContactMessage } from "../components/AdminContactMessage";
import { useAdminContact } from "../data/hooks";

export const AdminContactContainer: FC = () => {
  const { contactMessages } = useAdminContact();

  return (
    <>
      <div>
        {contactMessages.map((cM) => (
          <AdminContactMessage key={cM.id} contactMessage={cM} />
        ))}
      </div>
    </>
  );
};
