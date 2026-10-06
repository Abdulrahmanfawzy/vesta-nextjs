import pdfIcon from "../../../../assets/images/ImportPdf.svg";
import Image from "next/image";
interface PolicyRowProps {
  title: string;
}

export default function PolicyRow({ title }: PolicyRowProps) {
  return (
    <div className="flex w-full h-14 items-center justify-between border-b border-[#D8D8D8] pl-1 pr-4" >
      <span className="text-md text-[#000000CC]">
        {title}
      </span>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-800 transition hover:bg-slate-100 cursor-pointer"
        aria-label={`View ${title}`}
      >
        <Image src={pdfIcon} alt={`View ${title}`} width={50} height={50} />
      </button>
    </div>
  );
}