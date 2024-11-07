import { createContext, useEffect, useState } from "react";
import api from '../utils/api';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // New state to track loading

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setLoading(true);  // Set loading to true before fetching
        try {
            const response = await api.get("/auth/refetch");
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);  // Ensure user is set to null if the fetch fails
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>  {/* Pass loading in context */}
            {children}
        </UserContext.Provider>
    );
}
