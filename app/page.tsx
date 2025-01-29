import { Button } from "@heroui/react";
import { GoSmiley } from "react-icons/go";
import Link from 'next/link';

export default function Home() {
  return (
      <div>
        <h1 className="text-3xl">Hello</h1>
        <Button 
          as={Link}
          href="/members"
          color="danger" 
          variant="bordered"
          startContent={<GoSmiley/>}
        >
          Click Me
        </Button>
      </div>
  );
}