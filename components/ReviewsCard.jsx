const ReviewsCard = (props) => {
    return(
        <div className="w-full md:w-1/3 bg-white border-1 border-lightText md:border-b p-5 rounded-lg shadow-md">
            <div>
                <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                    {props.review} 
                </p>
            </div>
            <div className="flex flex-row justify-center items-center mt-4 gap-4 text-xl">
                <img className="rounded-full w-1/3" src={props.img} alt="img"/>
                <h3 className="font-semibold">{props.name}</h3>
            </div>
            
        </div>
    );
};

export default ReviewsCard