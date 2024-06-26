import prismadb from "@/lib/prismadb";
import React from "react";

async function DashboardPage({ params }: { params: { storeId: string } }) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>{`Active Store: ${store?.name}`}</div>;
}

export default DashboardPage;
