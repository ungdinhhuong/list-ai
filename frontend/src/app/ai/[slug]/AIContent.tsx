import {Check, ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

export default function AIContent() {
  return (
    <>

      {/* What is Nim Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What is Nim?</h2>
        <p className="text-gray-300 leading-relaxed">
          Nim is a comprehensive AI video production app that provides tools for generating videos from text and
          images. It
          utilizes state-of-the-art models for various video generation features like text-to-image and image-to-video
          conversion. The platform supports a diverse range of creative capabilities including lip syncing, background
          replacement, expression transfer, and more.
        </p>
      </section>

      {/* How to use Nim Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How to use Nim?</h2>
        <p className="text-gray-300 leading-relaxed">
          To use Nim, simply input your text description or select images, and the AI will generate videos based on
          your input
          while offering editing and enhancement features.
        </p>
      </section>

      {/* Core Features Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Nim's Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Text-to-image generation',
            'Image-to-video conversion',
            'Background replacement',
            'Lip sync',
            'Upscaling videos'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white"/>
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Nim's Use Cases</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-gray-400 font-medium">#1</span>
            <span className="text-gray-300">Create unique AI-generated videos from text prompts</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-gray-400 font-medium">#2</span>
            <span className="text-gray-300">Generate artistic visuals from images</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-gray-400 font-medium">#3</span>
            <span className="text-gray-300">Produce engaging videos for marketing or social media</span>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-800">
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
          <ChevronLeft className="w-4 h-4 mr-2"/>
          Monica
        </Button>
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
          MagicLight
          <ChevronRight className="w-4 h-4 ml-2"/>
        </Button>
      </div>

    </>
  );
}