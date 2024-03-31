import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId }: { name: string; billboardId: string } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name's required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("BillBoard's required", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Billboard POST Error: ", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return  NextResponse.json(category);

  } catch (error) {
    console.error("Store GET Error: ", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
