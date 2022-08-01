import planImage from "../../../public/assets/images/plan.svg";
import completeImage from "../../../public/assets/images/complete.svg";

const Details = () => {
  return (
    <section className='flex flex-col space-y-28 text-header-main'>
      <div className='flex items-center'>
        <div className='w-7/12 flex-shrink-0 shadow-xl'>
          <img className='object-cover' src={planImage} alt='planning' />
        </div>

        <div className='w-5/12 flex flex-col ml-16 lg:ml-24'>
          <h3 className='font-semibold text-xl mb-4'>Plan</h3>
          <p className='text-lg mb-12'>
            Create user projects and issues, <br /> plan and distribute tasks
            across <br /> your team.
          </p>
          <h3 className='font-semibold text-xl mb-4'>Comment</h3>
          <p className='text-lg'>
            Prioritize and discuss <br /> your team’s work in full context
            <br />
            with complete visibility.
          </p>
        </div>
      </div>

      <div className='flex items-center w-full justify-end'>
        <div className='w-5/12 flex flex-col'>
          <div className='self-end mr-16 lg:mr-24'>
            <h3 className='font-semibold text-xl mb-4'>Review</h3>
            <p className='text-lg mb-12'>
              Create user projects and issues, <br /> plan and distribute tasks
              across <br /> your team.
            </p>
            <h3 className='font-semibold text-xl mb-4'>Release</h3>
            <p className='text-lg'>
              Prioritize and discuss <br /> your team’s work in full context
              <br />
              with complete visibility.
            </p>
          </div>
        </div>

        <div className='w-7/12 flex-shrink-0 shadow-xl'>
          <img className='object-cover' src={completeImage} alt='complete' />
        </div>
      </div>
    </section>
  );
};

export default Details;
