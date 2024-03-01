import React from 'react'

export default function Progressbar({ progress }) {
  return (
    <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
          {`${progress}%`}
        </span>
      </div>
    </div>
    <div className="flex w-full">
      <div className="bg-teal-200 h-2 w-full rounded-full"></div>
      <div
        style={{ width: `${progress}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 rounded-full"
      ></div>
    </div>
  </div>

  )
}
