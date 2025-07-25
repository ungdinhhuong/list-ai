import HomePageClient from "@/components/home/HomePageClient";
import {toolService} from "@/services/tool.service";
import {BADGE, PAGE_SIZE} from "@/constants/constants";
import {singleTypeService} from "@/services/single-type.service";
import {StructuredData} from "@/components/common/StructuredData";
import {Metadata} from "next";
import {seoMeta} from "@/lib/seoMeta";
import NoTranslationMessage from "@/components/common/NoTranslationMessage";

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getHomePage();
  const seo = page?.data?.seo || null;
  return seoMeta({seo});
}

export default async function HomePage() {
  const [resToolsByBadge, resAllTools, resHomePage] = await Promise.all([
    toolService.getToolsByBadge(BADGE.FEATURED),
    toolService.getAllTools({page: 1, pageSize: PAGE_SIZE}),
    singleTypeService.getHomePage()
  ]);

  const featuredTools = resToolsByBadge || [];
  const initialTools = resAllTools || [];
  const homePage = resHomePage.data || null;
  if (!homePage) {
    return <NoTranslationMessage/>;
  }

  let structuredData: string | null = null;
  if (homePage?.seo?.structuredData) {
    structuredData =
      typeof homePage.seo.structuredData === "string"
        ? homePage.seo.structuredData
        : JSON.stringify(homePage.seo.structuredData);
  }

  return (
    <>
      {structuredData && (
        <StructuredData jsonLd={structuredData}/>
      )}
      <HomePageClient
        featuredTools={featuredTools}
        initialTools={initialTools}
        homePage={homePage}
      />
    </>
  );
}
