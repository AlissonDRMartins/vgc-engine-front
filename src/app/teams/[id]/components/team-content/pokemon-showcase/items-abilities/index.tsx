"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemsList } from "./items-list";

export const ItemsAbilities = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.2 }}
      className="md:mt-4 p-1"
    >
      <Tabs defaultValue="items" className="w-full">
        <TabsList className="w-full bg-stone-300 dark:bg-stone-950 rounded-b-none">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="abilities">Abilities</TabsTrigger>
        </TabsList>
        <TabsContent
          value="items"
          className="bg-stone-200 dark:bg-stone-900 -mt-2 p-2 rounded-b-md"
        >
          <ItemsList />
        </TabsContent>
        <TabsContent
          value="abilities"
          className="bg-stone-200 dark:bg-stone-900 -mt-2 p-2 rounded-b-md"
        >
          <span>abilities</span>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
