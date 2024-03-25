"use client";

import * as z from "zod";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters !" }),
});

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      console.log(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  //-------- modal state --------------------------------
  const storeModal = useStoreModal();
  return (
    <Modal
      description="Add a new store to manae products and categories"
      title="Create Store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="">
        <div className="space-y-4 p-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-Commerce"
                        {...field}
                        disabled={isLoading}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 skew-x-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
