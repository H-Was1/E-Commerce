"use client";
import { Billboard, Store } from "@prisma/client";
import React, { useState } from "react";
import Heading from "./Heading";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./AlertModal";
import { useOrigin } from "@/hooks/useOrigin";
import ImageUpload from "./ImageUpload";
import { revalidatePath } from "next/cache";

interface InitialProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(3),
  image: z.string().min(1),
});

type settingsForm = z.infer<typeof formSchema>;

const BillboardForm: React.FC<InitialProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  //------------------ Form Schema ----------------

  const form = useForm<settingsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      image: "",
    },
  });

  const onSubmit = async (data: settingsForm) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //----------------- rest of handlers ----------------

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      toast.success("Billboard deleted!");
    } catch (error) {
      toast.error(
        "Make sure you have removed all categories first, that are using this billboard."
      );
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  //------------------- form component ---------------------------------

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard!" : "Create a billboard!";
  const toastMessage = initialData
    ? "Billboard updated!"
    : "Billboard Created!";
  const action = initialData ? "Save changes!" : "Create!";

  return (
    <>
      <AlertModal
        isOpen={Open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={IsLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
            disabled={IsLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={IsLoading}
                    onchange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard Label . . ."
                      disabled={IsLoading}
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={IsLoading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
      {/* <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      /> */}
    </>
  );
};

export default BillboardForm;
