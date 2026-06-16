import React from 'react'

const ProfileInfoStatsCard = ({ icon, count, text }: { icon: React.ReactNode, count: number | string, text: string }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
      {icon}
      <p className="text-2xl font-bold text-gray-900">{count}</p>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  )
}

export default ProfileInfoStatsCard