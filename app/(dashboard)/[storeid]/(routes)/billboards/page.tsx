import BillboardClient from "@/components/BillboardClient";
import { BillboardColumn } from "@/components/columns";
import prismadb from "@/lib/prismadb";
import React from "react";
import { format } from "date-fns";

const Billboards = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  // revalidatePath(`/${params.storeId}/billboards`); // TODO: added by me
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      createdAt: format(billboard.createdAt, "MMMM do , yyyy"),
      label: billboard.label,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
