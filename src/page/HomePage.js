import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import CardGroup from "../components/CardGroup";
import Category from "../components/Category";

function HomePage() {
  const [loadingTrend, setLoadingTrend] = useState();
  const [trendList, setTrendList] = useState([]);
  const [cutInitial, setCutInitial] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrend(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendList(result);
        setCutInitial([...result].splice(12, 6));
        setLoadingTrend(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
      >
        <Grid item direction="column" container>
          <CardGroup
            trendList={trendList}
            cutInitial={cutInitial}
            loadingTrend={loadingTrend}
          />
        </Grid>

        <Grid item direction="column" mt={5} container>
          <Category />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;