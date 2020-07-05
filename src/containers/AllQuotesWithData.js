import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import CardUi from "../components/Card";
import { GET_ALLQUOTES } from "../actions/constants";

const AllQuotesWithData = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => ({
    ...state.fetchQuotes,
  }));
  const getQuotes = () => {
    return (dispatch) => {
      fetch("https://myquotesapi.herokuapp.com/api/Quotes/AllQuotes", {
        method: "GET",
        headers: {
          "API-KEY": "5c316ab0-32ac-49e4-b3e4-a4f6aeec9a6d",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) =>
          dispatch({
            type: GET_ALLQUOTES,
            payload: data,
          })
        );
    };
  };

  useEffect(() => {
    dispatch(getQuotes());
  }, []);

  return (
    <Grid container spacing={2}>
      {data.map((e, i) => {
        return (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <CardUi
              author={e.author}
              quote={e.body}
              catagory={e.catagory.name}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllQuotesWithData;
