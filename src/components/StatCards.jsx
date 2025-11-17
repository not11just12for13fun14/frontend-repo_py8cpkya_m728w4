export default function StatCards({ stats }) {
  const items = [
    { label: 'Average Progress', value: stats?.avg_progress ?? 0, suffix: '%' },
    { label: 'Study Minutes (7d)', value: stats?.study_minutes_week ?? 0 },
    { label: 'Courses Enrolled', value: stats?.courses_enrolled ?? 0 },
    { label: 'Streak', value: stats?.streak_days ?? 0, suffix: 'd' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl p-4 bg-white/70 backdrop-blur border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">{it.label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {typeof it.value === 'number' ? it.value : '-'}{it.suffix || ''}
          </p>
        </div>
      ))}
    </div>
  )
}
