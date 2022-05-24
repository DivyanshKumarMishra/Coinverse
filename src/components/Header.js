import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  createTheme,
  ThemeProvider,
  Select,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import InputBase from '@material-ui/core/InputBase';
import { supported_currencies } from '../config/currencies';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid gray',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:hover': {
      borderRadius: 4,
      border: '3px solid white',
    },
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: '#c20a10',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  button: {},
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
            <Link to="/">
              <img
                src="icon-logo.png"
                alt="coin"
                style={{ height: '40px', marginRight: '5px' }}
              />
            </Link>
            <Typography
              variant="h4"
              onClick={() => {
                navigate('/');
              }}
              className={classes.title}
            >
              Coinverse
            </Typography>
            <Select
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              input={<BootstrapInput />}
            >
              {supported_currencies.map((currency) => (
                <MenuItem value={currency}>{currency}</MenuItem>
              ))}
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
