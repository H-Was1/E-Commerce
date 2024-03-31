import BillboardClient from "@/components/BillboardClient";
import { BillboardColumn } from "@/components/columns";
import prismadb from "@/lib/prismadb";
import React from "react";
import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/CategoryClient";

const Categories = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  // revalidatePath(`/${params.storeId}/billboards`); // TODO: added by me
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboards: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    createdAt: format(category.createdAt, "MMMM do , yyyy"),
    name: category.name,
    billboardLabel: category.billboard.label,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Categories;
