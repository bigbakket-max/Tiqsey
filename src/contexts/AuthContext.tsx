import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Booking } from '../types';

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  loginWithGoogle: (email: string, name: string, avatarUrl: string) => Promise<User>;
  logout: () => void;
  updateProfile: (name: string, email: string, bio?: string, avatarUrl?: string) => Promise<User>;
  addBooking: (attractionId: string, attractionName: string, imageUrl: string, city: string, date: string, count: number, pricePerTicket: number, guestInfo?: { name: string; email: string }) => Promise<Booking>;
  rateBooking: (bookingId: string, rating: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default demo credentials
const DEMO_EMAIL = 'demo@tiqsey.com';
const DEMO_PASSWORD = 'password123';

export const deriveNameFromEmail = (emailStr: string): string => {
  if (!emailStr) return '';
  const parts = emailStr.split('@')[0];
  if (!parts) return '';
  return parts
    .replace(/[._\-+]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Load user and bookings on mount
  useEffect(() => {
    // Prime the mock users database with demo account
    const registeredUsers = localStorage.getItem('tiqsey_users');
    if (!registeredUsers) {
      const initialUsers = [
        {
          id: 'demo-user-123',
          name: 'Alex Mercer',
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
          bio: 'Adventurer, photographer, and world traveler. Always looking for the next historic landmark or nature hike.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          createdAt: new Date().toLocaleDateString(),
        }
      ];
      localStorage.setItem('tiqsey_users', JSON.stringify(initialUsers));
    }

    // Check if there is an active session
    const currentSession = localStorage.getItem('tiqsey_current_session');
    if (currentSession) {
      try {
        const loggedUser = JSON.parse(currentSession);
        setUser(loggedUser);
        
        // Load bookings for this user
        const storedBookings = localStorage.getItem(`tiqsey_bookings_${loggedUser.id}`);
        let parsedBookings = storedBookings ? JSON.parse(storedBookings) : null;
        if (parsedBookings && parsedBookings.length === 2 && loggedUser.email === DEMO_EMAIL) {
          parsedBookings.push({
            id: 'book-3',
            attractionId: 'louvre-museum',
            attractionName: 'Louvre Museum: Ultimate Priority Access & Audio Tour',
            attractionImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=85&w=1200',
            city: 'Paris',
            bookingDate: '2026-04-10',
            ticketsCount: 3,
            totalPrice: 90,
            bookingRef: 'TQ-452109-FR',
            status: 'confirmed'
          });
          localStorage.setItem(`tiqsey_bookings_${loggedUser.id}`, JSON.stringify(parsedBookings));
        }
        if (parsedBookings) {
          setBookings(parsedBookings);
        } else {
          // Pre-populate some historical bookings for the demo user to make the "My Tickets" section feel rich and real
          if (loggedUser.email === DEMO_EMAIL) {
            const prePopulated: Booking[] = [
              {
                id: 'book-1',
                attractionId: 'sagrada-familia',
                attractionName: 'Sagrada Familia | Skip-The-Line Tickets + Audio Guide',
                attractionImageUrl: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=85&w=1200',
                city: 'Barcelona',
                bookingDate: '2026-06-15',
                ticketsCount: 2,
                totalPrice: 60,
                bookingRef: 'TQ-983105-ES',
                status: 'confirmed'
              },
              {
                id: 'book-2',
                attractionId: 'van-gogh',
                attractionName: 'Van Gogh Museum: Timed-entry Admission Ticket',
                attractionImageUrl: 'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=85&w=1200',
                city: 'Amsterdam',
                bookingDate: '2026-06-12',
                ticketsCount: 1,
                totalPrice: 22,
                bookingRef: 'TQ-340120-NL',
                status: 'confirmed'
              },
              {
                id: 'book-3',
                attractionId: 'louvre-museum',
                attractionName: 'Louvre Museum: Ultimate Priority Access & Audio Tour',
                attractionImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=85&w=1200',
                city: 'Paris',
                bookingDate: '2026-04-10',
                ticketsCount: 3,
                totalPrice: 90,
                bookingRef: 'TQ-452109-FR',
                status: 'confirmed'
              }
            ];
            localStorage.setItem(`tiqsey_bookings_${loggedUser.id}`, JSON.stringify(prePopulated));
            setBookings(prePopulated);
          }
        }
      } catch (e) {
        console.error('Session restoration failed', e);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simulate real short async network delay for nice UX spinner transitions
      setTimeout(() => {
        const usersRaw = localStorage.getItem('tiqsey_users') || '[]';
        const users = JSON.parse(usersRaw);
        
        const matched = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (matched) {
          // Clean password before setting state
          const { password: _, ...userSession } = matched;
          localStorage.setItem('tiqsey_current_session', JSON.stringify(userSession));
          setUser(userSession);
          
          // Load bookings
          const storedBookings = localStorage.getItem(`tiqsey_bookings_${userSession.id}`);
          if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
          } else {
            setBookings([]);
          }
          
          resolve(userSession);
        } else {
          // Check if email exists to give better mock form feedback
          const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
          if (emailExists) {
            reject(new Error('Incorrect password. Please try again.'));
          } else {
            reject(new Error('No account found with this email. Please check or register a new account.'));
          }
        }
      }, 700);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersRaw = localStorage.getItem('tiqsey_users') || '[]';
        const users = JSON.parse(usersRaw);
        
        const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          reject(new Error('An account with this email is already registered. Please sign in instead.'));
          return;
        }

        const newUserDb = {
          id: `user-${Date.now()}`,
          name: name || deriveNameFromEmail(email),
          email,
          password,
          bio: 'New explorer on Tiqsey! Adventure is just a booking away.',
          avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&q=80&w=200`,
          createdAt: new Date().toLocaleDateString(),
        };

        const updatedUsersList = [...users, newUserDb];
        localStorage.setItem('tiqsey_users', JSON.stringify(updatedUsersList));

        // Create active session
        const { password: _, ...userSession } = newUserDb;
        localStorage.setItem('tiqsey_current_session', JSON.stringify(userSession));
        setUser(userSession);
        setBookings([]); // starts blank

        resolve(userSession);
      }, 900);
    });
  };

  const loginWithGoogle = async (email: string, name: string, avatarUrl: string): Promise<User> => {
    return new Promise((resolve) => {
      // Small network loading simulation
      setTimeout(() => {
        const usersRaw = localStorage.getItem('tiqsey_users') || '[]';
        const users = JSON.parse(usersRaw);
        
        let matched = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        const derivedName = deriveNameFromEmail(email);
        
        if (!matched) {
          matched = {
            id: `google-${Date.now()}`,
            name: derivedName,
            email,
            password: `google-auth-${Date.now()}`,
            bio: 'Explorer signed in via Google Secure Identity Gateway.',
            avatarUrl,
            createdAt: new Date().toLocaleDateString(),
          };
          users.push(matched);
        } else {
          // Keep name derived from email and prevent changing
          matched.name = derivedName;
          matched.avatarUrl = avatarUrl;
        }
        
        localStorage.setItem('tiqsey_users', JSON.stringify(users));

        const { password: _, ...userSession } = matched;
        localStorage.setItem('tiqsey_current_session', JSON.stringify(userSession));
        setUser(userSession);

        const storedBookings = localStorage.getItem(`tiqsey_bookings_${userSession.id}`);
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        } else {
          setBookings([]);
        }

        resolve(userSession);
      }, 700);
    });
  };

  const logout = () => {
    localStorage.removeItem('tiqsey_current_session');
    setUser(null);
    setBookings([]);
  };

  const updateProfile = async (name: string, email: string, bio?: string, avatarUrl?: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error('No authenticated user'));
        return;
      }
      setTimeout(() => {
        const usersRaw = localStorage.getItem('tiqsey_users') || '[]';
        const users = JSON.parse(usersRaw);
        
        const matchedIdx = users.findIndex((u: any) => u.id === user.id);
        if (matchedIdx !== -1) {
          // Keep the original name and email to avoid profile modifications
          const originalUser = users[matchedIdx];
          const updatedUserDb = {
            ...originalUser,
            // Guaranteed locked properties
            name: originalUser.name || deriveNameFromEmail(originalUser.email),
            email: originalUser.email,
            bio: bio || originalUser.bio,
            avatarUrl: avatarUrl || originalUser.avatarUrl
          };
          
          users[matchedIdx] = updatedUserDb;
          localStorage.setItem('tiqsey_users', JSON.stringify(users));
          
          const { password: _, ...userSession } = updatedUserDb;
          localStorage.setItem('tiqsey_current_session', JSON.stringify(userSession));
          setUser(userSession);
          resolve(userSession);
        } else {
          reject(new Error('User profile database record not found.'));
        }
      }, 500);
    });
  };

  const addBooking = async (
    attractionId: string, 
    attractionName: string, 
    imageUrl: string, 
    city: string, 
    date: string, 
    count: number, 
    pricePerTicket: number,
    guestInfo?: { name: string; email: string }
  ): Promise<Booking> => {
    return new Promise((resolve, reject) => {
      let activeUser = user;

      if (!activeUser && guestInfo) {
        // Create an anonymous, lightweight guest session
        const guestId = `guest-${Date.now()}`;
        const newGuest: User = {
          id: guestId,
          name: guestInfo.name,
          email: guestInfo.email,
          createdAt: new Date().toLocaleDateString(),
          bio: 'Guest Voyager (Anonymous Checkout)'
        };

        // Save guest user state to DB
        const usersRaw = localStorage.getItem('tiqsey_users') || '[]';
        const users = JSON.parse(usersRaw);
        users.push(newGuest);
        localStorage.setItem('tiqsey_users', JSON.stringify(users));

        // Authenticate guest user session
        localStorage.setItem('tiqsey_current_session', JSON.stringify(newGuest));
        setUser(newGuest);
        activeUser = newGuest;
      }

      if (!activeUser) {
        reject(new Error('Please log in, register, or provide guest details to buy tickets.'));
        return;
      }

      setTimeout(() => {
        const newBooking: Booking = {
          id: `book-${Date.now()}`,
          attractionId,
          attractionName,
          attractionImageUrl: imageUrl,
          city,
          bookingDate: date,
          ticketsCount: count,
          totalPrice: count * pricePerTicket,
          bookingRef: `TQ-${Math.floor(100000 + Math.random() * 900000)}-${city.slice(0, 2).toUpperCase()}`,
          status: 'confirmed'
        };

        const updatedBookings = [newBooking, ...bookings];
        localStorage.setItem(`tiqsey_bookings_${activeUser.id}`, JSON.stringify(updatedBookings));
        setBookings(updatedBookings);

        resolve(newBooking);
      }, 400);
    });
  };

  const rateBooking = async (bookingId: string, rating: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const activeUser = user;
      if (!activeUser) {
        reject(new Error('No authenticated user'));
        return;
      }
      setTimeout(() => {
        const updatedBookings = bookings.map(b => 
          b.id === bookingId ? { ...b, rating } : b
        );
        localStorage.setItem(`tiqsey_bookings_${activeUser.id}`, JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        resolve();
      }, 300);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      bookings, 
      isAuthModalOpen, 
      setAuthModalOpen, 
      login, 
      register, 
      loginWithGoogle,
      logout, 
      updateProfile,
      addBooking,
      rateBooking
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
