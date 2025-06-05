import ReviewsCard from "../ReviewsCard";

export const Home = () => {
  return (
    <section id="home" className="min-h-screen top-2 items-center justify-center px-4 relative">
      <div class="bg-[url(/src/assets/jerky.jpg)]">
      <div className="text-center px-4 py-4 bg-gray-10 border-2">
        <h1 className="text-2xl md:text-7xl mb-6 bg-gradient-to-r py-6 from-rose-200 to-orange-300 bg-clip-text text-transparent leading-right drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">
          Quality, Homemade Jerky
        </h1>
        <p className="text-stone-200 text-lg font-bold mb-8 max-w-lg mx-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          - Four flavors: spicy sweet garlic, lemongrass, mild, ghost pepper <br />
          - $17 / bag
        </p>
      </div>
      </div>

      <div className="min-h-screen flex flex-col items-center mt-24 md:px-32 px-5">
        <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 to-rose-400 bg-clip-text text-transparent text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
">
          Explore Flavors
        </h2>

        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <ReviewsCard
            name="Spicy Sweet Garlic"
            flavor="spicy_sweet_garlic"
            img="src/assets/jerky.jpg"
            review="Combining sweet and garlic flavors"
          />
          <ReviewsCard
            name="Lemongrass"
            flavor="lemongrass"
            img="src/assets/jerky.jpg"
            review="Fresh lemongrass in every bite"
          />
          <ReviewsCard
            name="Mild"
            flavor="mild"
            img="src/assets/jerky.jpg"
            review="Heated mild to perfection"
          />
          <ReviewsCard
            name="Ghost Pepper"
            flavor="ghost_pepper"
            img="src/assets/jerky.jpg"
            review="For those looking for serious heat in flavor"
          />
        </div>
      </div>
    </section>
    
  );
};