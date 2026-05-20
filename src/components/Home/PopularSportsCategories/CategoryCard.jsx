import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

function CategoryCard({ title, description, image, href }) {
  return (
    <Link
      href={href}
      className="group relative flex h-72 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 gap-1.5">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-white/75 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-all duration-200 group-hover:gap-2.5 group-hover:text-white">
          Explore
          <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
