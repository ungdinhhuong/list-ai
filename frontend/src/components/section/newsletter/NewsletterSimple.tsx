import { ExternalLink } from "lucide-react";

export default function NewsletterSimple() {
  return (
    <div className="w-full mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          Stay Updated with Latest AI Tools
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join over 50,000 subscribers and get exclusive access to new AI tools,
          curated lists, and productivity tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Subscribe
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
