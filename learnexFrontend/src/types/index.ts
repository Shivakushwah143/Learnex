export interface User {
  userName: string;
}

export interface Course {
  _id: string;
  tittle: string;
  discription: string;
  price: number;
  publish: boolean;
  image: string;
  createdBy?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  courses?: Course[];
  purchasedCourses?: Course[];
  singleCourse?: Course;
  course?: Course;
  courseId?: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
  loading: boolean;
}