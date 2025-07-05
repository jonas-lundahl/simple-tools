import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FileText, Code } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            <span className="flex items-center justify-center gap-2">
              Welcome to Simple Tools
              <Image
                src="/favicon.svg"
                width={32}
                height={32}
                alt="Simple Tools logo"
              />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred format to get started
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          <Link href="/format/json">
            <Card className="hover:border-primary/20 h-full cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 w-fit rounded-full p-3 transition-colors">
                  <Code className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">JSON Format</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Work with JSON data structures
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/format/xml">
            <Card className="hover:border-primary/20 h-full cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 w-fit rounded-full p-3 transition-colors">
                  <FileText className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">XML Format</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Work with XML documents
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Click on any card to navigate to the respective format handler
          </p>
        </div>
      </div>
    </div>
  );
}
