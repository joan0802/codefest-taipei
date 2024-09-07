import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ActivityCard({ activity }) {
    const [expand, setExpand] = useState(false);
    const handleExpandClick = () => {
        setExpand(!expand);
    };
    const mediaIsImage = activity.media === "image" ? true : false;
    return (
        <Card
          sx={{
            minWidth: 275,
            margin: "10px",
            marginBottom: "20px",
            backgroundColor: "#EDF8FA"
          }}
          key={activity.id}
          >
        
          {mediaIsImage ? (
            <CardMedia
              component="img"
              alt="poster"
              sx={{ height: 200 }}
              image={activity.image !== "" ? activity.image : "default.jpg"}
            />
          ) : (
            <iframe
              title="video"
              src={activity.video}
              width="100%"
              height="200"
              frameBorder="0"
              allowFullScreen
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "10px" }}>
              {activity.name}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              時間：{activity.starttime} <br></br>
              地點：{activity.location}
            </Typography>
            <Typography variant="body2" sx={{ maxHeight: expand ? 'none' : '43px', overflow: 'hidden' }}>
              {activity.description}
            </Typography>
            {activity.description.length > 75 && (
              <Button onClick={handleExpandClick}>
                {expand ? 'Close' : '...More'}
              </Button>
            )}
          </CardContent>
        </Card>
    );
}

export default ActivityCard;