import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-6">Tales of the Transfer</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/blog/${post.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
              <Link
                href={`/blog/${post.id}`}
                className="text-primary hover:underline mt-4 inline-block"
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
