type TimerHandle = number | NodeJS.Timeout;

export class TMinusTimer{
    state: { type: 'IDLE' } | 
        { type: 'RUNNING', secondTimer: TimerHandle, lastPerformanceTime: number } | 
        { type: 'RUNNING_MILLIS', millisecondTimer: TimerHandle, lastPerformanceTime: number, millisecondsLeft: number } | 
        { type: 'PAUSED', millisecondsLeftAtPause: number } | 
        { type: 'FINISHED' } = { type: 'IDLE' };
    left: number = 0;
    duration: number = 0;
    finishCallback?: () => unknown;
    updateCallback?: (seconds: number) => unknown;
    #generation: number = 0;

    #scheduleTick(milliseconds: number): TimerHandle {
        const generation = this.#generation;
        return setTimeout(() => {
            if (generation === this.#generation) this.#tick();
        }, milliseconds);
    }
    setFinishCallback(callback: () => unknown): TMinusTimer {
        this.finishCallback = callback;
        return this;
    }

    setUpdateCallback(callback: (seconds: number) => unknown): TMinusTimer {
        this.updateCallback = callback;
        return this;
    }
    setLeft(leftSeconds: number) {
        if (this.state.type === 'RUNNING' 
            || this.state.type === 'RUNNING_MILLIS' || this.state.type === 'PAUSED') throw new Error('Timer is already running');
        if (this.state.type === 'FINISHED') this.state = { type: 'IDLE' };
        this.left = leftSeconds;
        this.duration = leftSeconds;
    }
    continue() {
        if (this.state.type === 'RUNNING' || this.state.type === 'RUNNING_MILLIS') throw new Error('Timer is already running');
        if (this.state.type === 'FINISHED') throw new Error('Timer is already finished');
        if (this.state.type === 'PAUSED') {
            if (this.state.millisecondsLeftAtPause > 0) {
                this.state = {
                    type: 'RUNNING_MILLIS',
                    millisecondTimer: this.#scheduleTick(this.state.millisecondsLeftAtPause),
                    lastPerformanceTime: performance.now(),
                    millisecondsLeft: this.state.millisecondsLeftAtPause
                };
            } else {
                this.state = { 
                    type: 'RUNNING', 
                    secondTimer: this.#scheduleTick(1000),
                    lastPerformanceTime: performance.now() 
                };
            }
        } else {
            this.state = {
                type: 'RUNNING',
                secondTimer: this.#scheduleTick(1000),
                lastPerformanceTime: performance.now()
            };
        }
    }
    #tick() {
        if (this.state.type !== 'RUNNING' && this.state.type !== 'RUNNING_MILLIS') throw new Error('Timer is not running');
        if (this.state.type === 'RUNNING_MILLIS') {
            this.state = {
                type: 'RUNNING',
                secondTimer: this.#scheduleTick(1000),
                lastPerformanceTime: performance.now()
            };
        } else {
            if (this.left == 0) {
                // Timer finished
                this.state = { type: 'FINISHED' };
                this.finishCallback?.();
                return;
            }
            this.left--;
            this.state = {
                type: 'RUNNING',
                secondTimer: this.#scheduleTick(1000),
                lastPerformanceTime: performance.now()
            };
            this.updateCallback?.(this.left);
        }
    }
    pause() {
        if (this.state.type !== 'RUNNING' && this.state.type !== 'RUNNING_MILLIS') throw new Error('Timer is not running');
        if (this.state.type === 'RUNNING') {
            clearTimeout(this.state.secondTimer!);
            this.state = {
                type: 'PAUSED',
                millisecondsLeftAtPause: Math.max(0, 1000 - (performance.now() - this.state.lastPerformanceTime!))
            };
        } else {
            clearTimeout(this.state.millisecondTimer);
            this.state = {
                type: 'PAUSED',
                millisecondsLeftAtPause: Math.max(0, this.state.millisecondsLeft - (performance.now() - this.state.lastPerformanceTime))
            };
        }
    }
    stop() {
        if (this.state.type === 'IDLE') throw new Error('Timer is not running');
        if (this.state.type === 'FINISHED') throw new Error('Timer is already finished');
        this.pause();
        this.state = { type: 'IDLE' };
        this.left = 0;
    }
    change(seconds: number) {
        if (this.state.type === 'FINISHED') throw new Error('Timer is already finished');
        if (this.state.type === 'RUNNING' || this.state.type === 'RUNNING_MILLIS') throw new Error('Timer is running, please pause before changing time');
        if (this.state.type === 'IDLE') throw new Error('Timer is not active');
        const nextSeconds = this.left + seconds;
        if (nextSeconds < 0) {
            this.duration -= this.left;
            this.state = { type: 'FINISHED' };
            this.left = 0;
            this.updateCallback?.(this.left);
            this.finishCallback?.();
        } else {
            this.duration += seconds;
            this.left = nextSeconds;
            this.updateCallback?.(this.left);
        }
    }
    dispose() {
        this.#generation++;
        if (this.state.type === 'RUNNING') clearTimeout(this.state.secondTimer);
        if (this.state.type === 'RUNNING_MILLIS') clearTimeout(this.state.millisecondTimer);
        this.state = { type: 'IDLE' };
        this.left = 0;
    }
    isFinished() {
        return this.state.type === 'FINISHED';
    }
}