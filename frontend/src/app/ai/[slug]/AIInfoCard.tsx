import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import React from "react";
import BadgeCustom from "@/components/common/BadgeCustom";

export default function AIInfoCard() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent>
        <div className="grid grid-cols-1 grid-rows-2 gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-400">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              <BadgeCustom badge="New" title="AI Video Generator" type='outline'/>
              <BadgeCustom badge="New" title=" AI Image Generation" type='outline'/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-400">Type:</h3>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Free
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}