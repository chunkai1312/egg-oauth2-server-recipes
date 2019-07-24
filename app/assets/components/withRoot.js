import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  }
})

function withRoot (Component) {
  function WithRoot (props) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
