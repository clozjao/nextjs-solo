import { useEffect, useState } from "react";

export default function Mask({
  firstState,
  secondState = null,
  setFirstState,
  setSecondState = null,
}: {
  firstState: boolean;
  secondState?: boolean | null;
  setFirstState: React.Dispatch<React.SetStateAction<boolean>>;
  setSecondState?: React.Dispatch<React.SetStateAction<boolean>> | null;
}) {
  const [show, setShow] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (firstState || secondState) {
      setShow(true);
      // 強制等兩幀，確保 DOM 真的畫上去再觸發淡入
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeIn(true);
        });
      });
    } else {
      setFadeIn(false); // 開始觸發淡出
      const timer = setTimeout(() => setShow(false), 300); // 等動畫完再卸載
      return () => {
        clearTimeout(timer);
      };
    }
  }, [firstState, secondState]);

  return (
    <>
      {show && (
        <div
          className={`absolute top-0 left-0 z-[15] h-full w-screen bg-black transition-opacity duration-300 ${
            fadeIn ? "opacity-50" : "opacity-0"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setFirstState(false);
            if (setSecondState) {
              setSecondState(false);
            }
          }}
        />
      )}
    </>
  );
}
