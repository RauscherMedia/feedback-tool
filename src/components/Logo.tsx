import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/rauscher_icon_schwarz.png"
        alt="Rauscher Media"
        width={24}
        height={40}
        className="h-7 w-auto"
      />
      <span className="font-headline text-[15px] uppercase tracking-[0.15em] text-content-primary">
        Feedback
      </span>
    </div>
  );
}
