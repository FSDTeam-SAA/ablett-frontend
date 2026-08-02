import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type EquipmentImage = {
  src: string;
  alt: string;
  position?: string;
};

type ServiceDetailsEquipmentProps = {
  images: EquipmentImage[];
  title: string;
  description: string;
  items: string[];
};

export default function ServiceDetailsEquipment({
  images,
  title,
  description,
  items,
}: ServiceDetailsEquipmentProps) {
  return (
    <section className="bg-black py-14 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center text-2xl font-bold leading-none sm:text-[26px]">
          <span>Custom</span>
          <span className="mx-2">.</span>
          <span className="font-heading font-medium italic">Modern</span>
          <span className="mx-2">.</span>
          <span>Timeless</span>
          <span className="mx-2">.</span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-4">
          {images.map((image) => (
            <div
              key={image.src}
              className="relative aspect-video overflow-hidden rounded-md bg-white/10"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.position ?? "center" }}
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold leading-tight sm:text-[26px]">
            {title}
          </h2>

          <p className="mt-4 text-sm leading-5 text-[#D8D8D8] sm:text-[15px]">
            {description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm text-[#D8D8D8]">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-[#C9871B]"
                  strokeWidth={1.8}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
