import Image from "next/image";
import { img300, noPic } from "@/lib/links";
import type { PersonCredit } from "@/lib/tmdb";

export default function PeopleCard({ people }: { people: PersonCredit }) {
  const { name, character, profile_path } = people;

  return (
    <div className="people-card">
      <div className="people-card-img">
        <Image
          src={profile_path ? `${img300}${profile_path}` : noPic}
          alt={name}
          width={138}
          height={207}
        />
      </div>
      <div className="people-card-body">
        <h4>{name}</h4>
        {character && <p>{character}</p>}
      </div>
    </div>
  );
}
