"use client";

import { useState } from "react";

const useNetwork = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getRequest = async () => {};

  return { getRequest, data, error, loading };
};

export default useNetwork;
