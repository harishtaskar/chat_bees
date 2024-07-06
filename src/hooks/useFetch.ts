import { useState } from "react";
import useNetwork from "./useNetwork";

const useFetch = () => {
  const { getRequest } = useNetwork();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const fetchMessages = async (conversation: string) => {
    try {
      setLoading(true);
      const response = await getRequest(
        `/conversation/messages?conversation_id=${conversation}`
      );
      if ((await response?.res) === "ok") {
        setLoading(false);
        return response?.messages;
      } else {
        setLoading(false);
        return [];
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { loading, error, fetchMessages };
};

export default useFetch;
