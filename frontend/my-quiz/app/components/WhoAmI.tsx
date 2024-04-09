import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card>;

export function WhoAmI({ className, ...props }: CardProps) {
  return (
    <Card className="flex flex-col self-center  m-auto max-w-[500px] gap-2 p-2 items-center" {...props}>
      <CardHeader>
        <CardTitle>NoorEldien Hesham</CardTitle>
        <CardDescription>Mern Stack Web Developer</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <div className=" flex items-center flex-col space-x-4 rounded-md border p-4">
          <Image className=" rounded-full" width={200} height={200} src={"/me.jpg"} alt="me" />
          <div className="flex items-center">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <p className="text-sm p-3 font-medium leading-none">
              {" "}
              Greetings! I'm a Full Stack Developer specializing in React, Next.js,Node,Express,MongoDb and TypeScript.
              With a track record of crafting robust and scalable web applications, I've recently expanded my skill set
              to include backend technologies like Node.js, MongoDB, and Express. My passion lies in creating impactful
              digital solutions, and I'm committed to pushing the boundaries of innovation. Join me on this journey as I
              continue to build, learn, and shape the future of web development.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link className="flex items-center gap-2" href={"https://noor-hesham-portfolio.netlify.app/"}>
            {" "}
            <CheckIcon className="mr-2 h-4 w-4" />
            View My Portfolio
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
