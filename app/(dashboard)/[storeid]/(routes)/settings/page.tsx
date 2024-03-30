import SettingsForm from "@/components/SettingsForm";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface SettingProps {
  params: {
    storeId: string;
  };
}

const Settings: React.FC<SettingProps> = async ({ params }) => {
  const { userId: userid } = auth();
  if (!userid) {
    redirect("/");
  }
  const store = await prismadb?.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
