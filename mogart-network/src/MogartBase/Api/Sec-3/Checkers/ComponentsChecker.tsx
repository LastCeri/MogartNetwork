import { ComponentBlogsinterface } from "../../../ThemeParts/PagePart/HomePart/LeftSidebar/Components/Left-Component-Blogs/Left-Sidebar-Components-Blog";
import { ComponentActivityinterface } from "../../../ThemeParts/PagePart/HomePart/LeftSidebar/Components/Left-Component-LatestActive/Left-Sidebar-Components-LatestActive";

export const isValidComponentBlogs = (data: any): data is ComponentBlogsinterface => {
    return typeof data.Bid === 'string' &&
           typeof data.Bimage === 'string' &&
           typeof data.Bname === 'string' &&
           typeof data.Burl === 'string' &&
           typeof data.Bdate === 'string' &&
           typeof data.Bviews === 'number' &&
           typeof data.Bcategory === 'string' &&
           typeof data.Bauthor === 'string' &&
           typeof data.BauthorImage === 'string' &&
           typeof data.Bcontent === 'string' && 
           typeof data.Btags === 'string'; 
  }
  


export const isValidComponentLatestActive = (data: any): data is ComponentActivityinterface => {
    return typeof data.Actid === 'number' &&
           typeof data.ActName === 'string' &&
           typeof data.ActContent === 'string' &&
           typeof data.ActStatus === 'string' &&
           typeof data.ActDate === 'string' &&
           typeof data.ActAvatar === 'string' ;
  }
