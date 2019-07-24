import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../theme'

function AppLayout (props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout
