'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'best-credit-cards-2023',
    title: 'Best Credit Cards for Points and Miles in 2023',
    excerpt:
      'A comprehensive guide to the best credit cards for earning transferable points and miles in 2023.',
    publishedAt: '2023-11-15',
  },
  {
    id: 'amex-membership-rewards-guide',
    title: 'Complete Guide to American Express Membership Rewards',
    excerpt:
      'Everything you need to know about earning and redeeming American Express Membership Rewards points.',
    publishedAt: '2023-10-12',
  },
  {
    id: 'capital-one-venture-x-review',
    title: 'Capital One Venture X Review: Premium Travel Card for All',
    excerpt:
      "An in-depth review of the Capital One Venture X, examining its benefits, rewards, and whether it's worth the annual fee.",
    publishedAt: '2023-09-20',
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-6">Credit Card Points Blog</h1>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
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

      <p className="text-muted-foreground mt-8">
        Note: This is a demo blog. Articles are not yet available.
      </p>
    </div>
  );
}
