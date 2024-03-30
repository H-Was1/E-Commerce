import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, image } = body;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!label) return new NextResponse("label is Required", { status: 400 });
    if (!image)
    return new NextResponse("imageUrl is Required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("StoreId is Required", { status: 400 });

    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const store = await prismadb.billboard.create({
      data: {
        label,
        image,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(store);
  } catch (error: any) {
    console.log("[Billboards_Post] : " + error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error: any) {
    console.log("[Billboards_GET] : " + error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
