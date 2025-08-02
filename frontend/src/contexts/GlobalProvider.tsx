'use client'
import React, { createContext, useContext } from 'react'
import { SiteSettingType } from '@/types/site-setting.type'

interface GlobalData {
  siteSetting: SiteSettingType
}

const GlobalDataContext = createContext<GlobalData | null>(null)

export function GlobalDataProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: GlobalData
}) {
  return <GlobalDataContext.Provider value={value}>{children}</GlobalDataContext.Provider>
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext)
  if (!context) throw new Error('useGlobalData must be used within a GlobalDataProvider')
  return context
}
