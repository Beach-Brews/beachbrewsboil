import { reddit, context } from '@devvit/web/server';

export const createPost = async () => {
  return await reddit.submitCustomPost({
    title: `Brews Boil Post - ${context.appVersion} - ${new Date().toLocaleString()}}`,
  });
};
