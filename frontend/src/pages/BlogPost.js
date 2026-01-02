import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-section mb-4">Post Not Found</h2>
          <button onClick={() => navigate('/blog')} className="btn-primary">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12">
      <article className="section-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {post.image_url && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <h1 className="heading-hero mb-6">{post.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-taupe leading-relaxed">{post.content}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-stone">
            <button onClick={() => navigate('/blog')} className="btn-secondary">
              ← Back to All Stories
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
