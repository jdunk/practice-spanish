import { useState } from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/img/logo.png';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialogTitle-root': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText

    },
    '& li': {
      paddingBottom: '15px'
    }

  },
  flexGrow: {
    flexGrow: 1,
  }
}));

export default function AppBar() {
  const classes = useStyles();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <MuiAppBar>
      <Toolbar variant="dense">
        <Box display="block" mr={2} clone>
          <img src={logo} width={35} height={35} alt="logo" />
        </Box>
        <Typography noWrap variant="h6" component="h1" className={classes.flexGrow} style={{ fontFamily: 'cursive' }}>Practice Spanish!</Typography>
        <IconButton
          onClick={() => setHelpOpen(true)}
          edge="end"
          color="inherit"
          aria-label="help"
        >
          <HelpIcon />
        </IconButton>
        <Dialog
          open={helpOpen}
          onClose={() => setHelpOpen(false) }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{`Help`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h3>Objective</h3>
              <div>
                Practice conjugating each verb into the present simple based on the
                pronoun implied in the picture. (Ask yourself if the person is saying
                "I / you / they / we" etc.)
              </div>
              <h3>
                To advance through the exercises, you can:
              </h3>
              <ul>
                <li>
                  Press <kbd>→</kbd> or <kbd>Spacebar</kbd> or...
                </li>
                <li>
                  ← <em>swipe left</em> ←
                </li>
              </ul>
              <h3>
                Verb card
              </h3>
              <div>
                Press <kbd>f</kbd> or click/tap the verb card to switch between Spanish
                and English (just like a flash card).
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHelpOpen(false) } color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </MuiAppBar>
  )
}