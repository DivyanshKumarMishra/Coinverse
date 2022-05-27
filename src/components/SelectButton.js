import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  selectbutton: {
    border: '1px solid #c20a10',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#c20a10',
      color: 'black',
    },
    width: '22%',
    //   margin: 5,
  },
});

export default function SelectButton({ children, selected, onClick }) {
  const classes = useStyles();
  const mobile = useMediaQuery('(max-width: 760px');

  return (
    <span
      style={{
        backgroundColor: selected ? '#c20a10' : '',
        color: selected ? 'black' : '#c20a10',
        fontWeight: selected ? 700 : 500,
        fontSize: '22px',
        textAlign: 'center',
        paddingLeft: mobile ? '0px' : '10px',
        paddingRight: mobile ? '0px' : '10px',
        justifyContent: 'center',
      }}
      onClick={onClick}
      className={classes.selectbutton}
    >
      {children}
    </span>
  );
}
