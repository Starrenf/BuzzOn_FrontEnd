import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Frank",
    email: "frank.starren@gmail.com",
    role: "admin"
  });

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL || "https://buzzon-backend.onrender.com";

      try {
        const [usersRes, categoriesRes, eventsRes] = await Promise.all([
          fetch(`${BASE_URL}/users`),
          fetch(`${BASE_URL}/categories`),
          fetch(`${BASE_URL}/events`),
        ]);

        if (!usersRes.ok || !categoriesRes.ok || !eventsRes.ok) {
          throw new Error("One or more fetches failed");
        }

        const usersData = await usersRes.json();
        const categoriesData = await categoriesRes.json();
        const eventsData = await eventsRes.json();

        setUsers(usersData);
        setCategories(categoriesData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ users, categories, events, setEvents, currentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
