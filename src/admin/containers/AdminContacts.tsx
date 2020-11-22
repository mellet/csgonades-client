import { FC } from "react";
import { ContactMessage } from "../components/ContactMessage";
import { useAdminContact } from "../data/hooks";

export const AdminContacts: FC = () => {
  const { contactMessages } = useAdminContact();

  return (
    <>
      <div>
        {contactMessages.map((cM) => (
          <ContactMessage key={cM.id} contactMessage={cM} />
        ))}
      </div>
      <style jsx>{``}</style>
    </>
  );
};
