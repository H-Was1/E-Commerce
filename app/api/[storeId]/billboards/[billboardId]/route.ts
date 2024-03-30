import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, image } = body;
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }
    if (!params.billboardId) {
      return new NextResponse("billboardId is Required", { status: 400 });
    }
    if (!label) return new NextResponse("label is Required", { status: 400 });
    if (!image)
      return new NextResponse("imageUrl is Required", { status: 400 });
    if (!params.storeId) {
      return new NextResponse("StoreId is required!", { status: 400 });
    }
    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        image,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[billboard_PATCH] : ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!params.storeId)
      return new NextResponse("StoreId is Required", { status: 400 });
    if (!params.billboardId) {
      return new NextResponse("billboardId is Required", { status: 400 });
    }
    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const store = await prismadb?.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[billboard_DELETE] : ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string; storeId: string };
  }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("billboardId is Required", { status: 400 });
    }
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error: any) {
    console.log("[Billboards_GET] : " + error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
