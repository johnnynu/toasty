import { getVideos } from "@/firebase/functions";
import { useAtom } from "jotai";
import { videoAtom } from "@/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [videos, setVideos] = useAtom(videoAtom);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [videos]);

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Card key={video.id} className="w-full">
          <CardContent className="p-2">
            <Link to={`/watch?v=${video.fileName}`} key={video.id}>
              <img
                src="/video_placeholder.png"
                alt="video"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "16 / 9" }}
              />
            </Link>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
