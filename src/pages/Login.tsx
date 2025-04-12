
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome Back
            </h1>
            <p className="mt-4 text-muted-foreground">
              Sign in to continue your learning journey or create a new account to get started.
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
