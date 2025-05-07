import ReviewsCard from "../ReviewsCard";

export const Review = () => {
    return (
        <section id="review" className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
            
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
                Reviews
            </h2>

            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <ReviewsCard review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." img="wolfie.png" name="Wolfgang"/>
                <ReviewsCard review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." img="mathew.png" name="Mathew"/>
                
            </div>
                
            
        </section>

    );
};