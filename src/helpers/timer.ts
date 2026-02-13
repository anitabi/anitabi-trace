export class TMinusTimer{
    leftSeconds = 0;
    timer: number | null = null;
    finishCallback?: (() => unknown);
    updateCallback?: (seconds: number) => unknown;
    pauseTimeToRound: number | null = null;
    lastIntegerPerformanceTime: number | null = null;
    constructor(seconds: number, finishCallback?: () => unknown) {
        this.leftSeconds = seconds;
        this.finishCallback = finishCallback;
    }
    setUpdateCallback(callback: (seconds: number) => unknown): TMinusTimer {
        this.updateCallback = callback;
        return this;
    }
    #clearTimer() {
        if (!this.timer) return;
        clearInterval(this.timer)
        this.timer = null;
    }
    #afterFinish() {
        this.#clearTimer();
        if (this.finishCallback) this.finishCallback();
        this.reset();
    }
    static intervalFunc(ctx: TMinusTimer) {
        return () => {
            ctx.leftSeconds--;
            if(ctx.updateCallback) ctx.updateCallback(ctx.leftSeconds);
            ctx.lastIntegerPerformanceTime = performance.now();
            if(ctx.leftSeconds <= 0) ctx.#afterFinish();
        };
    }
    start() {
        this.timer = setInterval(TMinusTimer.intervalFunc(this), 1000);
    }
    pause() {
        if(!this.timer) throw new Error('Timer is not running');
        this.pauseTimeToRound = performance.now() - this.lastIntegerPerformanceTime!;
        this.#clearTimer();
    }
    stop() {
        if(!this.timer) return;
        this.#clearTimer();
    }
    continue() {
        if(this.timer || !this.pauseTimeToRound) throw new Error('Timer is not paused');
        setTimeout(() => {
            TMinusTimer.intervalFunc(this)();
            if(this.leftSeconds != 0) this.timer = setInterval(TMinusTimer.intervalFunc(this), 1000);
        }, this.pauseTimeToRound);
    }
    change(seconds: number) {
        if(this.leftSeconds < seconds) {
            this.leftSeconds = 0;
            if(this.updateCallback) this.updateCallback(this.leftSeconds);
            this.#afterFinish();
        }else{
            this.leftSeconds += seconds;
            if(this.updateCallback) this.updateCallback(this.leftSeconds);
        }
    }
    reset() {
        this.timer = null;
        this.leftSeconds = 0;
        this.pauseTimeToRound = null;
        this.finishCallback = undefined;
        this.updateCallback = undefined;
    }
}