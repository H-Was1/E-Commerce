"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { CategoryColumn, columns } from "./columns";
import Heading from "@/components/Heading";

interface Props {
  data: CategoryColumn[];
}
const CategoryClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your stores"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Separator />
      <Heading description="API calls for Categories ." title="API" />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
