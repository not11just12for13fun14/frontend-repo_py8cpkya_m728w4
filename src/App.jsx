import { useEffect, useMemo, useState } from 'react'
import DashboardHeader from './components/DashboardHeader'
import StatCards from './components/StatCards'
import CourseList from './components/CourseList'
import Upcoming from './components/Upcoming'
import Announcements from './components/Announcements'

function App() {
  const [email, setEmail] = useState('student@example.com')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/dashboard/student/${encodeURIComponent(email)}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const seedDemo = async () => {
    setLoading(true)
    try {
      await fetch(`${baseUrl}/seed-demo/${encodeURIComponent(email)}`, { method: 'POST' })
      await fetchDashboard()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <DashboardHeader student={data?.student} onSeed={seedDemo} loading={loading} />
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <input value={email} onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white/80 backdrop-blur text-gray-700 w-full sm:w-72"
              placeholder="Enter your email" />
            <button onClick={fetchDashboard} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow">
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatCards stats={data?.stats} />
            <div className="rounded-2xl p-5 bg-white/60 backdrop-blur border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Courses</h2>
              </div>
              <CourseList courses={data?.courses} enrollments={data?.enrollments || []} />
            </div>

            <div className="rounded-2xl p-5 bg-white/60 backdrop-blur border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
              </div>
              <Upcoming items={data?.upcoming_assignments || []} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-white/60 backdrop-blur border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
              </div>
              <Announcements items={data?.announcements || []} />
            </div>

            <div className="rounded-2xl p-5 bg-white/60 backdrop-blur border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Activity</h2>
              <p className="text-sm text-gray-500">Submissions in last 30 days: {data?.stats?.submissions_30d || 0}</p>
              <p className="text-sm text-gray-500 mt-1">Attendance rate: {data?.stats?.attendance_rate ?? '-'}%</p>
              <p className="text-sm text-gray-500 mt-1">GPA-like score: {data?.stats?.gpa ?? '-'}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
