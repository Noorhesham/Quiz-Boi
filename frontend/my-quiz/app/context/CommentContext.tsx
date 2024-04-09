"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CommentContextType = {
  comment: string;
  setComment: (comment: string) => void;
  edit: string;
  setIsEdit: any;
};
const commentContext = createContext<CommentContextType | undefined>(undefined);

function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comment, setComment] = useState("");
  const [edit, setIsEdit] = useState("");

  const contextValue: CommentContextType = {
    comment,
    setComment,
    setIsEdit,
    edit,
  };
  return <commentContext.Provider value={contextValue}>{children}</commentContext.Provider>;
}

function useComment() {
  const context = useContext(commentContext);
  if (!context) throw new Error("useColor must be used within a ColorProvider");
  return context;
}

export { CommentProvider, useComment };
