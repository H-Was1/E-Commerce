import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import { Store } from "@prisma/client";
import prismadb from "@/lib/prismadb";

const NavBar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb?.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 px-4 items-center">
        <StoreSwitcher items={stores as Store[]} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
