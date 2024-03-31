"use client";
import React from "react";
import Heading from "./Heading";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "./ui/data-table";
import ApiList from "./ui/api-list";

interface Props {
  data: BillboardColumn[];
}
const BillboardClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`BillBoard's (${data.length})`}
          description="Manage billboards for your stores"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Separator />
      <Heading description="API calls for billboard ." title="API" />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillboardClient;
