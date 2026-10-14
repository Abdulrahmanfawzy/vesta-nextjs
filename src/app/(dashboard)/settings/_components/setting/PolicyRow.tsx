import pdfIcon from "../../../../../assets/images/ImportPdf.svg";
import Image from "next/image";
interface PolicyRowProps {
  title: string;
  url:string;
}

export default function PolicyRow({ title ,url}: PolicyRowProps) {
  return (
    <div className="flex w-full h-14 items-center justify-between border-b border-[#D8D8D8] pl-1 pr-4" >
      <span className="text-md text-app-black-80">
        {title}
      </span>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-800 transition hover:bg-slate-100 cursor-pointer"
        aria-label={`View ${title}`}
      >
          <a
        href={url || undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title}`}
        aria-disabled={!url}
        className={`flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-slate-100 ${
          !url ? "pointer-events-none opacity-50" : "cursor-pointer"
        }`}
      >
        <Image
          src={pdfIcon}
          alt=""
          width={32}
          height={32}
        />
      </a>
      </button>
    </div>
  );
}