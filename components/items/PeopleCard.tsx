import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { img300, noPic } from "@/lib/links";
import type { PersonCredit } from "@/lib/tmdb";

export default function PeopleCard({ people }: { people: PersonCredit }) {
  const { name, character, profile_path } = people;

  return (
    <Card sx={{ minWidth: 150 }}>
      <CardMedia
        component="img"
        alt={name}
        width="138"
        height="207"
        image={profile_path ? `${img300}${profile_path}` : noPic}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h4">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character}
        </Typography>
      </CardContent>
    </Card>
  );
}
