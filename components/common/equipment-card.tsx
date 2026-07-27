import Image from "next/image";
import { cn } from "@/lib/utils";

interface EquipmentCardProps {
  title: string;
  image: string;
  className?: string;
}

export default function EquipmentCard({
  title,
  image,
  className,
}: EquipmentCardProps) {
  return (
    <div className={cn("group", className)}>
      <div className="overflow-hidden rounded-xl">
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <h3 className="mt-4 text-center text-lg font-medium text-white transition-colors duration-300 group-hover:text-[#C8891D]">
        {title}
      </h3>
    </div>
  );
} 