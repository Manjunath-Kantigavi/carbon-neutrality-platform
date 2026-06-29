import React from 'react';

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  icon,
}) => {
  return (
    <div className="rounded-lg border border-black bg-white py-6 px-7.5 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 text-white mr-4">
        <img src={icon} alt={`${title} icon`} className="h-15 w-15 ml-10 mt-2 mb-2 " />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black ml-6">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-500 ml-6">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-xl mr-4 font-medium ${
            levelUp ? 'text-green-500' : ''} ${levelDown ? 'text-blue-500' : ''}`}
        >
          {rate}
          {levelUp && (
            <svg
              className="fill-green-500"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.357 2.477L0.909 5.83 0 4.946 5 0.085 10 4.946 9.091 5.83 5.643 2.477V10.085H4.357V2.477Z" />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-blue-500"
              width="10"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 11"
            >
              <path d="M5.643 7.692L9.091 4.34 10 5.224 5 10.085 0 5.224 0.909 4.34 4.357 7.692V0.085H5.643V7.692Z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
