import Team from "@/components/SportPage/MainComponents/Team/Team";
import UpComing from "@/components/SportPage/MainComponents/UpComing/UpComing";
import Live from "@/components/SportPage/MainComponents/Live/Live";
import MatchList from "./MainComponents/Match/MatchList";
export default function Main() {
  return (
    <>
      <div className="space-y-4">
        <Team />
        <UpComing />
        {/* <Live /> */}
      </div>
      <div className="py-7">
        <MatchList />
      </div>
    </>
  );
}
