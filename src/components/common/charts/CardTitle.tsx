function CardTitle({ title }: { title: string }) {
  return (
    <h1 className="text-center text-2xl font-normal tracking-tight text-app-primary uppercase mb-6">
      {title}
    </h1>
  );
}

export default CardTitle;
