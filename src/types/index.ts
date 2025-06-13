export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  loginToken: (token: string) => void;
  logOut: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};
export type loginDataType = {
  username: string;
  password: string;
};

export type signUpDataType = {
  username: string;
  password: string;
  email: string;
};

export type projectInfoDataType = {
  title: string;
  description: string;
  tags: Array<string>;
  techStack: Array<string>;
};
export type AddVoteType = {
  ideaId: string;
  vote: number;
};

export type ideaType = {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  techStack: Array<string>;
  status: string;
  Votes: number | null;
  updatedAt:Date;
};
