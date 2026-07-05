// import * as React from "react"
// import { cva, type VariantProps } from "class-variance-authority"
// import { Slot } from "radix-ui"

// import { cn } from "@/lib/utils"

// const badgeVariants = cva(
//   "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
//         secondary:
//           "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
//         destructive:
//           "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
//         outline:
//           "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
//         ghost:
//           "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function Badge({
//   className,
//   variant = "default",
//   asChild = false,
//   ...props
// }: React.ComponentProps<"span"> &
//   VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
//   const Comp = asChild ? Slot.Root : "span"

//   return (
//     <Comp
//       data-slot="badge"
//       data-variant={variant}
//       className={cn(badgeVariants({ variant }), className)}
//       {...props}
//     />
//   )
// }

// export { Badge, badgeVariants }

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#ff0000] text-white hover:bg-[#ff0000e6] shadow-lg hover:shadow-[0_0_15px_hsl(0_100%_50%/0.4)]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-[#f2f2f2] border-[#333333] hover:bg-[#262626] hover:border-[#ff000080] [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

