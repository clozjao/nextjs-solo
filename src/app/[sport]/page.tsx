import ClientComponent from "./ClientComponent";
import { sports } from "@/data/sports";
import { notFound } from "next/navigation";

export default async function SportPage(props: {
  params: Promise<{ sport: string }>;
}) {
  const { sport } = await props.params;
  console.log("sport", sport);
  if (!sports.includes(sport)) notFound();

  return <ClientComponent sport={sport} />;
}

export function generateStaticParams() {
  return sports.map((sport) => ({
    sport,
  }));
}

export const dynamicParams = false;
