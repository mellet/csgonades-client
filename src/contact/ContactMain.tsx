import { FC, useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { ContactApi } from "./data/ContactApi";
import { CsgnInput } from "../shared-components/inputs/TextInput/CsgnInput";
import { CsgnTextArea } from "../shared-components/inputs/CsgnTextArea";
import { AddConctactDTO } from "./models/ContactDTOs";
import { useTheme } from "../core/settings/SettingsHooks";

export const ContactMain: FC = () => {
  const { colors } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  console.log("Contact page");

  async function onSubmit() {
    if (!email.length) {
      return setError("Missing e-mail.");
    } else if (!name.length) {
      return setError("Missing name.");
    } else if (!message.length) {
      return setError("Missing message.");
    }

    const contactMessage: AddConctactDTO = {
      name,
      email,
      message,
    };

    const result = await ContactApi.sendMessage(contactMessage);

    if (result.isErr()) {
      return setError(result.error.message);
    }

    setError(null);
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <>
      <div className="contact">
        <h1>Contact me 📨</h1>
        {!!error && <p>{error}</p>}

        {success && (
          <Message positive>
            <Message.Header>Message sent</Message.Header>
            <p>Your message has been sent.</p>
          </Message>
        )}

        <CsgnInput label="Name" initialValue={name} onChange={setName} />
        <CsgnInput label="E-mail" initialValue={email} onChange={setEmail} />
        <CsgnTextArea label="Message" value={message} onChange={setMessage} />

        <Button positive onClick={onSubmit}>
          Send
        </Button>
      </div>
      <style jsx>{`
        .contact {
          padding: 16px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};
