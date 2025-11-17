export default function CourseList({ courses = [], enrollments = [] }) {
  const byCode = Object.fromEntries(courses.map(c => [c.code, c]))
  return (
    <div className="space-y-3">
      {enrollments.map((e, idx) => {
        const c = byCode[e.course_code]
        return (
          <div key={idx} className="p-4 rounded-xl bg-white/70 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: c?.color || '#6366f1' }} />
                <p className="font-medium text-gray-900">{c?.title || e.course_code}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{c?.instructor} • {c?.code}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${e.progress || 0}%`, background: c?.color || '#6366f1' }} />
              </div>
              <p className="text-xs text-gray-600 mt-1">{Math.round(e.progress || 0)}%</p>
            </div>
          </div>
        )
      })}
      {enrollments.length === 0 && (
        <p className="text-gray-500 text-sm">No courses yet.</p>
      )}
    </div>
  )
}
