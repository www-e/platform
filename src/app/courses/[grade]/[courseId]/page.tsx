import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import BunnyPlayer from '@/components/video/BunnyPlayer';

type Video = {
  id: string;
  title: string;
  bunnyVideoId: string;
};

type CourseDetail = {
  id: string;
  title: string;
  description: string;
  videos: Video[];
};

export default function CourseDetailPage() {
  const { grade, courseId } = useParams() as { grade: string; courseId: string };
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${grade}/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setLoading(false);
      });
  }, [grade, courseId]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/profile/courses`)
        .then((res) => res.json())
        .then((data) => {
          const enrolled = data.courses.some((c: any) => c.id === courseId);
          setIsEnrolled(enrolled);
        });
    }
  }, [session, courseId]);

  const handleEnroll = async () => {
    await fetch(`/api/courses/${courseId}/enroll`, {
      method: 'POST',
    });
    setIsEnrolled(true);
  };

  if (loading) {
    return <div className="p-8 text-center">جارٍ التحميل…</div>;
  }
  if (!course) {
    return (
      <div className="p-8 text-center">
        لم يتم العثور على هذه الدورة.
        <button onClick={() => router.back()} className="text-orange-500 hover:underline ml-2">
          رجوع
        </button>
      </div>
    );
  }

  const videos = course.videos;
  const currentVideo = videos[currentIndex];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>

      {isEnrolled ? (
        <div>
          <BunnyPlayer
            videoId={currentVideo.bunnyVideoId}
            libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!}
          />
          <p className="mt-2 font-semibold">{currentVideo.title}</p>
        </div>
      ) : (
        <button
          onClick={handleEnroll}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Enroll Now
        </button>
      )}

      {isEnrolled && (
        <div className="flex justify-between mt-4">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((idx) => idx - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            السابق
          </button>
          <button
            disabled={currentIndex === videos.length - 1}
            onClick={() => setCurrentIndex((idx) => idx + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      )}

      <Link href={`/courses/${grade}`} className="text-orange-500 hover:underline">
        ← عودة إلى قائمة الدورات
      </Link>
    </div>
  );
}

