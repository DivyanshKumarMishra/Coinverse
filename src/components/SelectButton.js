import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  selectbutton: {
    border: '1px solid #c20a10',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
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

  return (
    <span
      style={{
        backgroundColor: selected ? '#c20a10' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
        textAlign: 'center',
      }}
      onClick={onClick}
      className={classes.selectbutton}
    >
      {children}
    </span>
  );
}
