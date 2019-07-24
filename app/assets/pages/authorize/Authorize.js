import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField/'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function MadeWithLove () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn () {
  const classes = useStyles()
  const { user, client, query } = window.context

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Authorization
        </Typography>
        <form method="get" action="/oauth/authorize/decision" className={classes.form} noValidate>

          <p>Hi <b>{user.name},</b></p>
          <p>The application <b>{client.name}</b> is requesting access to your account.</p>
          <p>Do you approve?</p>
          <input name="response_type" type="hidden" value={query.response_type} />
          <input name="client_id" type="hidden" value={query.client_id} />
          <input name="redirect_uri" type="hidden" value={query.redirect_uri} />
          <input name="state" type="hidden" value={query.state} />
          <input name="scope" type="hidden" value={query.scope} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                name="allowed"
                value="true"
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                name="allowed"
                value="false"
              >
                Deny
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  )
}
