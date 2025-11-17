export default function Upcoming({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/70 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{a.title}</p>
            <p className="text-sm text-gray-500">{new Date(a.due_date).toLocaleString()}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">{a.course_code} • {a.points} pts</p>
        </div>
      ))}
      {items.length === 0 && <p className="text-gray-500 text-sm">No upcoming assignments.</p>}
    </div>
  )
}
