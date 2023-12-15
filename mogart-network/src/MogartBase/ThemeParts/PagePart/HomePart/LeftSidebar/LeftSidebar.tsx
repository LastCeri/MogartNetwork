import React from 'react';
import ComponentsBlogs from './Components/Left-Component-Blogs/Left-Sidebar-Components-Blog.tsx';
import ComponentsLatestActive from './Components/Left-Component-LatestActive/Left-Sidebar-Components-LatestActive.tsx';

export default function LeftSidebar() {
    return (
        <aside className="w-1/4 p-4">
        {/* Latest Active */}
        <ComponentsLatestActive />

        {/* Blog */}
        <ComponentsBlogs />
      </aside>
    );
}
