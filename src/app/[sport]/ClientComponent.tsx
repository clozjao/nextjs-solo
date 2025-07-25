"use client";
import Search from "@/components/SportPage/MainComponents/Search";
import Nav from "@/components/SportPage/MainComponents/Nav";
import Burger from "@/components/SportPage/Burger/Burger";
import Order from "@/components/SportPage/Order";
import Main from "@/components/SportPage/Main";
import Mask from "@/components/SportPage/Mask";
import Next from "@/assets/next.svg";
import QrCode from "@/components/SportPage/MainComponents/QrCode";
import { useState, useRef, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import OrderIcon from "@/assets/order.svg";
import MenuIcon from "@/assets/menu.svg";
import BettingRules from "@/components/BettingRules";
import BurgerLang from "@/components/SportPage/Burger/BurgerLang";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function ClientComponent({ sport }: { sport: string }) {
  const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection(scrollRef);

  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );

  useEffect(() => {
    const node = orderRef.current;
    if (!node) return;
    if (openOrder) {
      node.classList.remove("hidden"); // 先移除 hidden，讓它可見
      // 強制重繪一次以確保 transition 生效
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node.classList.add("translate-x-0");
          node.classList.remove("translate-x-full");
        });
      });
    } else {
      node.classList.remove("translate-x-0");
      node.classList.add("translate-x-full", "xl:translate-x-0");
      // 等 transition 結束再加 hidden
      const handle = () => {
        if (node.classList.contains("translate-x-0")) return;
        node.classList.add("hidden");
      };
      if (node.classList.contains("listening")) return;
      node.addEventListener("transitionend", handle);
      node.classList.add("listening");
    }
  }, [openOrder]);

  return (
    <div className="relative h-[var(--app-height)] bg-neutral-100 top-0">
      <div
        className={`absolute top-0 flex w-full items-center justify-between bg-neutral-200 z-[11] px-4 transition-transform duration-300 sm:px-16 h-[106px] xl:h-[124px] ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        } `}
      >
        <Next className="mt-10 mb-5 hidden h-[34px] w-auto xl:block xl:h-[47px]" />
        <MenuIcon
          className="mt-10 mb-5 h-7 w-7 xl:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setOpenLeftSideBar(!openLeftSideBar);
            if (openOrder) setOpenOrder(false);
          }}
        />
        <Nav sport={sport} />
        <Search />
        <OrderIcon
          className="mt-10 mb-5 h-7 w-7 xl:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setOpenOrder(!openOrder);
            if (openLeftSideBar) setOpenLeftSideBar(false);
          }}
        />
      </div>
      <div
        className={`scrollbar-hide relative grid grid-cols-6 transition-[padding] gap-x-6 bg-neutral-100 px-4 sm:grid-cols-8 sm:px-16 xl:grid-cols-12 pb-5 ${
          openOrder || openLeftSideBar ? "overflow-hidden" : "overflow-auto"
        } ${
          scrollDirection === "down"
            ? "h-[var(--app-height)]"
            : "pt-[124px] h-[var(--app-height)]"
        } `}
      >
        <Mask
          setFirstState={setOpenLeftSideBar}
          firstState={openLeftSideBar}
          setSecondState={setOpenOrder}
          secondState={openOrder}
        />
        <QrCode />
        <div
          className={`absolute z-20 w-[80%] transform-gpu touch-none transition-transform duration-450 ease-in-out sm:w-[70%] xl:static xl:col-span-2 xl:w-full xl:pt-5 ${
            openLeftSideBar
              ? "translate-x-0"
              : "-translate-x-full xl:translate-x-0"
          } h-full`}
        >
          <Burger />
        </div>
        <div
          className={`scrollbar-hide relative col-span-6 h-full overflow-y-auto pt-5 sm:col-span-8 xl:col-span-6`}
          ref={scrollRef}
        >
          <Main />
        </div>
        <div
          ref={orderRef}
          className={`scrollbar-hide absolute top-0 right-0 z-20 hidden ${
            scrollDirection === "down"
              ? "h-[var(--app-height)]"
              : "h-[var(--app-height)] xl:h-[calc(var(--app-height)-144px)]"
          } transition-all w-[80%] touch-none duration-450 sm:w-[70%] xl:static xl:col-span-4 xl:block xl:w-full xl:py-5`}
        >
          <Order setOpenOrder={setOpenOrder} />
        </div>
      </div>
      <BettingRules />
      <BurgerLang />
    </div>
  );
}
