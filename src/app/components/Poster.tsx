// components/Poster.tsx
import Image from "next/image";

export default function Poster({
  imageSrc = "/mountainGuy.jpg",
  text = "Find Your Guide Here",
}: {
  imageSrc?: string;
  text?: string;
}) {
  return (
    <div className="bg-[url('/mountainGuy.jpg')] bg-cover bg-center h-screen w-full">
      <Image
        src={imageSrc}
        alt="Poster"
        fill
        priority
        className="w-[50%] h-[50%] object-cover opacity-100"
      />

      <div className="absolute inset-0">
        <h2 className="text-6xl font-bold text-white mix-blend-difference flex flex-wrap flex-row justify-evenly gap-33">
          <span className="">Find</span>
          <span className="">Your</span>
          <span className="">Guide</span>
          <span className="">Here</span>
        </h2>

      </div>
    </div>
  );
}
