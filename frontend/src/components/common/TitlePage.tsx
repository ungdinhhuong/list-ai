import React from "react";

interface TitlePageProps {
  title: string;
  description: string;
}

export default function TitlePage({ title, description }: TitlePageProps) {
  return (
    <div className="space-y-4 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {title || ''}
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl">
        {description || ''}
      </p>
    </div>
  )
};
