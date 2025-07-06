import HomePageClient from "@/components/section/HomePageClient";
import {toolService} from "@/services/tool.service";
import {BADGE, PAGE_SIZE} from "@/constants/constants";

export default async function HomePage() {
  const [resToolsByBadge, resAllTools] = await Promise.all([
    toolService.getToolsByBadge(BADGE.FEATURED),
    toolService.getAllTools({
      page: 1,
      pageSize: PAGE_SIZE
    })
  ]);

  const featuredTools = resToolsByBadge || [];
  const initialTools = resAllTools || [];

  return <HomePageClient featuredTools={featuredTools} initialTools={initialTools}/>
}