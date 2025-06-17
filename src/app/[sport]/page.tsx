import ClientComponent from "./ClientComponent";
import { sports } from "@/data/sports";

export async function generateStaticParams() {
  return sports.map((sport) => ({
    sport,
  }));
}

export default function SportPage({ params }: { params: { sport: string } }) {
  return (
    <div>
      <h1>{params.sport}</h1>
      <ClientComponent sport={params.sport} />
    </div>
  );
}
