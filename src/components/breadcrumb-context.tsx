import * as React from "react"

interface BreadcrumbContextValue {
  breadcrumb: React.ReactNode
  setBreadcrumb: (node: React.ReactNode) => void
  headerAction: React.ReactNode
  setHeaderAction: (node: React.ReactNode) => void
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  breadcrumb: null,
  setBreadcrumb: () => {},
  headerAction: null,
  setHeaderAction: () => {},
})

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumb, setBreadcrumb] = React.useState<React.ReactNode>(null)
  const [headerAction, setHeaderAction] = React.useState<React.ReactNode>(null)
  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb, headerAction, setHeaderAction }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb(node: React.ReactNode) {
  const { setBreadcrumb } = React.useContext(BreadcrumbContext)
  React.useEffect(() => {
    setBreadcrumb(node)
    return () => setBreadcrumb(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useHeaderAction(node: React.ReactNode) {
  const { setHeaderAction } = React.useContext(BreadcrumbContext)
  React.useEffect(() => {
    setHeaderAction(node)
    return () => setHeaderAction(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useBreadcrumbSlot() {
  const ctx = React.useContext(BreadcrumbContext)
  return { breadcrumb: ctx.breadcrumb, headerAction: ctx.headerAction }
}
