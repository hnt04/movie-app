import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../App.css";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import RecommendIcon from "@mui/icons-material/Recommend";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function MCard ({ item }) {
  return (
    <Card className="movie-card" sx={{ width: 200, borderRadius: "5px" }}>
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          sx={[
            {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
            },
          ]}
        >
          <Paper className="content">
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={[
                  {
                    maxHeight: "30%",
                    overflow: "hidden",
                  },
                ]}
              >
                <Typography gutterBottom variant="body1" component="div">
                  {`${item.original_title}`}
                </Typography>

                <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    mr={3}
                  >
                    <RecommendIcon
                      className="recommend_icon"
                      fontSize="small"
                    />
                    <Typography variant="subtitle2" ml={1}>
                      {`${item.vote_average}`}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <StarBorderIcon className="favorite_icon" fontSize="small" />
                    <Typography variant="subtitle2" ml={1}>
                      {`${item.vote_count}`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default MCard;