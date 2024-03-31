import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { Header } from "./Header";
import Social from "./Social";
import Logo from "./Logo";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  heading?: string;
}
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  heading,
}: CardWrapperProps) => {
  return (
    <Card className=" w-full rounded-none border-none shadow-none">
      <CardHeader className=" flex flex-col gap-3 items-center">
        <Logo />
        {heading && <Header label={headerLabel} heading={heading} />}
      </CardHeader>
      <CardContent className="">{children}</CardContent>
      {showSocial && <CardFooter></CardFooter>}
    </Card>
  );
};

export default CardWrapper;
