import { ContactApi } from "../../../contact/data/ContactApi";
import { sortByDate } from "../../../utils/Common";
import useSWR from "swr";

async function fetchContact() {
  const res = await ContactApi.fetchContactMessages();
  const contactMessages = [...res];
  contactMessages.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
  return contactMessages;
}

export const useAdminContact = () => {
  const { data } = useSWR("/contact", fetchContact);

  return {
    contactMessages: data || [],
  };
};
