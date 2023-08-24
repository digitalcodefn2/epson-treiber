import formatDistance from "date-fns/formatDistance"
import Image from "next/image"
import Link from "next/link"

function RecentPost({ recentPost }) {
  return (
    <div className="mb-16">
      <h3 className="mb-4 text-xl font-medium">Recent Post</h3>

      <div className="grid grid-cols-1 gap-8">
        {recentPost.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center gap-4"
          >
            <Link
              href={`/blog/${post.attributes.slug}`}
              className="w-[100px] aspect-square block relative"
            >
              <Image
                src={post.attributes.image.data.attributes.url}
                fill
                className="object-cover rounded-md"
                alt={post.attributes.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <div className="flex-1">
              <Link
                href={`/blog/${post.attributes.slug}`}
                className="font-medium mb-2 text-gray-900 hover:underline hover:underline-offset-2 hover:text-primary-900"
              >
                {post.attributes.title}
              </Link>

              <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                {post.attributes.shortDescription}
              </p>

              <p className="text-xs">
                <span className="font-medium">
                  {post.attributes.author.data.attributes.name}
                </span>{" "}
                -{" "}
                {formatDistance(
                  new Date(post.attributes.createdAt),
                  new Date(),
                  {
                    addSuffix: true
                  }
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentPost
