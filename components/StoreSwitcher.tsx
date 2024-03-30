"use client";
import React, { useState } from "react";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface SwitchProps extends PopoverTriggerProps {
  items: Store[];
}

function StoreSwitcher({ className, items }: SwitchProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const [Open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={Open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn("w-[200px] justify-between", className)}
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={Open}
          aria-label="Select a Store!"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store ..." />
          <CommandList>
            <CommandEmpty>No store found!</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={
                      (cn("ml-auto h-3 w-4"),
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0")
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StoreSwitcher;
