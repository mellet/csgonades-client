import { FC, useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { ContactApi } from "../admin-main/data/ContactApi";
import { CsgnInput } from "../common/inputs/CsgnInput";
import { CsgnTextArea } from "../common/inputs/CsgnTextArea";
import { AddConctactDTO } from "../admin-main/data/ContactDTOs";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../constants/Constants";

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
          margin: ${Dimensions.GUTTER_SIZE}px;
          padding: 20px 30px;
          color: ${colors.TEXT};
          background: ${colors.DP01};
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
