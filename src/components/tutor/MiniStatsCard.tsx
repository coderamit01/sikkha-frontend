
export const MiniStatsCard = ({ count, text }: { count: number | string, text: string }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
      <p className="text-2xl font-bold text-gray-900">{count}</p>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  )
}
