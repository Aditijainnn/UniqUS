
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, LineChart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Path to Academic Success
              </h1>
              <p className="text-muted-foreground md:text-xl">
                An inclusive learning platform designed for all students, with special focus
                on accessibility for children with disabilities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to="/roadmap">
                  Create Your Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <BookOpen className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Study Roadmap</h3>
                <p className="text-muted-foreground">
                  Create your personalized learning plan
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Calendar className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Important Dates</h3>
                <p className="text-muted-foreground">
                  Track assignments and exams
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <LineChart className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Progress Tracker</h3>
                <p className="text-muted-foreground">
                  Monitor your academic journey
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <MessageSquare className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Notes Section</h3>
                <p className="text-muted-foreground">
                  Take and organize your study notes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
