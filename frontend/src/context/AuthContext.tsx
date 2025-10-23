import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { User } from '../types';
import { UserService } from '../services/HabitService';

type AuthContextType = {
 user?:User | null
 login:(userId: number)=> Promise<void>
 logout:()=> void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User| null| undefined>(undefined)
  async function login(userId:number) {
    const u = await UserService.get(userId)
    setUser(u)
    localStorage.setItem('userId', String(userId))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('userId')
  }

  // opcional: carregar user do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userId')
    if(stored) login(Number(stored))
  }, [])

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
