const { NodeMediaCluster } = require('./index');
const numCPUs = require('os').cpus().length;
const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    webroot: './public',
    mediaroot: './media',
    allow_origin: '*'
  },
  https: {
    port: 8443,
    key: './privatekey.pem',
    cert: './certificate.pem',
  },
  auth: {
    api: true,
    api_user: 'admin',
    api_pass: 'admin',
    play: false,
    publish: false,
    secret: 'nodemedia2017privatekey'
  },
  cluster: {
    num: numCPUs
  },
  trans: {
    ffmpeg: 'F:/ffmpeg-4.0.2-win64-static/bin/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        ac: 'copy',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

let nmcs = new NodeMediaCluster(config);
nmcs.run();
