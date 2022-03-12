import React, { createContext, ReactNode, useContext } from "react";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

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
  const user = {
    id: "12345",
    name: "Big Developer",
    email: "bignotto@gmail.com",
  };

  async function signInWithGoogle() {
    try {
      console.log("signInWithGoogle!!");
      const CLIENT_ID =
        "279567661806-djc3tj7l3h0jbflt49hf4liheo1sp3ok.apps.googleusercontent.com";
      const REDIRECT_URI =
        "https://auth.expo.io/@bignotto/ignite-native-gofinances";
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
        const userinfo = await response.json();
        console.log(userinfo);
      }

      //TODO: 25:33: complete google auth code ant test it!
    } catch (error) {
      throw new Error(`signInWithGoogle: ${error}`);
    }
  }

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
