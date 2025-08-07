// app/[sport]/page.tsx

import ClientComponent from "./ClientComponent";
import { sports } from "@/data/sports";

export default async function SportPage({ params }: { params: any }) {
  const { sport } = await params;
  return <ClientComponent sport={sport} />;
}

export function generateStaticParams() {
  return sports.map((sport) => ({
    sport,
  }));
}
