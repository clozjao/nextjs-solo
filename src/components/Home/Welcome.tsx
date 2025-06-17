export default function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="font-h3">Hello, BetEx</div>
        <img
          src={'/welcome.png'}
          alt="welcome"
          className="h-[263px] sm:h-[420px] xl:h-[400px]"
          fetchPriority="high"
        />
      </div>
    </>
  );
}
