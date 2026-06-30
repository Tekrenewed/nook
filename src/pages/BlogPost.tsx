import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../utils/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        
        {/* Post Header */}
        <div className="mb-16 border-b border-primary/10 pb-12">
          <Link to="/blog" className="text-secondary font-bold uppercase tracking-widest text-xs hover:text-danger transition-colors mb-8 inline-block">
            ← Back to Journal
          </Link>
          <h1 className="font-heading font-black text-4xl md:text-6xl tracking-tighter text-primary uppercase mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-secondary">
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>|</span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Post Content */}
        <article className="prose prose-lg prose-neutral max-w-none text-primary/80">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="font-heading font-black text-3xl md:text-4xl text-primary uppercase mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="font-heading font-black text-2xl md:text-3xl text-primary uppercase mt-12 mb-6" {...props} />,
              h3: ({node, ...props}) => <h3 className="font-heading font-bold text-xl text-primary uppercase mt-8 mb-4" {...props} />,
              p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-lg" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-primary/90 bg-primary/5 rounded-r-lg" {...props} />
              ),
              a: ({node, ...props}) => <a className="text-primary font-bold underline hover:text-danger transition-colors" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

      </div>
    </div>
  );
}
