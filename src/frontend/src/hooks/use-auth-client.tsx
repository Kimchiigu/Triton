import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from '@dfinity/auth-client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { canisterId, createActor } from '@/declarations/internet_identity';
import { ActorSubclass, HttpAgent, Identity } from '@dfinity/agent';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  authClient: AuthClient | null;
  identity: Identity | null;
  principal: string | null;
  whoamiActor: ActorSubclass<any> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getIdentityProvider = (): string | undefined => {
  if (typeof window !== 'undefined') {
    const isLocal = process.env.DFX_NETWORK !== 'ic';
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isLocal && isSafari) {
      return `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
    } else if (isLocal) {
      return `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
    }
  }
  return undefined;
};

export const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  } as AuthClientCreateOptions,
  loginOptions: {
    identityProvider: getIdentityProvider(),
  } as AuthClientLoginOptions,
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<any> | null>(
    null,
  );

  useEffect(() => {
    AuthClient.create(options.createOptions).then((client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    if (!authClient) return;
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal().toText();
    setPrincipal(principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: { identity },
    });

    setWhoamiActor(actor as ActorSubclass<any>);
  }

  async function logout() {
    if (!authClient) return;
    await authClient.logout();
    await updateClient(authClient);
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
