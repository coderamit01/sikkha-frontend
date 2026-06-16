import React from "react"


export interface IBioCard {
  icon: React.ReactNode,
  label: string,
  text: string
}

export const BioCard = ({icon,label,text}: IBioCard) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{text}</p>
      </div>
    </div>
  )
}
