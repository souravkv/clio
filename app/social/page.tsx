'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Send, Search, Image as ImageIcon, Heart, MessageCircle, Share2, Bookmark, Plus } from 'lucide-react'

const navItems = [
  { icon: '💬', label: 'Chat', id: 'chat' },
  { icon: '🤝', label: 'Collaborative Study', id: 'collaborative-study' },
  { icon: '📰', label: 'Feed', id: 'feed' },
]

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isUser: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline: boolean;
}

const chatUsers: ChatUser[] = [
  {
    id: 1,
    name: "Vinay",
    avatar: "👨‍💻",
    lastMessage: "Hey, did you complete the assignment?",
    time: "12:30 PM",
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: "Abhinav",
    avatar: "👨‍🎓",
    lastMessage: "Let's study together for the exam",
    time: "11:45 AM",
    isOnline: false
  }
];

const sampleMessages: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Hey, did you complete the assignment?", sender: "Vinay", timestamp: "12:30 PM", isUser: false },
    { id: 2, text: "Not yet, working on it", sender: "You", timestamp: "12:31 PM", isUser: true },
    { id: 3, text: "Need any help?", sender: "Vinay", timestamp: "12:31 PM", isUser: false },
    { id: 4, text: "That would be great!", sender: "You", timestamp: "12:32 PM", isUser: true },
  ],
  2: [
    { id: 1, text: "Let's study together for the exam", sender: "Abhinav", timestamp: "11:45 AM", isUser: false },
    { id: 2, text: "Sure, when do you want to meet?", sender: "You", timestamp: "11:46 AM", isUser: true },
    { id: 3, text: "How about tomorrow at library?", sender: "Abhinav", timestamp: "11:47 AM", isUser: false },
    { id: 4, text: "Perfect, see you there!", sender: "You", timestamp: "11:48 AM", isUser: true },
  ]
};

interface FeedPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags?: string[];
}

const sampleFeed: FeedPost[] = [
  {
    id: 1,
    author: {
      name: "LPU Updates",
      avatar: "🏛️",
      username: "lpu_official"
    },
    content: "Important Notice: All students are requested to check their UMS portal for the latest ETP schedule. Stay updated with your academic calendar! #LPULife #Academics",
    image: "https://i.ytimg.com/vi/U40sGneJwRQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBThGynFGVmtQvu8GR887JbiRj8Sw",
    timestamp: "2 hours ago",
    likes: 242,
    comments: 57,
    shares: 83,
    tags: ["LPULife", "Academics", "University"],
    isLiked: true
  },
  {
    id: 2,
    author: {
      name: "CS Student",
      avatar: "👩‍🎓",
      username: "future_dev"
    },
    content: "Study session at LPU Library! Working on Data Structures and Algorithms. Who else is preparing for placements? 📚 #cslife #studygrind #LPU",
    timestamp: "4 hours ago",
    likes: 128,
    comments: 25,
    shares: 11,
    tags: ["cslife", "studygrind", "LPU"]
  },
  {
    id: 3,
    author: {
      name: "Campus Life",
      avatar: "🎓",
      username: "lpu_life"
    },
    content: "Amazing events happening at Uni Square! Check out the cultural performances and tech exhibitions. Don't miss out! 🎉",
    image: "https://i.ytimg.com/vi/U40sGneJwRQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBThGynFGVmtQvu8GR887JbiRj8Sw",
    timestamp: "1 day ago",
    likes: 356,
    comments: 43,
    shares: 75,
    tags: ["CampusLife", "LPUEvents", "UniLife"],
    isSaved: true
  }
];

export default function SocialPage() {
  const [activeSection, setActiveSection] = useState('chat')
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [messages, setMessages] = useState<Record<number, Message[]>>(sampleMessages)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<FeedPost[]>(sampleFeed);
  const [newPost, setNewPost] = useState('');
  const router = useRouter()

  const handleSendMessage = (chatId: number) => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages[chatId].length + 1,
      text: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...prev[chatId], newMsg]
    }));
    setNewMessage('');

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg: Message = {
        id: messages[chatId].length + 2,
        text: "Thanks for your message!",
        sender: chatUsers.find(u => u.id === chatId)?.name || "",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prev => ({
        ...prev,
        [chatId]: [...prev[chatId], replyMsg]
      }));
    }, 1000);
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;

    const post: FeedPost = {
      id: posts.length + 1,
      author: {
        name: "You",
        avatar: "😊",
        username: "user"
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredUsers = chatUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      {/* Your existing background gradients */}

      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-8 bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 shadow-2xl"
      >
        {/* Window title bar */}
        <div className="h-12 bg-zinc-900 border-b border-zinc-800/50 flex items-center px-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <Link href="/social" className="text-md pl-3 font-bold hover:opacity-90 transition-colors ">
          <span className=" text-violet-400">cli</span>
          <span className=" text-violet-500">o</span>
          <span className=" text-violet-300 text-md "> soci</span>
          <span className=" text-violet-400  ">al</span>
        </Link>
          <button
            onClick={() => router.back()}
            className="absolute right-4 text-sm text-violet-400 hover:text-violet-500 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Main content area */}
        <div className="flex h-[calc(100%-3rem)] overflow-hidden">
          {/* Sidebar */}
          <div className="w-72 border-r border-zinc-800/50 flex flex-col">
            {/* Navigation */}
            <div className="p-4 border-b border-zinc-800/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all mb-1 w-full ${
                    activeSection === item.id ? 'bg-zinc-800/50 text-white' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Chat List */}
            {activeSection === 'chat' && (
              <div className="flex-1 overflow-y-auto">
                {/* Search */}
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search chats..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-800/50 text-white pl-10 pr-4 py-2 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* Chat Users */}
                <div className="space-y-1 p-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedChat(user.id)}
                      className={`w-full p-3 rounded-lg hover:bg-zinc-800/50 transition-all
                        ${selectedChat === user.id ? 'bg-zinc-800/50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span className="text-2xl">{user.avatar}</span>
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full 
                              border-2 border-zinc-900" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">{user.name}</span>
                            <span className="text-xs text-zinc-400">{user.time}</span>
                          </div>
                          <p className="text-sm text-zinc-400 truncate">{user.lastMessage}</p>
                        </div>
                        {user.unread && (
                          <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 
                            flex items-center justify-center">
                            {user.unread}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeSection === 'feed' ? (
              <div className="flex-1 overflow-y-auto flex flex-col">
                <div className="max-w-2xl mx-auto w-full">
                  {/* New Post Input */}
                  <div className="p-4 border-b border-zinc-800/50">
                    <div className="flex gap-4">
                      <div className="text-2xl">😊</div>
                      <div className="flex-1">
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          placeholder="What's on your mind?"
                          className="w-full bg-transparent border-none focus:outline-none resize-none"
                          rows={3}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <button className="text-zinc-400 hover:text-white transition-colors">
                            <ImageIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleNewPost}
                            className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg 
                              hover:bg-blue-500/30 transition-colors"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Posts */}
                  <div>
                    {posts.map((post) => (
                      <div key={post.id} className="p-6 hover:bg-zinc-800/20 transition-colors border-b border-zinc-800/50">
                        {/* Post Header */}
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{post.author.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{post.author.name}</span>
                              <span className="text-zinc-400">@{post.author.username}</span>
                              <span className="text-zinc-500">·</span>
                              <span className="text-zinc-400">{post.timestamp}</span>
                            </div>
                            
                            {/* Post Content */}
                            <p className="mt-2 text-white">{post.content}</p>
                            
                            {/* Post Image */}
                            {post.image && (
                              <div className="mt-3 rounded-xl overflow-hidden">
                                <img 
                                  src={post.image} 
                                  alt="Post content" 
                                  className="w-full h-64 object-cover"
                                />
                              </div>
                            )}

                            {/* Tags */}
                            {post.tags && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {post.tags.map((tag) => (
                                  <span 
                                    key={tag}
                                    className="text-blue-400 text-sm hover:underline cursor-pointer"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Post Actions */}
                            <div className="flex items-center gap-6 mt-3">
                              <button className={`flex items-center gap-2 ${
                                post.isLiked ? 'text-pink-500' : 'text-zinc-400'
                              } hover:text-pink-500 transition-colors`}>
                                <Heart className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </button>
                              <button className="flex items-center gap-2 text-zinc-400 
                                hover:text-blue-400 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </button>
                              <button className="flex items-center gap-2 text-zinc-400 
                                hover:text-green-400 transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span>{post.shares}</span>
                              </button>
                              <button className={`ml-auto ${
                                post.isSaved ? 'text-yellow-500' : 'text-zinc-400'
                              } hover:text-yellow-500 transition-colors`}>
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-zinc-800/50 flex items-center gap-3">
                  <div className="relative">
                    <span className="text-2xl">
                      {chatUsers.find(u => u.id === selectedChat)?.avatar}
                    </span>
                    {chatUsers.find(u => u.id === selectedChat)?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full 
                        border-2 border-zinc-900" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium text-white">
                      {chatUsers.find(u => u.id === selectedChat)?.name}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      {chatUsers.find(u => u.id === selectedChat)?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[selectedChat].map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.isUser ? 'bg-blue-500/20' : 'bg-zinc-800/50'} 
                        rounded-lg p-3`}>
                        <p className="text-white">{message.text}</p>
                        <p className="text-xs text-zinc-400 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-zinc-800/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(selectedChat);
                        }
                      }}
                      placeholder="Type a message..."
                      className="flex-1 bg-zinc-800/50 text-white px-4 py-2 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button
                      onClick={() => handleSendMessage(selectedChat)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg 
                        hover:bg-blue-500/30 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-400">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 