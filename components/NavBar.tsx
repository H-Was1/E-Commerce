import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";

const NavBar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 px-4 items-center">
        <StoreSwitcher />
        <div>this will be the routes</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
