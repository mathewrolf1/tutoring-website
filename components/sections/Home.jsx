import ReviewsCard from "../ReviewsCard";

export const Home = () => {
    return (<section id="home" className="min-h-screen flex items-center justify-center relative">

        <div className="text-center fixed top-22 z-20 w-25/26 px-4 py-4 bg-white border-2"> 
            <h1 className="text-2xl md:text-7xl mb-6 bg-gradient-to-r py-6 from-yellow-400 to-orange-600 bg-clip-text text-transparent leading-right">
                Find your perfect tutor today
            </h1> 

            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            Premium rates by offering a comprehensive educational package 
            something that is particularly attractive to parents and institutions looking for proven outcomes 
            </p>
            <div className="flex justify-center space-x-4">
                <a href="#tutors" className="bg-yellow-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden 
                                             hover:-translate-y-0.5 hover:shadow-xl">
                    Find Your Tutor
                </a>

                <a href="#contact" className="border-2 border-yellow-500/100 text-yellow-500 py-3 px-6 rounded font-medium transition-all duration-200
                                             hover:-translate-y-0.5 hover:shadow-xl hover:bg-yellow-500/10">
                    Contact Us!
                </a>
            </div>

        </div>

        <div className="min-h-screen flex flex-col items-center top-150 z-10 md:px-32 px-5 absolute">
                <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-transparent text-center">
                    Reviews
                </h2>
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                
                <ReviewsCard review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." img="wolfie.png" name="Wolfgang"/>
                <ReviewsCard review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." img="mathew.png" name="Mathew"/>
                <ReviewsCard review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." img="eled.png" name="Eled"/>

            </div>
        </div>

    </section>
    );
};