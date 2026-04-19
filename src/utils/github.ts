import axios from 'axios';

const REPO_OWNER = 'Eternity-Sky';
const REPO_NAME = 'sqrt';
const GITHUB_API_URL = 'https://api.github.com';

export interface Post {
  name: string;
  path: string;
  sha: string;
  content?: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/posts`);
  return response.data.filter((item: any) => item.name.endsWith('.md'));
}

export async function fetchPostContent(path: string): Promise<string> {
  const response = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
  const content = atob(response.data.content);
  return decodeURIComponent(escape(content));
}

export async function createPost(title: string, content: string, token: string) {
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
  const path = `posts/${fileName}`;
  const base64Content = btoa(unescape(encodeURIComponent(content)));

  const response = await axios.put(
    `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      message: `Add new post: ${title}`,
      content: base64Content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  return response.data;
}
