import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { setLangsOpen } from '@/redux/reducer/componentsReducer';
import Mask from '@/components/SportPage/Mask';
import LangFn from '@/components/LangFn';

export default function QrCode() {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  // redux 為 burger控制開關
  const langsOpen = useSelector(
    (state: RootState) => state.componentsReducer.langsOpen
  );
  // 打開動畫
  useEffect(() => {
    if (!langsOpen) return;
    setShow(true);
    setOpenLang(true);
  }, [langsOpen]);

  // 關閉動畫
  useEffect(() => {
    if (openLang) return;
    setTimeout(() => {
      setShow(false);
    }, 300);
  }, [openLang]);

  // 復原 burger 開關
  useEffect(() => {
    if (show) return;
    dispatch(setLangsOpen(false));
  }, [show, dispatch]);

  return (
    <>
      {show ? (
        <div
          className={`fixed top-0 right-0 z-15 flex h-screen w-screen items-center justify-center`}
        >
          <Mask setFirstState={setOpenLang} firstState={openLang} />
          <div className="absolute z-16 flex w-[300px] flex-col items-center justify-center gap-8 rounded-[20px] bg-white p-7">
            <LangFn setOpenLang={setOpenLang} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
