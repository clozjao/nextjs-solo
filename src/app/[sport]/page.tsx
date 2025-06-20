import { sports } from "@/data/sports";
import ClientComponent from "./ClientComponent";

type PageProps = {
  params: {
    sport: string;
  };
};

export async function generateStaticParams() {
  return sports.map((sport) => ({
    sport,
  }));
}

export default function SportPage({ params }: PageProps) {
  return (
    <div>
      <h1>{params.sport}</h1>
      <ClientComponent sport={params.sport} />
    </div>
  );
}
