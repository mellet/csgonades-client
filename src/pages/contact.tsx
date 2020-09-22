import { NextPage } from "next";
import { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { ContactApi } from "../api/ContactApi";
import { CsgnInput } from "../common/inputs/CsgnInput";
import { CsgnTextArea } from "../common/inputs/CsgnTextArea";
import { ConctactDTO } from "../models/Contact";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SEO } from "../layout/SEO";
import { PageCentralize } from "../common/PageCentralize";

const ContactPageContainer: NextPage = () => {
  const { colors } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function onSubmit() {
    if (email.length === 0 || name.length === 0 || message.length === 0) {
      setError("Something missing");
      return;
    }

    const contactMessage: ConctactDTO = {
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
      <SEO title="Contact" canonical="/contact" />
      <PageCentralize>
        <div className="contact">
          <h1>Contact me 📨</h1>
          {!!error && <p>{error}</p>}

          <CsgnInput label="Name" value={name} onChange={setName} />
          <CsgnInput label="E-mail" value={email} onChange={setEmail} />
          <CsgnTextArea label="Message" value={message} onChange={setMessage} />

          <Button positive onClick={onSubmit}>
            Send
          </Button>

          {success && (
            <Message positive>
              <Message.Header>Message sent</Message.Header>
              <p>Your message has been sent.</p>
            </Message>
          )}
        </div>
      </PageCentralize>
      <style jsx>{`
        .contact {
          margin-top: 30px;
          margin-bottom: 100px;
          padding: 20px 30px;
          color: ${colors.TEXT};
          background: ${colors.DP01};
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default ContactPageContainer;
