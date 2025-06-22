import Vercel from "@/assets/vercel.svg";

export default function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 h-[60%]">
        <div className="font-h3">Hello, NextJs</div>
        <Vercel className="w-[100px] xl:w-[150px]" />
      </div>
    </>
  );
}
