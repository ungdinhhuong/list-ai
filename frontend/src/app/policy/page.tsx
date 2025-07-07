'use client'
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import React from "react";

export default function PolicyPage () {
  return (
    <div className="container mx-auto lg:max-w-4xl space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Policy</h1>
      <p >
        Welcome to AI Hub, your go-to source for the latest in AI tools and technology. Our mission is to provide a comprehensive platform where users can discover, compare, and utilize the best AI tools available.
      </p>
      <p >
        We are dedicated to helping you navigate the rapidly evolving world of artificial intelligence, offering insights, reviews, and resources to empower your AI journey.
      </p>
      <NewsletterImage/>
    </div>
  );
};