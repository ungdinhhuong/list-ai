import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"
import AdBanner from "@/components/AdBanner";

export default function HeroSection() {
  return (
    <div className="flex py-12 lg:py-16 px-4">
      <div className="w-1/2 md:w-full text-center mb-8 lg:mb-12">
        <div className="flex justify-center mb-4 lg:mb-6">
          <Settings className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400"/>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 px-4">
          Discover The Best AI Websites & Tools
        </h1>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 lg:mb-8 px-4">
          <Button>
            📤 Submit AI
          </Button>
          <Button variant="secondary">
            👥 Join our community
          </Button>
        </div>

        {/* Hero Tool Card */}
        {/*<div className="max-w-sm mx-auto mb-6 lg:mb-8 px-4">*/}
        {/*  <Card className="bg-gray-900 border-gray-700 p-4 lg:p-6">*/}
        {/*    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">*/}
        {/*      <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">*/}
        {/*        A*/}
        {/*      </div>*/}
        {/*      <div className="text-center sm:text-left">*/}
        {/*        <h3 className="font-bold text-white mb-2">Affitor</h3>*/}
        {/*        <p className="text-sm text-gray-400">*/}
        {/*          All-in-one tool to win Affiliate with AI. Powerful tools designed by industry experts to give*/}
        {/*          you the competitive edge you deserve.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Card>*/}
        {/*</div>*/}
      </div>
      <AdBanner/>
    </div>
  )
}