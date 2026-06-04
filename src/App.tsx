import StarryBackground from './components/StarryBackground'
import ProfileOverlay from './components/ProfileOverlay'

export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <StarryBackground />
      <ProfileOverlay />
    </div>
  )
}
