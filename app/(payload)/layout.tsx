import React from 'react'

type Args = {
  children: React.ReactNode
}

/**
 * Layout for the (payload) route group
 * Now simplified since we're using DatoCMS instead of Payload
 */
const Layout = ({ children }: Args) => (
  <html lang="en">
    <body>
      {children}
    </body>
  </html>
)

export default Layout
