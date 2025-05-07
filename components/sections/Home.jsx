
export const Home = () => {
    return (<section id="home" className="min-h-screen flex items-center justify-center relative">

        <div className="text-center fixed top-20 z-10 h-1/3 w-25/26 px-4 py-4 bg-white border-3"> 
            <h1 className="text-2xl md:text-7xl mb-6 bg-gradient-to-r py-6 from-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-right">
                Find your perfect tutor <span className="text-yellow-500 font-bold">today</span>
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
    </section>
    );
};