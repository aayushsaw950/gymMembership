import React from 'react'

const flashMessage = ({message, type , visible}) => {
    if(!visible){
        return null;
    }
    const base =
    "fixed top-4 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300";

  const styles =
    type === "success"
      ? "bg-green-50 border border-green-300 text-green-800"
      : "bg-red-50 border border-red-300 text-red-800";
  return (
    <div className= {base}>
        <div className={`flex items-center gap-3 px-4 px-3 rounded-lg shadow-lg min-w-[280px] min-w-md ${styles} `}>
            <span className="font-medium">{message}</span>
        </div>
    </div>
  )
}

export default flashMessage