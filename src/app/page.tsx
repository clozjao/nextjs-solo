"use client";
import Header from "@/components/Home/Header";
import Welcome from "@/components/Home/Welcome";
import SportMenu from "@/components/Home/SportMenu";
import BettingRules from "@/components/BettingRules";

export default function Home() {
  return (
    <>
      <div className="bg-home w-full min-h-screen">
        <div className="relative min-h-[var(--app-height)] select-none">
          <Header />
          <Welcome />
          <SportMenu />
          <BettingRules />
        </div>
      </div>
    </>
  );
}
