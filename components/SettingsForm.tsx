"use client";
import { Store } from "@prisma/client";
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
import ApiAlert from "./ApiAlert";
import { useOrigin } from "@/hooks/useOrigin";

interface InitialProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type settingsForm = z.infer<typeof formSchema>;

const SettingsForm: React.FC<InitialProps> = ({ initialData }) => {
  const params = useParams();
  const origin = useOrigin();
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  //------------------ Form Schema ----------------

  const form = useForm<settingsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: settingsForm) => {
    console.log(data);
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //----------------- rest of handlers ----------------

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      toast.success("Store deleted!");
    } catch (error) {
      toast.error(
        "Make sure you have removed all the products and categories first."
      );
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  //------------------- form component ---------------------------------

  return (
    <>
      <AlertModal
        isOpen={Open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={IsLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences!" />
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
          disabled={IsLoading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Store Name"
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
            Save changes!
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
