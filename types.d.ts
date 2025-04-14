export interface Book {
    id: number;
    title: string;
    author:string;
    genre: string;
    rating: number;
    total_copies: number; 
    available_copies: number; 
    description: string;
    coverColor: string;
    coverUrl: string;
    video:string;
    summary:string;
    isLoanedBook?: boolean;
}

export interface AuthCredentials {
  fullName: string;
  email:string;
  password: string;
  universityId: number;
  universityCard: string;
}