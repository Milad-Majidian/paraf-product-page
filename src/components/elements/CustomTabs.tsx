"use client"

import * as React from "react"
import { cn } from "@/share/utils/cn"
import {
  Tabs as Root,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

type TabItem = {
  value: string
  label: React.ReactNode
  content: React.ReactNode
}

type CustomTabsProps = {
  direction?: "ltr" | "rtl",
  tabItems: TabItem[]
  defaultValue?: string
  className?: string
  listClassName?: string
  triggerClassName?: string
  selectedTriggerClassName?: string
  contentClassName?: string
  variant?: "default" | "outline" | "pills"
  renderTrigger?: (item: TabItem, index: number) => React.ReactNode
}

export default function CustomTabs({
  tabItems,
  direction,
  defaultValue,
  className,
  listClassName,
  triggerClassName,
  selectedTriggerClassName,
  contentClassName,
  variant = "default",
  renderTrigger,
}: CustomTabsProps) {
  const triggerBase = cn(
    triggerClassName,
    // make inactive triggers have a transparent border so only active shows border-2
    variant === "pills" && "rounded-full px-3 py-1",
    variant === "outline" && "border bg-background/50",
    // active state styles: when a trigger is selected
    selectedTriggerClassName
  )


  return (
    <Root defaultValue={defaultValue} className={cn("w-full h-full", className)} dir={direction}>
      <TabsList className={cn("gap-1 w-full", listClassName)}>
        {tabItems.map((tab, i) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(triggerBase)}
          >
            {renderTrigger ? renderTrigger(tab, i) : tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="w-full flex flex-col flex-1 mt-2">
        {tabItems.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className={cn("h-full w-full", contentClassName)}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Root>
  )
}

export { Root as Tabs, TabsList, TabsTrigger, TabsContent }
