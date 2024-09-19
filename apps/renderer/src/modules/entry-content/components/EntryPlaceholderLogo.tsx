import { Logo } from "~/components/icons/logo"
import { stopPropagation } from "~/lib/dom"
import { cn } from "~/lib/utils"
import { useFeedHeaderTitle } from "~/store/feed"

import { useEntryContentPlaceholderLogoShow } from "../atoms"

export const EntryPlaceholderLogo = () => {
  const title = useFeedHeaderTitle()

  const logoShow = useEntryContentPlaceholderLogoShow()

  return (
    <div
      onContextMenu={stopPropagation}
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center gap-1 text-balance px-12 pb-6 text-center text-lg font-medium text-zinc-400 duration-500",
        !logoShow && "translate-y-[-50px] opacity-0",
      )}
    >
      <Logo className="size-16 opacity-40 grayscale" />
      <span className="max-w-[60ch]">{title}</span>
    </div>
  )
}