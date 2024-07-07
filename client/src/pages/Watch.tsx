import { useSearchParams } from "react-router-dom";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoSrc = searchParams.get("v");
  const videoPrefix = "https://storage.googleapis.com/toasty-processed-videos/";

  return (
    <div>
      <h1>Watch Page</h1>
      <video controls src={videoPrefix + videoSrc} />
    </div>
  );
}
