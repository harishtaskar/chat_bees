"use client";
// import { PORT } from "../utils/Config";
import axios from "axios";
import { useCallback, useState } from "react";

const useNetwork = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getRequest = async (path: string, headers?: any) => {
    try {
      const token = global.window.localStorage.getItem("Authorization");
      setLoading(true);
      const response = await axios.get(
        `${"https://chat-bees-backend.onrender.com"}${path}`,
        {
          headers: {
            ...headers,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: token,
          },
        }
      );
      const data = await response.data;
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const postRequest = useCallback(
    async (path: string, body: any, headers?: any) => {
      try {
        const token = global.window.localStorage.getItem("Authorization");
        setLoading(true);
        const response = await axios.post(
          `${"https://chat-bees-backend.onrender.com"}${path}`,
          body,
          {
            headers: {
              ...headers,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: token,
            },
          }
        );
        const data = await response.data;
        setData(data);
        return data;
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const patchRequest = useCallback(
    async (path: string, body: any, headers?: any) => {
      try {
        const token = global.window.localStorage.getItem("Authorization");
        setLoading(true);
        const response = await axios.patch(
          `${"https://chat-bees-backend.onrender.com"}${path}`,
          body,
          {
            headers: {
              ...headers,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: token,
            },
          }
        );
        const data = await response.data;
        setData(data);
        return data;
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteRequest = useCallback(async (path: string, headers?: any) => {
    try {
      const token = global.window.localStorage.getItem("Authorization");
      setLoading(true);
      const response = await axios.delete(
        `${"https://chat-bees-backend.onrender.com"}${path}`,
        {
          headers: {
            ...headers,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: token,
          },
        }
      );
      const data = await response.data;
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    postRequest,
    getRequest,
    patchRequest,
    deleteRequest,
    data,
    error,
    loading,
  };
};

export default useNetwork;
