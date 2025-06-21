// app/[sport]/page.tsx

import ClientComponent from "./ClientComponent";
import { sports } from "@/data/sports";

// ❗暫時用 any 避免 TS 報錯
export default async function SportPage({ params }: { params: any }) {
  const sport = (params as { sport: string }).sport;

  return <ClientComponent sport={sport} />;
}

export function generateStaticParams() {
  return sports.map((sport) => ({
    sport,
  }));
}
