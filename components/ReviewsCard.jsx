import { useNavigate } from "react-router-dom";

const ReviewsCard = ({ name, review, img, flavor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?flavor=${flavor}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full md:w-1/3 bg-white p-5 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
    >
      <p className="text-black font-semibold text-lg text-center mb-5">
        {name}
      </p>
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 object-cover rounded-sm mb-4"
          src={img}
          alt={`${name} jerky`}
        />
        <h3 className="text-gray-500 text-center">{review}</h3>
      </div>
    </div>
  );
};

export default ReviewsCard;
