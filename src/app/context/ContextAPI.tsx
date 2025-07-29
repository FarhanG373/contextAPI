"use client";
import { createContext, useState, useEffect } from "react";

export const context = createContext();

export const MainProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
      setLoading(false);
    } finally {
      setLoading(false);
      setError('');
    }
  };

  // Move postData inside MainProvider
  const postData = async (user) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      const result = await res.json();
      setData([...data, result.data]);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add postData to context value
  return (
    <context.Provider value={{ data, loading, error, postData }}>
      {children}
    </context.Provider>
  );
};