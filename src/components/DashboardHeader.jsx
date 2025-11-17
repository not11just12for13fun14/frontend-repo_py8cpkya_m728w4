import { User } from 'lucide-react'

export default function DashboardHeader({ student, onSeed, loading }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        {student?.avatar_url ? (
          <img src={student.avatar_url} alt={student.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white shadow">
            <User className="w-7 h-7" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {student?.name || 'Student'}</h1>
          <p className="text-sm text-gray-500">{student?.cohort || 'Your personalized learning overview'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSeed}
          disabled={loading}
          className="px-4 py-2 rounded-md bg-white/70 hover:bg-white text-gray-700 border border-gray-200 shadow-sm disabled:opacity-60"
        >
          {loading ? 'Seeding...' : 'Load Demo Data'}
        </button>
      </div>
    </div>
  )
}
