import { useState, useEffect } from "react";
import Mask from "@/components/SportPage/Mask";
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setQrCode } from "@/redux/reducer/matchReducer";
import Close from "@/assets/delete.svg";
// import QRCode from 'qrcode';

export default function QrCode() {
  const [openQrCode, setOpenQrCode] = useState(false);
  const [show, setShow] = useState(false);
  // const [qrSrc, setQrSrc] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { qrCode } = useSelector((state: RootState) => state.matchReducer);

  useEffect(() => {
    if (openQrCode) return;
    // 第一種透過mask控制openQrCode關閉
    dispatch(setQrCode(""));
  }, [openQrCode, dispatch]);

  useEffect(() => {
    if (!dispatch) return;
    if (qrCode) {
      setShow(true);
      setOpenQrCode(true);
    } else {
      setOpenQrCode(false);
      // setQrSrc(qrCode);
      // 等動畫完再卸載
      const timer = setTimeout(() => {
        setShow(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [qrCode, dispatch]);

  return (
    <>
      {show ? (
        <div
          className={`fixed top-0 right-0 z-15 flex h-screen w-screen items-center justify-center`}
        >
          <Mask setFirstState={setOpenQrCode} firstState={openQrCode} />
          <div className="absolute z-16 flex w-[300px] flex-col items-center justify-center gap-8 rounded-[20px] bg-white p-7">
            <div className="w-full text-end">
              <Close
                className="inline-block h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  // 第二種關閉qrCode 動畫方式
                  dispatch(setQrCode(""));
                }}
              />
            </div>
            <div className="bg-neutrals-300 h-[200px] w-[200px] rounded-lg"></div>
            <div className="flex flex-col items-center gap-3">
              <div className="font-body1b">Order Code:</div>
              <div className="font-body text-center">
                Please go to the agent to scan the QR code and pay to receive
                your ticket.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
