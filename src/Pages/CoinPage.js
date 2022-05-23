import {
  LinearProgress,
  makeStyles,
  Typography,
  Grid,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import CoinChart from '../components/CoinChart';
import { SingleCoin } from '../config/api';
import { numberWithCommas } from '../components/CoinsTable';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    borderRight: '2px solid grey',
  },
  coinChart: {
    width: '65%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    color: '#87888a',
  },
  description: {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  marketData: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    justifyContent: 'space-around',
    [theme.breakpoints.only('sm')]: {
      alignItems: 'center',
    },
  },
}));

export default function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDescription = (description) => {
    const desc = description.split('. ');
    return desc[0] + '. ' + desc[1];
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: '#c20a10' }} />;

  return (
    <Grid container>
      <Grid item className={classes.sidebar} sm={12} md={5} lg={4}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="100"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(getDescription(coin?.description.en))}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()].toString()
              )}
            </Typography>
          </span>
        </div>
      </Grid>
      <Grid item className={classes.coinChart} sm={12} md={7} lg={8}>
        <CoinChart coin={coin} />
      </Grid>
    </Grid>
  );
}
