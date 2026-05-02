import React from 'react';

const BlogSection = () => {
  const posts = [
    { id: 1, title: "How to Choose the Right Engine Oil for Winter", date: "Nov 12, 2023", img: "https://images.unsplash.com/photo-1598048145816-3184cd798b68?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Signs Your Brake Pads Need Immediate Replacement", date: "Oct 28, 2023", img: "https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Top 5 Aftermarket Upgrades for Better Mileage", date: "Oct 15, 2023", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Auto Tips & News</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Expert advice, guides, and news to help you maintain your vehicle and drive safely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{post.date}</p>
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Read Article →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;