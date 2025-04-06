import { useState, useEffect } from 'react';
import api from '../api';
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const useMessages = (token, userId, refreshToggle) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await api.post(
          `/messages/getAllMessages`,
          { token, id: userId }
        );
        setMessages(response.data.reverse());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [token, userId, refreshToggle]);

  const postMessage = async (messageData) => {
    try {
      await api.post(
        `/messages/addMessage/${userId}@${uuidv4()}`,
        messageData
      );
    } catch (error) {
      setError(error);
    }
  };

  return { messages, loading, error, postMessage };
};

export default useMessages;
