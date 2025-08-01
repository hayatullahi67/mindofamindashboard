export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string; // Base64 encoded image
  postedTime: Date;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
}

export interface CreatePostData {
  title: string;
  content: string;
  category: string;
  image?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
} 