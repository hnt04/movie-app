import { Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Typography variant="body2" align="center" p={1} mt={2}>
      {"Copyright © "}
    <Link color="#1565c0" href="https://www.coderschool.vn"></Link>{"CoderSchool-Project"} 
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;