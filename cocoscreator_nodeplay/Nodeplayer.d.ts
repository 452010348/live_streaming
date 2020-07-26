declare class NodePlayer {
    constructor();
    static debug(a?: Boolean);
    /**
     * 必须设置对应画布的id否则报错
     * @param id 
     */
    setView(id: any);
    /**
     * 缩放模式 1 2 
     */
    setScaleMode(a: Number)
    /**
     * 
     */
    skipLoopFilter(a: Number)
    setBufferTime(a: Number)
    /**
     * 声音开关 true,false
     */
    enableAudio(a: Boolean)
    /**
     * 停止流
     */
    stop();
    /**
     * 开始播放流 url
     */
    start(a: any);
    /**
     * 监听状态
     * @param a start，close，error
     * @param b 
     */
    on(a: string, b: Function);
    resizeView(w: Number, h: Number);

    skipLoopFilter(a: Number);
    setVolume(a: Number);
    enableAudio(b: Boolean);
    setScaleMode(a: Number);
    setBufferTime(a);
    useMSE();
    on(event: string, listener: (...args: any[]) => void): void;

}