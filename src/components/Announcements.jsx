export default function Announcements({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/70 border border-gray-200 shadow-sm">
          <p className="font-medium text-gray-900">{a.title}</p>
          {a.body && <p className="text-sm text-gray-600 mt-1">{a.body}</p>}
          <p className="text-xs text-gray-500 mt-2">{a.course_code || 'All Courses'} • {new Date(a.created_at).toLocaleString()}</p>
        </div>
      ))}
      {items.length === 0 && <p className="text-gray-500 text-sm">No announcements.</p>}
    </div>
  )
}
