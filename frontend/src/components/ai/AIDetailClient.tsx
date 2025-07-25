'use client'
import React from 'react'
import AllToolsSection from "@/components/section/AllToolsSection"
import {Button} from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
import BadgeCustom from "@/components/common/BadgeCustom";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import {ToolType} from "@/types/tool.type";
import AvatarLogo from "@/components/common/AvatarLogo";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

interface AIDetailClientProps {
  tool: ToolType,
  relatedTools: ToolType[],
}

export default function AIDetailClient({tool, relatedTools}: AIDetailClientProps) {
  const t = useTranslations();
  return (
    <div className="container mx-auto lg:max-w-4xl space-y-6 xl:space-y-8">
      {!!tool.badge && <BadgeCustom badge={tool.badge}/>}

      <div className="flex items-center gap-4">
        <AvatarLogo text={tool.name} img={tool?.avatar?.url || ""}/>
        <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
      </div>

      <p className="text-muted-foreground text-lg max-w-2xl">{tool.description}</p>

      <a href={tool.link} target="_blank" rel="noopener noreferrer" className={"inline-flex items-center gap-2"}>
        <Button className="bg-muted hover:bg-muted/80 text-foreground">
          {t('common.visitWebsite')}
          <ExternalLink className="ml-2 w-4 h-4"/>
        </Button>
      </a>

      {/* Info Card */}
      <Card className="bg-muted border-border">
        <CardContent>
          <div className="grid grid-cols-1 grid-rows-2 gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium text-muted-foreground">{t('common.categories')}:</h3>
              <div className="flex flex-wrap gap-2">
                {tool.categories?.map((category, index) => (
                  <BadgeCustom key={index + category.name} badge="New" title={category.name} type="outline"/>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium text-muted-foreground">{t('common.type')}:</h3>
              <Badge variant="outline" className="border-green-500 text-green-400">{tool.type || t('Common.updating')}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nội dung */}
      <div dangerouslySetInnerHTML={{__html: tool.toolContent?.content || ''}}/>

      {/* Danh sách tool AI */}
      <AllToolsSection title="Similar tools" tools={relatedTools} lengthItems={3}/>

      <NewsletterImage/>
    </div>
  )
}
