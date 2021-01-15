import { FC } from "react";
import { AdminContactMessage } from "../ui/AdminContactMessage";
import { useAdminContact } from "../data/hooks";

export const AdminContactPage: FC = () => {
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
