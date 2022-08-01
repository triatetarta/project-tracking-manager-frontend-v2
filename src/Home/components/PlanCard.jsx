const PlanCard = ({
  plan,
  price,
  users,
  selected,
  lasts,
  payment,
  buttonText,
}) => {
  return (
    <div className='border rounded-md w-1/3 flex flex-col items-center justify-center text-center shadow-md overflow-hidden'>
      <div
        className={`py-5 w-full h-full font-semibold text-xl border-b ${
          selected ? "bg-slate-200" : ""
        }`}
      >
        {plan}
      </div>
      <div className='px-2 py-8'>
        <h3 className='text-4xl font-bold pb-2 pt-4'>GBP {price}</h3>
        <h4 className='text-lg font-normal'>per user/month</h4>
        <h5 className='text-xs'>{users} users</h5>

        <button
          className={`my-12 font-semibold px-4 py-2 rounded-md ${
            selected
              ? "bg-deep-blue text-white hover:bg-light-blue transition duration-75"
              : "text-deep-blue border border-deep-blue hover:bg-gray-100 transition duration-75"
          }`}
        >
          {buttonText}
        </button>

        <p>{lasts}</p>
        <p className='pb-4'>{payment}</p>
      </div>
    </div>
  );
};

export default PlanCard;
