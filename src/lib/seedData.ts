
import { LocalDb } from './localDb';

export const seedDatabase = () => {
  // Only seed if no users exist
  const existingUsers = LocalDb.get('users');
  if (existingUsers.length > 0) return;

  console.log('🌱 Seeding local database...');

  // 1. Mock Users
  const users = [
    {
      id: 'user-mario',
      email: 'mario@example.com',
      password: 'password',
      user_metadata: { name: 'Mario', age: 25, gender: 'male', user_type: 'student' }
    },
    {
      id: 'user-luigi',
      email: 'luigi@example.com',
      password: 'password',
      user_metadata: { name: 'Luigi', age: 24, gender: 'male', user_type: 'student' }
    },
    {
      id: 'user-peach',
      email: 'peach@example.com',
      password: 'password',
      user_metadata: { name: 'Princess Peach', age: 23, gender: 'female', user_type: 'mentor' }
    },
    {
      id: 'user-bowser',
      email: 'bowser@example.com',
      password: 'password',
      user_metadata: { name: 'Bowser', age: 40, gender: 'male', user_type: 'mentor' }
    }
  ];

  users.forEach(user => LocalDb.insert('users', user));

  // 2. Mock Profiles
  const profiles = [
    {
      id: 'user-mario',
      user_id: 'user-mario',
      nickname: 'Mario',
      user_type: 'student',
      avatar_url: 'mario-avatar',
      created_at: new Date().toISOString()
    },
    {
      id: 'user-luigi',
      user_id: 'user-luigi',
      nickname: 'Luigi',
      user_type: 'student',
      avatar_url: 'luigi-avatar',
      created_at: new Date().toISOString()
    },
    {
      id: 'user-peach',
      user_id: 'user-peach',
      nickname: 'Princess Peach',
      user_type: 'mentor',
      avatar_url: 'peach-avatar',
      created_at: new Date().toISOString()
    },
    {
      id: 'user-bowser',
      user_id: 'user-bowser',
      nickname: 'Bowser',
      user_type: 'mentor',
      avatar_url: 'bowser-avatar',
      created_at: new Date().toISOString()
    }
  ];

  profiles.forEach(profile => LocalDb.insert('profiles', profile));

  // 3. Mock Stories
  const stories = [
    {
      id: 'story-1',
      user_id: 'user-mario',
      author_name: 'Mario',
      title: 'My First Power-Up!',
      content: 'I just finished the Resume Building module. It was amazing! I finally understand how to highlight my jumping skills for future plumbing jobs. Wahoo!',
      skill: 'Resume Building',
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      image_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'story-2',
      user_id: 'user-peach',
      author_name: 'Princess Peach',
      title: 'Baking for the Kingdom',
      content: 'Shared some of my favorite royal cake recipes today. Cooking is such a great way to bring the community together. Hope you all enjoy the Cooking module!',
      skill: 'Cooking',
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'story-3',
      user_id: 'user-luigi',
      author_name: 'Luigi',
      title: 'Overcoming My Fears',
      content: 'The Public Speaking tips really helped me feel more confident. I used to be so shy, but now I feel like I can take on any haunted mansion... or at least a small group meeting!',
      skill: 'Communication Skills',
      created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800'
    }
  ];

  stories.forEach(story => LocalDb.insert('stories', story));

  // 4. Mock Story Likes
  const likes = [
    { story_id: 'story-1', user_id: 'user-peach' },
    { story_id: 'story-1', user_id: 'user-luigi' },
    { story_id: 'story-2', user_id: 'user-mario' }
  ];

  likes.forEach(like => LocalDb.insert('story_likes', like));

  console.log('✅ Seeding complete!');
};
