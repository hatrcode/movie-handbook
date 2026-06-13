import Link from "next/link";

type SubLink = {
  id: number;
  text: string;
  url: string;
};

export default function SubNavDrop({
  main,
  sub,
  url,
}: {
  main: string;
  sub: SubLink[];
  url: string;
}) {
  return (
    <div className="dropdown">
      <Link className="dropbtn" href={url}>
        {main}
      </Link>
      <div className="dropdown-content">
        {sub.map((item) => (
          <Link key={item.id} href={item.url}>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
