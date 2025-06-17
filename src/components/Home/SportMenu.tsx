import Soccer from "@/assets/soccer.svg";
import Basketball from "@/assets/basketball.svg";
import Tennis from "@/assets/tennis.svg";
import Baseball from "@/assets/baseball.svg";
import Volleyball from "@/assets/volleyball.svg";
import Rugby from "@/assets/rugby.svg";
import { sports } from "@/data/sports";
import { useRouter } from "next/navigation";

export default function SportMenu() {
  const router = useRouter();
  return (
    <>
      <div className="flex pb-16">
        <div className="bg-base-white scrollbar-hide mx-auto inline-flex max-w-[280px] overflow-auto rounded-[100px] p-4 sm:max-w-[584px] xl:max-w-none">
          {sports.map((sport) => (
            <div
              key={sport}
              className="hover:bg-neutrals-200 flex flex-col items-center justify-between gap-2 rounded-[100px] px-4 py-2 duration-300 select-none sm:px-6 sm:py-3"
              onClick={() => router.push(`/${sport}`)}
            >
              {sport === "soccer" && (
                <Soccer className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              {sport === "basket" && (
                <Basketball className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              {sport === "tennis" && (
                <Tennis className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              {sport === "baseball" && (
                <Baseball className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              {sport === "volley" && (
                <Volleyball className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              {sport === "rugby" && (
                <Rugby className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" />
              )}
              <div className="font-libre text-[16px] sm:text-[20px]">
                {sport}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
