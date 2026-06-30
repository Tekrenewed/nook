import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllPosts } from '../utils/posts';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

export default function BlogList() {
  const posts = getAllPosts();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'smash') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="pb-12 mb-16 border-b-4 border-primary">
          <h1 className="font-heading font-black text-6xl md:text-8xl tracking-tighter text-primary uppercase">
            The Nook Blog
          </h1>
          <p className="mt-6 text-primary font-bold uppercase tracking-widest text-sm md:text-lg">
            Thoughts, news, and the science behind the perfect smash burger.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          
          {/* Secret Menu Block (Always appears first) */}
          <div className="break-inside-avoid bg-primary text-background p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              {isUnlocked ? <Unlock size={48} /> : <Lock size={48} />}
            </div>
            
            <h2 className="font-heading font-black text-4xl uppercase mb-4 tracking-tighter">
              The Secret Menu
            </h2>
            
            {!isUnlocked ? (
              <div className="mt-8">
                <p className="font-bold uppercase tracking-widest text-sm mb-6 text-background/80 leading-relaxed">
                  Enter the access code sent to our newsletter subscribers to unlock exclusive off-menu builds.
                </p>
                <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ACCESS CODE" 
                    className={`bg-transparent border-2 ${error ? 'border-danger text-danger placeholder:text-danger' : 'border-background/30 text-background placeholder:text-background/50'} px-4 py-3 outline-none focus:border-background transition-colors w-full uppercase font-bold tracking-widest text-sm`}
                  />
                  <button type="submit" className="bg-background text-primary font-black uppercase tracking-widest px-6 py-3 hover:bg-danger hover:text-background transition-colors shrink-0">
                    Unlock
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-8 animate-fade-in">
                <h3 className="font-bold uppercase tracking-widest text-danger mb-2 text-sm">Unlocked</h3>
                <h4 className="font-heading font-black text-3xl uppercase mb-2">The 'Oklahoma' Smash</h4>
                <p className="text-background/80 font-medium mb-6">
                  Double beef, paper-thin onions smashed directly into the patty on the grill, double American cheese, mustard, pickles. Ask for it by name at The Hub.
                </p>
                <img src="/hero1.png" alt="Secret Burger" className="w-full h-48 object-cover mix-blend-luminosity border-2 border-background/20" />
              </div>
            )}
          </div>

          {/* Standard Posts */}
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              className={`break-inside-avoid group cursor-pointer border-4 border-primary p-8 md:p-12 hover:bg-primary hover:text-background transition-colors duration-300 flex flex-col justify-between ${index % 2 !== 0 ? 'md:aspect-square' : ''}`}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-6 group-hover:text-background transition-colors">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <Link to={`/blog/${post.slug}`} className="block">
                  <h2 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter group-hover:text-danger transition-colors mb-6 leading-[0.9]">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-lg font-medium leading-relaxed mb-8 opacity-80 group-hover:text-background">
                  {post.excerpt}
                </p>
              </div>
              <Link 
                to={`/blog/${post.slug}`} 
                className="inline-flex items-center font-bold uppercase tracking-widest text-sm text-primary group-hover:text-background"
              >
                Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="break-inside-avoid border-4 border-primary border-dashed p-12 text-center">
              <p className="text-secondary font-bold uppercase tracking-widest">More intel dropping soon.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
