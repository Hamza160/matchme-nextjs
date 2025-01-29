import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react"
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";

const TopNav = () => {
  return (
    <Navbar
        maxWidth="full"
        className="bg-gradient-to-r from-pink-400 vie-red-400 to-pink-600"
        classNames={{
            item: [
                "text-xl",
                "text-white",
                "uppercase",
                "data-[active=ture]:text-yellow-200"
            ]
        }}
    >
        <NavbarBrand as={Link} href="/">
            <GiSelfLove
                size={40}
                className="text-gray-200"
            />
            <div className="font-bold text-3xl flex">
                <span className="text-gray-200">
                    MatchMe
                </span>
            </div>
        </NavbarBrand>
        <NavbarContent justify="center">
            <NavLink
                href="/members"
                label="Matches"
            />
            <NavLink
                href="/lists"
                label="Lists"
            />
            <NavLink
                href="/messages"
                label="Messages"
            />
        </NavbarContent>
        <NavbarContent justify="end">
            <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-white"
            >
                Login
            </Button>
            <Button
                as={Link}
                href="/register"
                variant="bordered"
                className="text-white"
            >
                Register
            </Button>
        </NavbarContent>
    </Navbar>
  );
}

export default TopNav;