import { cn } from "cn";

function CardTitle({ title }: { title: string }) {
  return (
    <h1
      className={cn(
        "text-center text-2xl font-normal tracking-tight text-app-primary uppercase mb-6",
      )}
    >
      {title}
    </h1>
  );
}

export default CardTitle;
