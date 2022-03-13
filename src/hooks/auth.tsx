import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const userStorageKey = "@gofinances:user";
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userResponse = await response.json();
        const loggedUser = {
          name: userResponse.given_name,
          email: userResponse.email,
          id: userResponse.id,
          photo: userResponse.picture,
        };

        setUser(loggedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loggedUser));
      }
    } catch (error) {
      throw new Error(`signInWithGoogle: ${error}`);
    }
  }

  useEffect(() => {
    async function loadLoggedUser() {
      const storageUser = await AsyncStorage.getItem(userStorageKey);
      if (storageUser) {
        const loggedUser = JSON.parse(storageUser) as User;
        setUser(loggedUser);
      }
      setIsLoading(false);
    }
    loadLoggedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
