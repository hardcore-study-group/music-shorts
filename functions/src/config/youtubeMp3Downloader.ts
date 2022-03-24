import YoutubeMp3Downloader from 'youtube-mp3-downloader';
import os from 'os';

const youtubeMp3Downloader = new YoutubeMp3Downloader({
  outputPath: os.tmpdir(),
  progressTimeout: 5000,
  queueParallelism: 1,
  youtubeVideoQuality: 'highest',
});

export default youtubeMp3Downloader;
