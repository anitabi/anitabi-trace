export class TMinusTimer{
    leftSeconds = 0;
    duration = 0;
    timer: number | null = null;
    resumeTimeout: number | null = null;
    finishCallback?: (() => unknown);
    updateCallback?: (seconds: number) => unknown;
    pauseTimeToRound: number | null = null;
    lastIntegerPerformanceTime: number | null = null;
    setFinishCallback(callback: () => unknown): TMinusTimer {
        this.finishCallback = callback;
        return this;
    }
    setUpdateCallback(callback: (seconds: number) => unknown): TMinusTimer {
        this.updateCallback = callback;
        return this;
    }
    #clearTimer() {
        if (this.timer === null) return;
        clearInterval(this.timer)
        this.timer = null;
    }
    #clearResumeTimeout() {
        if (this.resumeTimeout === null) return;
        clearTimeout(this.resumeTimeout);
        this.resumeTimeout = null;
    }
    #afterFinish() {
        this.#clearTimer();
        this.#clearResumeTimeout();
        if (this.finishCallback) this.finishCallback();
        this.reset();
    }
    #tick() {
        if (this.leftSeconds <= 0) {
            this.#afterFinish();
            return;
        }
        this.leftSeconds--;
        if(this.updateCallback) this.updateCallback(this.leftSeconds);
        this.lastIntegerPerformanceTime = performance.now();
        if(this.leftSeconds <= 0) this.#afterFinish();
    }
    static intervalFunc(ctx: TMinusTimer) {
        return () => {
            ctx.#tick();
        };
    }
    setLeft(leftSeconds: number) {
        if (this.timer !== null || this.resumeTimeout !== null) throw new Error('Timer is already running');
        this.leftSeconds = leftSeconds;
        this.duration = leftSeconds;
    }
    pause() {
        if(this.timer === null) throw new Error('Timer is not running');
        const now = performance.now();
        const elapsedSinceLastTick = this.lastIntegerPerformanceTime === null ? 0 : now - this.lastIntegerPerformanceTime;
        const clampedElapsed = Math.max(0, Math.min(1000, elapsedSinceLastTick));
        this.pauseTimeToRound = 1000 - clampedElapsed;
        this.#clearTimer();
    }
    stop() {
        this.#clearTimer();
        this.#clearResumeTimeout();
        this.pauseTimeToRound = null;
    }
    continue() {
        if(this.timer !== null || this.resumeTimeout !== null) throw new Error('Timer is not paused');
        const delay = this.pauseTimeToRound || 0
        this.pauseTimeToRound = null;
        this.resumeTimeout = setTimeout(() => {
            this.resumeTimeout = null;
            this.#tick();
            if(this.leftSeconds > 0) {
                this.lastIntegerPerformanceTime = performance.now();
                this.timer = setInterval(TMinusTimer.intervalFunc(this), 1000);
            }
        }, delay);
    }
    change(seconds: number) {
        if (this.timer === null) return;
        const nextSeconds = this.leftSeconds + seconds;
        if(nextSeconds < 0) {
            this.duration -= this.leftSeconds;
            this.leftSeconds = 0;
            if(this.updateCallback) this.updateCallback(this.leftSeconds);
            this.#afterFinish();
        }else{
            this.duration += seconds;
            this.leftSeconds = nextSeconds;
            if(this.updateCallback) this.updateCallback(this.leftSeconds);
        }
    }
    reset() {
        this.timer = null;
        this.resumeTimeout = null;
        this.leftSeconds = 0;
        this.pauseTimeToRound = null;
        this.lastIntegerPerformanceTime = null;
        this.finishCallback = undefined;
        this.updateCallback = undefined;
    }
}