import { useEffect, useRef } from "react";
import { sports } from "@/data/sports";
import Home from "@/assets/home.svg";
import Soccer from "@/assets/soccer.svg";
import Basketball from "@/assets/basketball.svg";
import Tennis from "@/assets/tennis.svg";
import Baseball from "@/assets/baseball.svg";
import Volleyball from "@/assets/volleyball.svg";
import Rugby from "@/assets/rugby.svg";
import Link from "next/link";

export default function Nav({ sport }: { sport: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const container = containerRef.current;
  //     const selectedIndex = sports.indexOf(sport || sports[0]);
  //     const selectedElement = container.children[selectedIndex] as HTMLElement;

  //     if (selectedElement) {
  //       selectedElement.scrollIntoView({
  //         behavior: "smooth",
  //         inline: "center", // 可改成 'nearest', 'start', 'end'
  //         block: "nearest", // 不需要垂直捲動
  //       });
  //     }
  //   }
  // }, [sport]);

  // if (!sport || !sports.includes(sport)) {
  //   return <Navigate to="/category/soccer" replace />;
  // }
  return (
    <>
      <div className="mt-10 mb-5 flex w-3/4 min-w-[200px] justify-center gap-3 sm:min-w-[400px]">
        <Link href="/" className="bg-base-white flex rounded-[100px] p-2">
          <Home className="h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]" />
        </Link>
        <div className="scrollbar-hide overflow-x-auto overflow-y-hidden">
          <div
            className="flex gap-3 scroll-smooth duration-450"
            ref={containerRef}
          >
            {sports.map((item, index) => {
              return (
                <Link
                  href={`/category/${item}`}
                  key={index}
                  className={`${
                    item === sport
                      ? "bg-neutrals-base-black px-5 py-2 text-white"
                      : "bg-base-white p-2"
                  } font-body1semibold flex items-center gap-3 rounded-[100px] capitalize`}
                >
                  {item === "soccer" && (
                    <Soccer
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === "basket" && (
                    <Basketball
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === "tennis" && (
                    <Tennis
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === "baseball" && (
                    <Baseball
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === "volley" && (
                    <Volleyball
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === "rugby" && (
                    <Rugby
                      className={`${
                        item === sport ? "svg-fill-white" : ""
                      } h-[25px] w-[25px] xl:h-[40px] xl:w-[40px]`}
                    />
                  )}
                  {item === sport && item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
