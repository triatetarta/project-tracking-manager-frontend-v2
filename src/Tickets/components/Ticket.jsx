const Ticket = ({ _id, project, description, ticketClickHandle }) => {
  return (
    <article
      onClick={() => ticketClickHandle(_id)}
      className='ticket bg-ticket-bg hover:bg-ticket-bg-hover transition-all duration-200 cursor-pointer p-4 rounded-lg shadow-sm relative w-[300px]'
    >
      <p className='text-xs mb-6 truncate'>{description}</p>

      <div className='text-gray-text text-sm'>{project}</div>
    </article>
  );
};

export default Ticket;
