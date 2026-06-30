import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  content: string;
}

// Import all markdown files eagerly as raw strings
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path] as string;
    
    // Extract slug from filename (e.g., '../content/blog/hello-world.md' -> 'hello-world')
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    // Parse frontmatter and markdown body
    const { data, content } = matter(rawContent);

    posts.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || 'Nook Team',
      content
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
