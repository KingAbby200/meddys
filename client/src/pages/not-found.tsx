import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-lg">
        <AlertCircle className="w-20 h-20 mx-auto text-destructive" />
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground">404</h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">Page Not Found</p>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
