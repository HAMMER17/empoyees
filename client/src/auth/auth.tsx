import { useCurrentQuery } from "../app/services/auth"

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()
  if (isLoading) {
    return <h3 className="loading">Loading...</h3>
  }
  return children
}