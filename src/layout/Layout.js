import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";

function Layout() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={10} mt={6}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Layout;