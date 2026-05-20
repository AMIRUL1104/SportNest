import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    title: "Football",
    description:
      "Find football turfs and grounds for friendly matches, practice sessions, and competitive games.",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
    href: "/facilities?sport=football",
  },
  {
    id: 2,
    title: "Badminton",
    description:
      "Book indoor badminton courts for training, practice, and competitive matches.",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    href: "/facilities?sport=badminton",
  },
  {
    id: 3,
    title: "Swimming",
    description:
      "Explore swimming pools for training, fitness, and fun sessions in a premium environment.",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    href: "/facilities?sport=swimming",
  },
  {
    id: 4,
    title: "Basketball",
    description:
      "Find indoor and outdoor basketball courts for practice and exciting team games.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    href: "/facilities?sport=basketball",
  },
  {
    id: 5,
    title: "Tennis",
    description:
      "Book tennis courts for casual practice or professional training sessions.",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80",
    href: "/facilities?sport=tennis",
  },
  {
    id: 6,
    title: "Cricket",
    description:
      "Discover cricket grounds and nets for practice sessions and competitive team matches.",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    href: "/facilities?sport=cricket",
  },
];

function PopularSportsCategories() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Sports Categories
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight">
            Popular Sports Categories
          </h2>
          <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
            Explore popular sports categories and find the perfect place to
            play, train, and compete.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularSportsCategories;
