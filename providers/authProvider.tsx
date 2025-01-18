import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types/types.config";
import { StyleSheet, Text, View } from "react-native";

const initialState = {
  isAuthenticated: null as boolean | null,
  login: async () => {},
  user: undefined,
  logout: async () => {},
};

type AuthContextType = {
  isAuthenticated: boolean | null;
  login: (userData: UserType) => void;
  user: UserType | undefined;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(initialState);

interface Props extends PropsWithChildren {}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserType | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Failed to load session", error);
      } finally {
        setLoading(false); // Stop loading after checking session
      }
    };
    checkSession();
  }, []);

  const login = async (userData: UserType) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Failed to log in. Please try again.");
      console.log("Login Error:", error);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUser(undefined);
      setIsAuthenticated(false);
    } catch (error) {
      setError("Failed to log out. Please try again.");
      console.log("Logout Error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be assesible within AuthProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
