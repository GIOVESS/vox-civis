import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About VoxCivis</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            VoxCivis (Latin for "Citizen's Voice" or "Sauti ya Wananchi" in Swahili) is a platform that empowers Kenyan
            citizens to report issues in their community anonymously and safely.
          </p>
          <p className="mb-4">
            We believe that transparency and citizen participation are essential for a functioning democracy. By
            providing a simple way to report and visualize community issues across Kenya, we aim to increase
            accountability and drive positive change.
          </p>
          <p>
            Whether you're reporting corruption, safety hazards, infrastructure problems, land grabbing, or other
            community issues, your voice matters.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Submit a Report</strong> - Use our simple form to anonymously report an issue anywhere in Kenya.
              You can include text descriptions, location data, and even images.
            </li>
            <li>
              <strong>Moderation</strong> - Reports are reviewed by our team to ensure they meet our community
              guidelines.
            </li>
            <li>
              <strong>Public Map</strong> - Approved reports appear on our interactive map, allowing everyone to see
              patterns and issues in their community.
            </li>
            <li>
              <strong>Impact</strong> - The visibility of these reports can drive awareness, media attention, and
              ultimately, action from authorities.
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
        <p className="mb-4">Your privacy and security are our top priorities:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Reports are submitted anonymously - we don't collect personal information.</li>
          <li>We don't track IP addresses or other identifying data.</li>
          <li>You control how much detail to include in your reports.</li>
          <li>Our moderation process ensures sensitive information isn't publicly displayed.</li>
        </ul>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to make your voice heard?</h2>
        <Button asChild size="lg">
          <a href="https://forms.gle/A6EFQkwJTKw6sr2T7" target="_blank" rel="noopener noreferrer">
            Submit a Report
          </a>
        </Button>
        <p className="mt-4">
          <Link href="/" className="text-primary underline">
            Or view the map of existing reports
          </Link>
        </p>
      </div>
    </main>
  )
}

