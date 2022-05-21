import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  MenuItem,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: '#c20a10',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate('/')}
              className={classes.title}
            >
              Coinverse
            </Typography>
            <TextField
              value={currency}
              id="demo-simple-select"
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              select
              variant="outlined"
              style={{ width: 100, marginLeft: 15 }}
              size="small"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </TextField>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
