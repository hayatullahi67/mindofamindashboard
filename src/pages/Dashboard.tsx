import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost, DashboardStats } from '../types';
import SummaryCard from '../components/SummaryCard';
import PostDetailModal from '../components/PostDetailModal';
import { FileText, Eye, Heart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsRef);
        
        const posts: BlogPost[] = [];
        let totalViews = 0;
        let totalLikes = 0;

        postsSnapshot.forEach((doc) => {
          const data = doc.data();
          const post: BlogPost = {
            id: doc.id,
            title: data.title,
            content: data.content,
            category: data.category,
            image: data.image,
            postedTime: data.postedTime?.toDate() || new Date(),
            views: data.views || 0,
            likes: data.likes || 0,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          };
          posts.push(post);
          totalViews += post.views;
          totalLikes += post.likes;
        });

        // Get recent posts (last 7)
        const recentQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(7)
        );
        const recentSnapshot = await getDocs(recentQuery);
        const recent: BlogPost[] = [];
        recentSnapshot.forEach((doc) => {
          const data = doc.data();
          recent.push({
            id: doc.id,
            title: data.title,
            content: data.content,
            category: data.category,
            image: data.image,
            postedTime: data.postedTime?.toDate() || new Date(),
            views: data.views || 0,
            likes: data.likes || 0,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          });
        });

        setStats({
          totalPosts: posts.length,
          totalViews,
          totalLikes
        });
        setRecentPosts(recent);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRowClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FileText className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Total Views"
          value={stats.totalViews}
          icon={<Eye className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <SummaryCard
          title="Total Likes"
          value={stats.totalLikes}
          icon={<Heart className="h-6 w-6 text-white" />}
          color="bg-red-500"
        />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPosts.map((post) => (
                <tr 
                  key={post.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(post)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs md:max-w-sm lg:max-w-md truncate" title={post.content}>
                      {post.content.length > 15 ? `${post.content.substring(0, 15)}...` : post.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.postedTime.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.likes.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentPosts.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No posts found. Create your first post to see activity here.
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Dashboard; 