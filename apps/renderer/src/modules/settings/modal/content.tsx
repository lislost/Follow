import { repository } from "@pkg"
import i18next from "i18next"
import type { FC } from "react"
import { Suspense, useDeferredValue, useEffect, useLayoutEffect, useState } from "react"
import { Trans, useTranslation } from "react-i18next"

import { MotionButtonBase } from "~/components/ui/button"
import { useCurrentModal } from "~/components/ui/modal"
import { ScrollArea } from "~/components/ui/scroll-area"
import { SettingsTitle } from "~/modules/settings/title"

import { settings } from "../constants"
import { SettingTabProvider, useSettingTab } from "./context"
import { SettingModalLayout } from "./layout"

const pages = (() => {
  const pages = {}
  for (const setting of settings) {
    const filename = setting.path

    pages[filename] = {
      Component: setting.Component,
      loader: setting.loader,
    }
  }
  return pages
})()
export const SettingModalContent: FC<{
  initialTab?: string
}> = ({ initialTab }) => {
  useEffect(() => {
    // load i18n
    i18next.loadNamespaces("settings")
  }, [])
  return (
    <SettingTabProvider>
      <SettingModalLayout
        initialTab={initialTab ? (initialTab in pages ? initialTab : undefined) : undefined}
      >
        <Content />
      </SettingModalLayout>
    </SettingTabProvider>
  )
}

const Close = () => {
  const { dismiss } = useCurrentModal()
  const { t } = useTranslation("common")

  return (
    <MotionButtonBase
      aria-label={t("close")}
      className="absolute right-6 top-6 z-[99] flex size-8 items-center justify-center rounded-md duration-200 hover:bg-theme-button-hover"
      onClick={dismiss}
    >
      <i className="i-mgc-close-cute-re block" />
    </MotionButtonBase>
  )
}

const Content = () => {
  const key = useDeferredValue(useSettingTab() || "general")
  const { Component, loader } = pages[key]

  const [scroller, setScroller] = useState<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (scroller) {
      scroller.scrollTop = 0
    }
  }, [key])

  if (!Component) return null

  return (
    <Suspense>
      <SettingsTitle loader={loader} className="relative mb-0 px-8" />
      <Close />
      <ScrollArea.ScrollArea
        mask={false}
        ref={setScroller}
        rootClassName="h-full grow flex-1 shrink-0 overflow-auto pl-8 pr-7"
        viewportClassName="pr-1 min-h-full [&>div]:min-h-full [&>div]:relative pb-8"
      >
        <Component />

        <div className="h-12" />
        <p className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 text-xs opacity-80">
          <Trans
            ns="settings"
            i18nKey="common.give_star"
            components={{
              Link: <a href={`${repository.url}`} className="text-accent" target="_blank" />,
              HeartIcon: <i className="i-mgc-heart-cute-fi" />,
            }}
          />
        </p>
      </ScrollArea.ScrollArea>
    </Suspense>
  )
}
